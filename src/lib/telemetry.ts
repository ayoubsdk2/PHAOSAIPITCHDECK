import { supabase } from "@/integrations/supabase/client";

const db = supabase as any;

export interface SessionHandle {
  sessionId: string;
  token: string;
}

export async function getClientIp(): Promise<string | null> {
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    const j = await r.json();
    return j.ip ?? null;
  } catch {
    return null;
  }
}

export function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/.test(ua)) return "mobile";
  return "desktop";
}

/**
 * Validates the slug exists and creates a session in one round trip.
 * Returns null if the slug is unknown.
 */
export async function startSession(slug: string): Promise<SessionHandle | null> {
  const ip = await getClientIp();
  const device = detectDevice();
  const { data, error } = await db.rpc("start_session", {
    p_slug: slug,
    p_ip: ip,
    p_device: device,
    p_user_agent: navigator.userAgent.slice(0, 512),
  });
  if (error || !data || !data[0]) return null;
  return { sessionId: data[0].session_id, token: data[0].update_token };
}

export async function heartbeat(h: SessionHandle, totalSeconds: number) {
  await db.rpc("session_heartbeat", {
    p_session_id: h.sessionId,
    p_token: h.token,
    p_total_seconds: Math.round(totalSeconds),
  });
}

export async function upsertSlideView(h: SessionHandle, slideNumber: number, addSeconds: number) {
  await db.rpc("upsert_slide_view", {
    p_session_id: h.sessionId,
    p_token: h.token,
    p_slide_number: slideNumber,
    p_add_seconds: Math.round(addSeconds),
  });
}

export async function logInteraction(
  h: SessionHandle,
  actionType: string,
  metadata: Record<string, unknown> = {}
) {
  await db.rpc("log_interaction", {
    p_session_id: h.sessionId,
    p_token: h.token,
    p_action: actionType,
    p_metadata: metadata,
  });
}
