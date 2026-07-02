import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const db = supabase as any;

type Range = "24h" | "7d" | "30d" | "all" | "custom";

interface Prospect { id: string; full_name: string; business: string; prefix_slug: string; created_at: string; }
interface Session {
  id: string; prospect_id: string; ip_address: string | null; device_type: string | null;
  user_agent: string | null; start_time: string; last_heartbeat: string; end_time: string | null;
  total_duration_seconds: number; is_active: boolean;
}
interface SlideView { id: string; session_id: string; slide_number: number; time_spent_seconds: number; timestamp: string; }
interface Interaction { id: string; session_id: string; action_type: string; metadata: any; timestamp: string; }

const fmtDur = (sec: number) => {
  if (!sec) return "0s";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s}s`;
  return `${s}s`;
};
const fmtDate = (iso: string) => new Date(iso).toLocaleString();

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<Range>("7d");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [slideViews, setSlideViews] = useState<SlideView[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dateBounds = useMemo(() => {
    const now = new Date();
    if (range === "custom") {
      return {
        from: from ? new Date(from).toISOString() : null,
        to: to ? new Date(to + "T23:59:59").toISOString() : null,
      };
    }
    if (range === "all") return { from: null, to: null };
    const map: Record<string, number> = { "24h": 1, "7d": 7, "30d": 30 };
    const days = map[range];
    return {
      from: new Date(now.getTime() - days * 24 * 3600 * 1000).toISOString(),
      to: null as string | null,
    };
  }, [range, from, to]);

  const load = async () => {
    setLoading(true);
    const { data: pData } = await db.from("prospects").select("*").order("created_at", { ascending: false });
    setProspects((pData as Prospect[]) ?? []);

    let q = db.from("sessions").select("*").order("start_time", { ascending: false });
    if (dateBounds.from) q = q.gte("start_time", dateBounds.from);
    if (dateBounds.to) q = q.lte("start_time", dateBounds.to);
    const { data: sData } = await q;
    const sessionList = (sData as Session[]) ?? [];
    setSessions(sessionList);

    const ids = sessionList.map((s) => s.id);
    if (ids.length) {
      const { data: svData } = await db.from("slide_views").select("*").in("session_id", ids);
      setSlideViews((svData as SlideView[]) ?? []);
      const { data: iData } = await db.from("interactions").select("*").in("session_id", ids);
      setInteractions((iData as Interaction[]) ?? []);
    } else {
      setSlideViews([]);
      setInteractions([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [range, from, to]);

  // Aggregates
  const totals = useMemo(() => {
    const uniqueIps = new Set(sessions.map((s) => s.ip_address || "").filter(Boolean));
    const totalTime = sessions.reduce((a, s) => a + (s.total_duration_seconds || 0), 0);
    const activeNow = sessions.filter((s) => s.is_active).length;
    return {
      prospects: prospects.length,
      sessions: sessions.length,
      uniqueIps: uniqueIps.size,
      totalTime,
      reversals: interactions.filter((i) => i.action_type === "slide_reversal").length,
      activeNow,
    };
  }, [prospects, sessions, interactions]);

  const perProspect = useMemo(() => {
    return prospects.map((p) => {
      const ps = sessions.filter((s) => s.prospect_id === p.id);
      const ips = new Set(ps.map((s) => s.ip_address || "").filter(Boolean));
      const total = ps.reduce((a, s) => a + (s.total_duration_seconds || 0), 0);
      const last = ps.length ? ps[0].start_time : null;
      return { prospect: p, sessions: ps.length, ips: ips.size, total, last };
    }).sort((a, b) => (b.last ?? "").localeCompare(a.last ?? ""));
  }, [prospects, sessions]);

  const selected = selectedProspect ? prospects.find((p) => p.id === selectedProspect) : null;
  const selectedSessions = useMemo(
    () => sessions.filter((s) => s.prospect_id === selectedProspect).sort((a, b) => b.start_time.localeCompare(a.start_time)),
    [sessions, selectedProspect],
  );
  const selectedIpMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of selectedSessions) {
      const ip = s.ip_address || "unknown";
      m.set(ip, (m.get(ip) || 0) + (s.total_duration_seconds || 0));
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [selectedSessions]);
  const latestSession = selectedSessions[0];
  const latestSlides = useMemo(
    () => latestSession ? slideViews.filter((v) => v.session_id === latestSession.id).sort((a, b) => a.slide_number - b.slide_number) : [],
    [latestSession, slideViews],
  );
  const latestInteractions = useMemo(
    () => latestSession ? interactions.filter((i) => i.session_id === latestSession.id).sort((a, b) => b.timestamp.localeCompare(a.timestamp)) : [],
    [latestSession, interactions],
  );
  const emailEvents = useMemo(() => {
    const sessionById = new Map(sessions.map((s) => [s.id, s]));
    const prospectById = new Map(prospects.map((p) => [p.id, p]));
    return interactions
      .filter((i) => i.action_type === "export_emailed" || i.action_type === "export_email_requested")
      .map((i) => {
        const s = sessionById.get(i.session_id);
        return { interaction: i, session: s, prospect: s ? prospectById.get(s.prospect_id) : undefined };
      })
      .sort((a, b) => b.interaction.timestamp.localeCompare(a.interaction.timestamp));
  }, [interactions, prospects, sessions]);

  return (
    <div className="space-y-6">
      {/* Range filter */}
      <Card>
        <CardHeader><CardTitle>Time Range</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            {(["24h", "7d", "30d", "all", "custom"] as Range[]).map((r) => (
              <Button key={r} size="sm" variant={range === r ? "default" : "outline"} onClick={() => setRange(r)}>
                {r === "24h" ? "Last 24h" : r === "7d" ? "Last 7 days" : r === "30d" ? "Last 30 days" : r === "all" ? "All time" : "Custom"}
              </Button>
            ))}
            {range === "custom" && (
              <>
                <div className="space-y-1">
                  <Label className="text-xs">From</Label>
                  <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">To</Label>
                  <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
                </div>
              </>
            )}
            <Button size="sm" variant="ghost" onClick={load} disabled={loading}>{loading ? "Loading…" : "Refresh"}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Totals */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
        <Stat label="Prospects" value={totals.prospects} />
        <Stat label="Sessions" value={totals.sessions} />
        <Stat label="Unique IPs" value={totals.uniqueIps} />
        <Stat label="Total time" value={fmtDur(totals.totalTime)} />
        <Stat label="Slide reversals" value={totals.reversals} />
        <Stat label="Deck emails" value={emailEvents.length} />
        <Stat label="Active now" value={totals.activeNow} />
      </div>

      <Card>
        <CardHeader><CardTitle>Email exports</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Prospect</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Message ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailEvents.map(({ interaction, prospect }) => (
                <TableRow key={interaction.id}>
                  <TableCell className="text-sm">{fmtDate(interaction.timestamp)}</TableCell>
                  <TableCell className="font-medium">{interaction.metadata?.to ?? "—"}</TableCell>
                  <TableCell>{prospect ? `${prospect.full_name} — ${prospect.business}` : "—"}</TableCell>
                  <TableCell>{interaction.metadata?.delivery ?? interaction.metadata?.method ?? "—"}</TableCell>
                  <TableCell className="font-mono text-xs">{interaction.metadata?.providerMessageId ?? "—"}</TableCell>
                </TableRow>
              ))}
              {emailEvents.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No email exports in this range</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Per prospect */}
      <Card>
        <CardHeader><CardTitle>Prospects</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Sessions</TableHead>
                <TableHead className="text-right">Unique IPs</TableHead>
                <TableHead className="text-right">Total time</TableHead>
                <TableHead>Last accessed</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perProspect.map((p) => (
                <TableRow key={p.prospect.id} className={selectedProspect === p.prospect.id ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">{p.prospect.full_name}</TableCell>
                  <TableCell>{p.prospect.business}</TableCell>
                  <TableCell className="font-mono text-xs">{p.prospect.prefix_slug}</TableCell>
                  <TableCell className="text-right">{p.sessions}</TableCell>
                  <TableCell className="text-right">{p.ips}</TableCell>
                  <TableCell className="text-right">{fmtDur(p.total)}</TableCell>
                  <TableCell className="text-sm">{p.last ? fmtDate(p.last) : "—"}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setSelectedProspect(p.prospect.id)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
              {perProspect.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground">No prospects</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drill-down */}
      {selected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selected.full_name} — {selected.business}</span>
              <Button size="sm" variant="ghost" onClick={() => setSelectedProspect(null)}>Close</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Time spent per IP</h3>
              <Table>
                <TableHeader><TableRow><TableHead>IP</TableHead><TableHead className="text-right">Time</TableHead></TableRow></TableHeader>
                <TableBody>
                  {selectedIpMap.map(([ip, sec]) => (
                    <TableRow key={ip}><TableCell className="font-mono text-xs">{ip}</TableCell><TableCell className="text-right">{fmtDur(sec)}</TableCell></TableRow>
                  ))}
                  {selectedIpMap.length === 0 && <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground">No sessions</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="font-semibold mb-2">All sessions</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Started</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSessions.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="text-sm">{fmtDate(s.start_time)}</TableCell>
                      <TableCell className="font-mono text-xs">{s.ip_address || "—"}</TableCell>
                      <TableCell>{s.device_type || "—"}</TableCell>
                      <TableCell className="text-right">{fmtDur(s.total_duration_seconds)}</TableCell>
                      <TableCell>{s.is_active ? <span className="text-green-600">active</span> : "ended"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {latestSession && (
              <div>
                <h3 className="font-semibold mb-2">Latest session — slide breakdown ({fmtDate(latestSession.start_time)})</h3>
                <Table>
                  <TableHeader><TableRow><TableHead>Slide</TableHead><TableHead className="text-right">Time</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {latestSlides.map((v) => (
                      <TableRow key={v.id}><TableCell>Slide {v.slide_number + 1}</TableCell><TableCell className="text-right">{fmtDur(v.time_spent_seconds)}</TableCell></TableRow>
                    ))}
                    {latestSlides.length === 0 && <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground">No slide data</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </div>
            )}

            {latestInteractions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Latest session — interactions</h3>
                <Table>
                  <TableHeader><TableRow><TableHead>Time</TableHead><TableHead>Action</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {latestInteractions.map((i) => (
                      <TableRow key={i.id}>
                        <TableCell className="text-sm">{fmtDate(i.timestamp)}</TableCell>
                        <TableCell>{i.action_type}</TableCell>
                        <TableCell className="font-mono text-xs">{JSON.stringify(i.metadata)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-xs uppercase text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}
