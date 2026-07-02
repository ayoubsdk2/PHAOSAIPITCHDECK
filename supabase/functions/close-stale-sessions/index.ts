import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL');

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Require shared-secret header set by the pg_cron job (read from Vault).
  const presented = req.headers.get('x-cron-secret') ?? '';
  const { data: secretRow } = await supabase
    .schema('vault')
    .from('decrypted_secrets')
    .select('decrypted_secret')
    .eq('name', 'close_stale_sessions_cron_secret')
    .maybeSingle();
  const expected = (secretRow as { decrypted_secret?: string } | null)?.decrypted_secret ?? '';
  if (!expected || presented !== expected) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const cutoff = new Date(Date.now() - 2 * 60 * 1000).toISOString();
  const { data: stale, error } = await supabase
    .from('sessions')
    .select('id, prospect_id, last_heartbeat, total_duration_seconds')
    .lt('last_heartbeat', cutoff)
    .is('summary_sent_at', null)
    .eq('is_active', true);

  if (error) {
    console.error('query stale sessions failed', error);
    return new Response(JSON.stringify({ error: 'internal_error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const processed: string[] = [];

  for (const session of stale ?? []) {
    await supabase
      .from('sessions')
      .update({ is_active: false, end_time: session.last_heartbeat })
      .eq('id', session.id);

    const { data: prospect } = await supabase
      .from('prospects')
      .select('full_name, business, prefix_slug')
      .eq('id', session.prospect_id)
      .single();

    const { data: allSessions } = await supabase
      .from('sessions')
      .select('id, ip_address, total_duration_seconds')
      .eq('prospect_id', session.prospect_id);

    const sessionCount = allSessions?.length ?? 0;
    const totalTime = (allSessions ?? []).reduce((s, r) => s + (r.total_duration_seconds || 0), 0);
    const ipMap = new Map<string, number>();
    for (const s of allSessions ?? []) {
      const ip = s.ip_address || 'unknown';
      ipMap.set(ip, (ipMap.get(ip) || 0) + (s.total_duration_seconds || 0));
    }

    const { data: slideViews } = await supabase
      .from('slide_views')
      .select('slide_number, time_spent_seconds')
      .eq('session_id', session.id)
      .order('slide_number', { ascending: true });

    const fmt = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    const ipRows = [...ipMap.entries()]
      .map(([ip, sec]) => `<tr><td style="padding:4px 12px;border:1px solid #eee">${esc(ip)}</td><td style="padding:4px 12px;border:1px solid #eee">${esc(fmt(sec))}</td></tr>`)
      .join('');
    const slideRows = (slideViews ?? [])
      .map((v) => `<tr><td style="padding:4px 12px;border:1px solid #eee">Slide ${esc((v.slide_number ?? 0) + 1)}</td><td style="padding:4px 12px;border:1px solid #eee">${esc(fmt(v.time_spent_seconds || 0))}</td></tr>`)
      .join('');

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
        <h2 style="margin:0 0 12px">Pitch Deck Session Summary</h2>
        <p><strong>Prospect:</strong> ${esc(prospect?.full_name ?? '—')}<br/>
           <strong>Business:</strong> ${esc(prospect?.business ?? '—')}<br/>
           <strong>Link:</strong> pitch-deck.phaosai.com/${esc(prospect?.prefix_slug ?? '')}</p>
        <p><strong>Total time on presentation (all sessions):</strong> ${esc(fmt(totalTime))}<br/>
           <strong>Unique sessions:</strong> ${esc(sessionCount)}<br/>
           <strong>Unique IPs:</strong> ${esc(ipMap.size)}</p>
        <h3 style="margin-top:24px">Time spent per IP</h3>
        <table style="border-collapse:collapse"><thead><tr><th style="padding:4px 12px;border:1px solid #eee;text-align:left">IP</th><th style="padding:4px 12px;border:1px solid #eee;text-align:left">Time</th></tr></thead><tbody>${ipRows}</tbody></table>
        <h3 style="margin-top:24px">Slides — most recent session</h3>
        <table style="border-collapse:collapse"><thead><tr><th style="padding:4px 12px;border:1px solid #eee;text-align:left">Slide</th><th style="padding:4px 12px;border:1px solid #eee;text-align:left">Time</th></tr></thead><tbody>${slideRows}</tbody></table>
      </div>
    `;

    if (RESEND_API_KEY && RESEND_FROM_EMAIL) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: ['daniel@phaosai.com'],
          subject: `Pitch deck viewed — ${prospect?.full_name ?? 'Prospect'} (${prospect?.business ?? ''})`,
          html,
        }),
      });
      console.log('resend status', r.status);
    }

    await supabase
      .from('sessions')
      .update({ summary_sent_at: new Date().toISOString() })
      .eq('id', session.id);

    processed.push(session.id);
  }

  return new Response(JSON.stringify({ processed: processed.length }), {
    status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
