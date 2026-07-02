import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { to, filename, pdfBase64, exportUrl, session_id, update_token } = await req.json();

    if (!to || typeof to !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return new Response(JSON.stringify({ error: "Invalid recipient email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if ((!pdfBase64 || typeof pdfBase64 !== "string") && (!exportUrl || typeof exportUrl !== "string")) {
      return new Response(JSON.stringify({ error: "Missing export link" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (typeof pdfBase64 === "string" && pdfBase64.length > 30_000_000) {
      return new Response(JSON.stringify({ error: "PDF too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authorization: either a valid admin JWT, or a valid prospect session_id+update_token pair.
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    let authorized = false;

    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const jwt = authHeader.slice(7);
      const anon = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!);
      const { data: claims } = await anon.auth.getClaims(jwt);
      const sub = claims?.claims?.sub;
      if (sub) {
        const { data: isAdmin } = await admin.rpc("has_role", { _user_id: sub, _role: "admin" });
        if (isAdmin) authorized = true;
      }
    }

    if (!authorized && typeof session_id === "string" && typeof update_token === "string") {
      const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuid.test(session_id) && uuid.test(update_token)) {
        const { data } = await admin
          .from("sessions")
          .select("id")
          .eq("id", session_id)
          .eq("update_token", update_token)
          .maybeSingle();
        if (data) authorized = true;
      }
    }

    if (!authorized) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("RESEND_FROM_EMAIL") ?? "Phaos AI <noreply@phaosai.com>";
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(apiKey);
    const safeName = (filename && /^[\w.\-]+\.pdf$/i.test(filename)) ? filename : "phaos-pitch-deck.pdf";

    const escapeHtml = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    const ALLOWED_HOSTS = new Set(["pitch-deck.phaosai.com", "phaos-prezenter.lovable.app"]);
    let link: string | null = null;
    if (typeof exportUrl === "string") {
      try {
        const u = new URL(exportUrl);
        if (u.protocol === "https:" && (ALLOWED_HOSTS.has(u.hostname) || u.hostname.endsWith(".lovable.app"))) {
          link = u.toString();
        }
      } catch { /* invalid url */ }
      if (!link) {
        return new Response(JSON.stringify({ error: "Invalid export URL" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    const safeLink = link ? escapeHtml(link) : null;
    const { data: sendData, error } = await resend.emails.send({
      from,
      to: [to],
      subject: "Phaos AI Pitch Deck",
      html: `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.55"><p>Hi,</p><p>Here is the Phaos AI pitch deck:</p>${safeLink ? `<p><a href="${safeLink}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700">Open pitch deck export</a></p><p style="font-size:13px;color:#555">If the button does not work, copy this link:<br/><a href="${safeLink}">${safeLink}</a></p>` : `<p>The pitch deck PDF is attached.</p>`}<p>— Phaos AI</p></div>`,
      attachments: typeof pdfBase64 === "string"
        ? [{ filename: safeName, content: pdfBase64 }]
        : [],
    } as any);

    if (error) {
      return new Response(JSON.stringify({ error: (error as any).message ?? "Send failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (typeof session_id === "string" && typeof update_token === "string") {
      await admin.rpc("log_interaction", {
        p_session_id: session_id,
        p_token: update_token,
        p_action: "export_emailed",
        p_metadata: {
          to,
          filename: safeName,
          exportUrl: link,
          providerMessageId: (sendData as any)?.id ?? null,
          delivery: typeof pdfBase64 === "string" ? "attachment" : "hosted_export_link",
          source: "email_function",
        },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
