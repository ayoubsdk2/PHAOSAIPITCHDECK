import { useEffect, useRef, useState } from "react";
import { Play, Download } from "lucide-react";
import { ScaledSlide } from "./ScaledSlide";
import { DECK_SLIDES } from "./deckSlides";
import { ExportDialog } from "./ExportDialog";
import type { SessionHandle } from "@/lib/telemetry";

interface StandardDeckViewProps {
  onEnterPresentation: () => void;
  onSlideChange?: (slideIndex: number) => void;
  session?: SessionHandle | null;
}

export const StandardDeckView: React.FC<StandardDeckViewProps> = ({ onEnterPresentation, onSlideChange, session }) => {
  const [visibleSlide, setVisibleSlide] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.isIntersecting) {
          const idx = Number((best.target as HTMLElement).dataset.idx);
          if (!Number.isNaN(idx)) setVisibleSlide(idx);
        }
      },
      { threshold: [0.3, 0.6, 0.9] }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onSlideChange?.(visibleSlide);
  }, [visibleSlide, onSlideChange]);

  const slideFactories = DECK_SLIDES.map((s, i) => () => {
    const Comp = s.component;
    return (
      <div style={{ width: 1920, height: 1080, position: "relative", background: "#0a0e17" }}>
        <Comp step={999} />
      </div>
    );
  });

  return (
    <main className="min-h-screen w-full" style={{ background: "#0a0e17" }}>
      {/* Sticky top bar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-6 h-[60px] sm:h-[64px]"
        style={{
          background: "rgba(6,10,18,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(155,92,246,0.18)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-black text-[15px] sm:text-[18px] tracking-tight truncate">
            Phaos <span style={{ color: "#C9A6FF" }}>AI</span>
          </span>
          <span className="text-gray-500 text-[12px] sm:text-[13px] tabular-nums whitespace-nowrap">
            {visibleSlide + 1} / {DECK_SLIDES.length}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setExportOpen(true)}
            aria-label="Export presentation"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-[8px] text-[13px] font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download size={16} /> Export
          </button>
          <button
            onClick={onEnterPresentation}
            aria-label="Enter presentation mode"
            className="inline-flex items-center gap-2 px-4 sm:px-7 py-2.5 sm:py-3 rounded-[12px] text-[13px] sm:text-[15px] font-extrabold text-white whitespace-nowrap transition-transform hover:scale-[1.04] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #6B2BD9 0%, #9B5CF6 55%, #C9A6FF 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.10) inset, 0 8px 28px rgba(155,92,246,0.55), 0 0 60px rgba(201,166,255,0.35)",
              letterSpacing: "0.05em",
            }}
          >
            <Play size={16} fill="white" />
            <span>PRESENTATION MODE</span>
          </button>
        </div>
      </header>

      {/* Slide stack */}
      <div className="flex flex-col items-center gap-6 sm:gap-10 py-6 sm:py-10 px-3 sm:px-8">
        {DECK_SLIDES.map((s, i) => {
          const Comp = s.component;
          return (
            <section
              key={s.id}
              ref={(el) => { slideRefs.current[i] = el; }}
              data-idx={i}
              aria-label={`Slide ${i + 1}: ${s.title}`}
              className="relative w-full max-w-[1600px] rounded-[14px] overflow-hidden"
              style={{
                aspectRatio: "16 / 9",
                background: "#0a0e17",
                boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(155,92,246,0.18)",
              }}
            >
              <div className="absolute top-2 left-3 z-10 text-[11px] sm:text-[12px] font-bold text-white/55 tabular-nums">
                {i + 1} / {DECK_SLIDES.length}
              </div>
              <ScaledSlide>
                <Comp step={s.totalSteps} />
              </ScaledSlide>
            </section>
          );
        })}
      </div>

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        slideFactories={slideFactories}
        session={session ?? null}
      />
    </main>
  );
};
