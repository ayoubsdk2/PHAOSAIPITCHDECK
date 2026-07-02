import { useEffect, useRef } from "react";
import {
  heartbeat,
  upsertSlideView,
  logInteraction,
  type SessionHandle,
} from "@/lib/telemetry";

interface Props {
  session: SessionHandle;
  currentSlide: number;
}

export const TelemetryTracker: React.FC<Props> = ({ session, currentSlide }) => {
  const lastSlideRef = useRef<number>(currentSlide);
  const slideEnterRef = useRef<number>(Date.now());
  const totalRef = useRef<number>(0);
  const totalAnchorRef = useRef<number>(Date.now());
  const visibleRef = useRef<boolean>(!document.hidden);

  const flushSlide = async () => {
    const elapsed = (Date.now() - slideEnterRef.current) / 1000;
    if (elapsed > 0.5 && visibleRef.current) {
      await upsertSlideView(session, lastSlideRef.current, elapsed);
    }
    slideEnterRef.current = Date.now();
  };

  const bumpTotal = () => {
    if (visibleRef.current) {
      totalRef.current += (Date.now() - totalAnchorRef.current) / 1000;
    }
    totalAnchorRef.current = Date.now();
  };

  // slide change
  useEffect(() => {
    const prev = lastSlideRef.current;
    if (prev === currentSlide) return;
    (async () => {
      await flushSlide();
      if (currentSlide < prev) {
        await logInteraction(session, "slide_reversal", { from: prev, to: currentSlide });
      }
      lastSlideRef.current = currentSlide;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // heartbeat every 10s
  useEffect(() => {
    const t = setInterval(async () => {
      bumpTotal();
      await heartbeat(session, Math.round(totalRef.current));
    }, 10_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // visibility + unload
  useEffect(() => {
    const onVis = async () => {
      if (document.hidden) {
        bumpTotal();
        visibleRef.current = false;
        await flushSlide();
        await heartbeat(session, Math.round(totalRef.current));
      } else {
        visibleRef.current = true;
        slideEnterRef.current = Date.now();
        totalAnchorRef.current = Date.now();
      }
    };
    const onUnload = () => {
      bumpTotal();
      // best-effort final heartbeat
      void heartbeat(session, Math.round(totalRef.current));
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", onUnload);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", onUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
