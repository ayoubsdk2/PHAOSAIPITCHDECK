import React, { useState, useEffect, useCallback, useRef } from "react";
import { ScaledSlide } from "./ScaledSlide";
import { Phaos01Title } from "./slides/Phaos01Title";
import { Phaos02BlueOcean } from "./slides/Phaos02BlueOcean";
import { Phaos03Bottleneck } from "./slides/Phaos03Bottleneck";
import { Phaos04Engine } from "./slides/Phaos04Engine";
import { Phaos05Moat } from "./slides/Phaos05Moat";

import { Phaos06Architecture } from "./slides/Phaos06Architecture";
import { Phaos07MacroMarket } from "./slides/Phaos07MacroMarket";
import { Phaos08MarketSizing } from "./slides/Phaos08MarketSizing";
import { Phaos09TAM } from "./slides/Phaos09TAM";
import { Phaos10Monetization } from "./slides/Phaos10Monetization";
import { Phaos11Validation } from "./slides/Phaos11Validation";
import { Phaos12Ask } from "./slides/Phaos12Ask";
import { Phaos13Founder } from "./slides/Phaos13Founder";
import { Phaos14ThankYou } from "./slides/Phaos14ThankYou";
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft, LayoutGrid, Columns2, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ExportDialog } from "./ExportDialog";
import type { SessionHandle } from "@/lib/telemetry";
import { useIsMobile } from "@/hooks/use-mobile";

interface SlideEntry {
  id: string;
  component: any;
  title: string;
  totalSteps: number;
  fontInvert?: number;
  bgInvert?: number;
}

const initialSlides: SlideEntry[] = [
  { id: "title",        component: null as any,        title: "Title & Executive Summary", totalSteps: 2  },
  { id: "blue-ocean",   component: Phaos02BlueOcean,   title: "Blue Ocean Opportunity",    totalSteps: 15 },
  { id: "bottleneck",   component: Phaos03Bottleneck,  title: "Operational Bottleneck",    totalSteps: 25 },
  { id: "engine",       component: Phaos04Engine,      title: "Workflow Engine",           totalSteps: 5  },
  { id: "moat",         component: Phaos05Moat,        title: "Integration & Data Moat",   totalSteps: 6  },
  { id: "architecture", component: Phaos06Architecture,title: "Technical Architecture",     totalSteps: 4  },
  { id: "macro",        component: Phaos07MacroMarket, title: "Macro Market Realities",    totalSteps: 10 },
  { id: "sizing",       component: Phaos08MarketSizing,title: "Financial Architecture",    totalSteps: 14 },
  { id: "tam",          component: Phaos09TAM,         title: "Expansion Roadmap",         totalSteps: 14 },
  { id: "monetization", component: Phaos10Monetization,title: "Data Asset Playbook",       totalSteps: 14 },
  { id: "validation",   component: Phaos11Validation,  title: "Capital Allocation",        totalSteps: 30 },
  { id: "ask",          component: Phaos12Ask,         title: "Traction & The Ask",        totalSteps: 17 },
  { id: "founder",      component: Phaos13Founder,     title: "Leadership & Scaling Team", totalSteps: 23 },
  { id: "thank-you",    component: Phaos14ThankYou,    title: "Thank You",                  totalSteps: 2  },
];

const MIN_SIDEBAR = 280;
const MAX_SIDEBAR = 1200;

interface PresentationAppProps {
  onSlideChange?: (slideIndex: number) => void;
  session?: SessionHandle | null;
  onExitToStandard?: () => void;
  autoLive?: boolean;
}

export const PresentationApp: React.FC<PresentationAppProps> = ({ onSlideChange, session, onExitToStandard, autoLive }) => {
  const isMobile = useIsMobile();
  const [exportOpen, setExportOpen] = useState(false);
  const [slides, setSlides] = useState<SlideEntry[]>(initialSlides);
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set([0]));
  const [sidebarWidth, setSidebarWidth] = useState(480);
  const [gridView, setGridView] = useState(false);
  const [gridSize, setGridSize] = useState<3 | 4 | 5 | 6>(5);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Track the "anchor" slide for multi-select (first clicked)
  const [anchorSlide, setAnchorSlide] = useState(0);

  // Resize state
  const resizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Drag state
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Context menu state
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; slideIndex: number } | null>(null);

  const maxSteps = slides[current]?.totalSteps ?? 0;

  // Compute thumbnail scale based on sidebar width
  const thumbScale = Math.max(0.15, (sidebarWidth - 60) / 1920);

  const handleSlideClick = useCallback((index: number, e: React.MouseEvent) => {
    if (e.shiftKey && selected.size > 0) {
      const start = Math.min(anchorSlide, index);
      const end = Math.max(anchorSlide, index);
      const newSelected = new Set<number>();
      for (let j = start; j <= end; j++) newSelected.add(j);
      setSelected(newSelected);
      setCurrent(anchorSlide); // preview stays on anchor
    } else if (e.metaKey || e.ctrlKey) {
      const newSelected = new Set(selected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
        if (newSelected.size === 0) newSelected.add(index);
      } else {
        newSelected.add(index);
      }
      setSelected(newSelected);
      // Don't change current/anchor – preview stays on anchor
    } else {
      setSelected(new Set([index]));
      setCurrent(index);
      setAnchorSlide(index);
    }
    setStep(0);
  }, [anchorSlide, selected]);

  const advance = useCallback(() => {
    if (step < maxSteps) {
      setStep((s) => s + 1);
    } else if (current < slides.length - 1) {
      setCurrent((c) => c + 1);
      setStep(0);
    }
  }, [step, maxSteps, current, slides.length]);

  const retreat = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else if (current > 0) {
      const prevIndex = current - 1;
      setCurrent(prevIndex);
      setStep(slides[prevIndex].totalSteps);
    }
  }, [step, current, slides]);

  const goLive = useCallback(() => {
    setIsLive(true);
    document.documentElement.requestFullscreen?.();
  }, []);

  const exitLive = useCallback(() => {
    setIsLive(false);
    if (document.fullscreenElement) document.exitFullscreen();
  }, []);

  // Auto-enter fullscreen when launching from Standard View "PRESENTATION MODE"
  useEffect(() => {
    if (autoLive) {
      const t = setTimeout(() => goLive(), 120);
      return () => clearTimeout(t);
    }
  }, [autoLive, goLive]);

  useEffect(() => {
    const onFS = () => {
      if (!document.fullscreenElement && isLive) setIsLive(false);
    };
    document.addEventListener("fullscreenchange", onFS);
    return () => document.removeEventListener("fullscreenchange", onFS);
  }, [isLive]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); advance(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); retreat(); }
      if (e.key === "Escape" && isLive) { e.preventDefault(); exitLive(); }
      if ((e.key === "f" || e.key === "F5") && !isLive) { e.preventDefault(); goLive(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat, isLive, goLive, exitLive]);

  useEffect(() => {
    const close = () => setCtxMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    onSlideChange?.(current);
  }, [current, onSlideChange]);

  useEffect(() => {
    if (isMobile) setShowSidebar(false);
  }, [isMobile]);

  // Resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = sidebarWidth;
  }, [sidebarWidth]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const delta = e.clientX - startXRef.current;
      const newWidth = Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, startWidthRef.current + delta));
      setSidebarWidth(newWidth);
    };
    const onUp = () => { resizingRef.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newSlides = [...slides];
    const [moved] = newSlides.splice(dragIndex, 1);
    newSlides.splice(dropIndex, 0, moved);
    setSlides(newSlides);

    if (current === dragIndex) {
      setCurrent(dropIndex);
    } else if (dragIndex < current && dropIndex >= current) {
      setCurrent(current - 1);
    } else if (dragIndex > current && dropIndex <= current) {
      setCurrent(current + 1);
    }

    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY, slideIndex: index });
  };

  const deleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (current >= newSlides.length) setCurrent(newSlides.length - 1);
    else if (current > index) setCurrent(current - 1);
    setCtxMenu(null);
  };

  const duplicateSlide = (index: number) => {
    const newSlides = [...slides];
    const dup = { ...newSlides[index], id: newSlides[index].id + "-dup-" + Date.now() };
    newSlides.splice(index + 1, 0, dup);
    setSlides(newSlides);
    setCtxMenu(null);
  };

  const setFontInvert = (index: number, level: number) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], fontInvert: newSlides[index].fontInvert === level ? 0 : level };
    setSlides(newSlides);
    setCtxMenu(null);
  };

  const setBgInvert = (index: number, level: number) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], bgInvert: newSlides[index].bgInvert === level ? 0 : level };
    setSlides(newSlides);
    setCtxMenu(null);
  };

  const getSlideStyle = (slide: SlideEntry): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const filters: string[] = [];
    if (slide.bgInvert === 1) filters.push("invert(0.3)");
    if (slide.bgInvert === 2) filters.push("invert(0.6)");
    if (slide.bgInvert === 3) filters.push("invert(1)");
    if (slide.fontInvert === 1) filters.push("contrast(1.3) brightness(1.1)");
    if (slide.fontInvert === 2) filters.push("contrast(1.6) brightness(1.3)");
    if (slide.fontInvert === 3) filters.push("contrast(2) brightness(1.5)");
    if (filters.length) style.filter = filters.join(" ");
    return style;
  };

  const renderSlide = (index: number, slideStep: number, isThumb = false) => {
    const thumbStep = isThumb ? 999 : slideStep;
    if (index === 0) {
      return <Phaos01Title step={thumbStep} onGoLive={isThumb ? undefined : (isLive ? undefined : goLive)} />;
    }
    const SlideComponent = slides[index].component;
    return <SlideComponent step={thumbStep} />;
  };

  const invertLabels = ["Light", "Medium", "Full"];

  const slideFactories = slides.map((_, i) => () => (
    <div style={{ width: 1920, height: 1080, position: "relative", background: "#0a0e17", ...getSlideStyle(slides[i]) }}>
      {renderSlide(i, 999, true)}
    </div>
  ));

  const exportDialogEl = (
    <ExportDialog
      open={exportOpen}
      onOpenChange={setExportOpen}
      slideFactories={slideFactories}
      session={session}
    />
  );


  // Grid view: full-screen 3-column grid of all thumbnails
  if (gridView && !isLive) {
    const cols = gridSize;
    const rows = gridSize;
    const gap = gridSize <= 3 ? 16 : gridSize <= 4 ? 12 : 8;
    const numFont = gridSize <= 3 ? 16 : gridSize <= 4 ? 14 : 12;
    const numH = numFont + 12;

    return (
      <main className="flex flex-col h-screen w-screen overflow-hidden" style={{ background: "#0a0e17" }}>
        {/* Top bar */}
        <div className="h-[56px] shrink-0 flex items-center justify-center gap-[24px] px-[16px]"
          style={{ background: "#060a12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => setGridView(false)}
            className="flex items-center gap-[8px] px-[16px] py-[8px] rounded-[8px] text-[13px] text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Normal view"
          >
            <Columns2 size={18} />
            <span>Slide View</span>
          </button>
          <div className="flex items-center gap-[4px] rounded-[8px] p-[3px]" style={{ background: "rgba(255,255,255,0.06)" }}>
            {([3, 4, 5, 6] as const).map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className="px-[12px] py-[6px] rounded-[6px] text-[13px] font-semibold transition-all"
                style={{
                  color: gridSize === size ? "#fff" : "rgba(192,192,192,0.6)",
                  background: gridSize === size ? "rgba(255,255,255,0.12)" : "transparent",
                }}
              >
                {size}×{size}
              </button>
            ))}
          </div>
        </div>
        {/* Grid */}
        <div ref={gridContainerRef} className="flex-1 overflow-y-auto p-[12px] grid-scroll" style={{ scrollbarWidth: "auto", scrollbarColor: "rgba(192,192,192,0.4) transparent" }}>
          <style>{`
            .grid-scroll::-webkit-scrollbar { width: 14px; }
            .grid-scroll::-webkit-scrollbar-track { background: transparent; }
            .grid-scroll::-webkit-scrollbar-thumb { background: rgba(192,192,192,0.35); border-radius: 7px; border: 3px solid transparent; background-clip: padding-box; }
            .grid-scroll::-webkit-scrollbar-thumb:hover { background: rgba(192,192,192,0.55); border: 3px solid transparent; background-clip: padding-box; }
          `}</style>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
            {slides.map((s, i) => {
              const isSelected = selected.has(i);
              return (
                <div
                  key={s.id + i}
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDrop={(e) => handleDrop(e, i)}
                  onDragEnd={handleDragEnd}
                  onContextMenu={(e) => handleContextMenu(e, i)}
                  onClick={(e) => handleSlideClick(i, e)}
                  className="cursor-grab active:cursor-grabbing select-none transition-all flex flex-col items-center"
                  style={{
                    opacity: dragIndex === i ? 0.4 : isSelected ? 1 : 0.65,
                    transform: dragOverIndex === i && dragIndex !== i ? "scale(1.02)" : "scale(1)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {dragOverIndex === i && dragIndex !== null && dragIndex !== i && (
                    <div style={{ height: 3, background: "#C0C0C0", borderRadius: 2, marginBottom: 2, width: "100%" }} />
                  )}
                  <div
                    className="w-full rounded-[6px] overflow-hidden"
                    style={{
                      border: isSelected ? "3px solid #C0C0C0" : "3px solid transparent",
                    }}
                  >
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", background: "#0f1520" }}>
                      <div style={{
                        ...getSlideStyle(s),
                        position: "absolute",
                        inset: 0,
                        transformOrigin: "top left",
                        width: 1920,
                        height: 1080,
                        transform: "scale(var(--thumb-s))",
                        pointerEvents: "none",
                      }}
                      ref={(el) => {
                        if (el) {
                          const parent = el.parentElement;
                          if (parent) {
                            const sx = parent.clientWidth / 1920;
                            const sy = parent.clientHeight / 1080;
                            const sc = Math.min(sx, sy);
                            el.style.setProperty("--thumb-s", String(sc));
                            el.style.transform = `scale(${sc})`;
                          }
                        }
                      }}>
                        {renderSlide(i, 999, true)}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold" style={{ color: "#C0C0C0", fontSize: numFont, height: numH, lineHeight: `${numH}px` }}>
                    {i + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {ctxMenu && <ContextMenuPopup ctxMenu={ctxMenu} slides={slides} invertLabels={invertLabels} duplicateSlide={duplicateSlide} deleteSlide={deleteSlide} setFontInvert={setFontInvert} setBgInvert={setBgInvert} />}
        {exportDialogEl}
      </main>
    );
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden" style={{ background: isLive ? "#000" : "#0a0e17" }}>
      {showSidebar && !isLive && (
        <>
          <div
            className="shrink-0 overflow-y-auto py-[16px] px-[16px] flex flex-col gap-[14px] sidebar-scroll"
            style={{
              width: sidebarWidth,
              background: "#060a12",
              borderRight: "none",
              scrollBehavior: "smooth",
            }}
          >
            <style>{`
              .sidebar-scroll::-webkit-scrollbar { width: 14px; }
              .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
              .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(192,192,192,0.35); border-radius: 7px; border: 3px solid transparent; background-clip: padding-box; }
              .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(192,192,192,0.55); border: 3px solid transparent; background-clip: padding-box; }
            `}</style>
            {slides.map((s, i) => {
              const isSelected = selected.has(i);
              return (
                <div
                  key={s.id + i}
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDrop={(e) => handleDrop(e, i)}
                  onDragEnd={handleDragEnd}
                  onContextMenu={(e) => handleContextMenu(e, i)}
                  onClick={(e) => handleSlideClick(i, e)}
                  className="flex items-center gap-[14px] cursor-grab active:cursor-grabbing select-none transition-all"
                  style={{
                    opacity: dragIndex === i ? 0.4 : isSelected ? 1 : 0.6,
                    transform: dragOverIndex === i && dragIndex !== i ? "scale(1.02)" : "scale(1)",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span className="text-[18px] font-bold shrink-0 w-[32px] text-center" style={{ color: "#C0C0C0" }}>
                    {i + 1}
                  </span>
                  <div
                    className="flex-1 rounded-[10px] overflow-hidden"
                    style={{
                      border: isSelected ? "3px solid #C0C0C0" : dragOverIndex === i ? "3px solid rgba(192,192,192,0.4)" : "3px solid transparent",
                    }}
                  >
                    {dragOverIndex === i && dragIndex !== null && dragIndex !== i && (
                      <div style={{ height: 3, background: "#C0C0C0", borderRadius: 2, marginBottom: 2 }} />
                    )}
                    <div className="relative w-full overflow-hidden rounded-[8px]" style={{ aspectRatio: "16/9", background: "#0f1520" }}>
                      <div style={{ ...getSlideStyle(s), transform: `scale(${thumbScale})`, transformOrigin: "top left", width: 1920, height: 1080, pointerEvents: "none" }}>
                        {renderSlide(i, 999, true)}
                      </div>
                    </div>
                    <p className="text-[13px] px-[8px] py-[6px] truncate font-medium" style={{ color: "#fff" }}>
                      {s.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Resize handle */}
          <div
            onMouseDown={handleResizeStart}
            className="shrink-0 flex items-center justify-center cursor-col-resize hover:bg-white/5 transition-colors"
            style={{ width: 8, background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div style={{ width: 3, height: 40, borderRadius: 2, background: "rgba(192,192,192,0.25)" }} />
          </div>
        </>
      )}

      {/* Context Menu */}
      {ctxMenu && <ContextMenuPopup ctxMenu={ctxMenu} slides={slides} invertLabels={invertLabels} duplicateSlide={duplicateSlide} deleteSlide={deleteSlide} setFontInvert={setFontInvert} setBgInvert={setBgInvert} />}

      <div className="flex-1 flex flex-col min-w-0">
        {!isLive && (
          <div className="h-[56px] shrink-0 flex items-center justify-between gap-[8px] px-[10px] sm:px-[16px]"
            style={{ background: "#060a12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-[8px] sm:gap-[12px] min-w-0">
              <button onClick={() => setShowSidebar(!showSidebar)} aria-label={showSidebar ? "Hide slide sidebar" : "Show slide sidebar"} className="text-gray-500 hover:text-white transition-colors">
                {showSidebar ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
              </button>
              <span className="text-[14px] text-gray-500">
                {current + 1} / {slides.length}
              </span>
              <span className="hidden sm:inline text-[12px] text-gray-600 ml-[4px]">
                Step {step}/{maxSteps}
              </span>
            </div>
            <div className="flex items-center gap-[4px] sm:gap-[8px] shrink-0">
              {/* Export button */}
              <button
                onClick={() => setExportOpen(true)}
                aria-label="Export presentation to PDF"
                title="Export to PDF"
                className="flex items-center gap-[5px] px-[8px] sm:px-[12px] py-[6px] rounded-[6px] text-[12px] sm:text-[13px] font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Download size={16} />
                EXPORT
              </button>
              {/* Standard View toggle (returns to scrolling deck) */}
              {onExitToStandard && (
                <button
                  onClick={onExitToStandard}
                  aria-label="Return to Standard View"
                  className="flex items-center gap-[5px] px-[8px] sm:px-[12px] py-[6px] rounded-[6px] text-[12px] sm:text-[13px] font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Standard View"
                >
                  <LayoutGrid size={16} />
                  <span className="hidden sm:inline">Standard View</span>
                </button>
              )}
              <button onClick={retreat} aria-label="Previous slide" className="text-gray-500 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button onClick={advance} aria-label="Next slide" className="text-gray-500 hover:text-white transition-colors">
                <ChevronRight size={20} />
              </button>
              <button
                onClick={goLive}
                aria-label="Enter presentation mode"
                className="ml-[4px] sm:ml-[10px] inline-flex items-center gap-[6px] sm:gap-[8px] px-[12px] sm:px-[20px] py-[9px] sm:py-[11px] rounded-[12px] text-[12px] sm:text-[14px] font-extrabold text-white whitespace-nowrap transition-transform hover:scale-[1.04] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #6B2BD9 0%, #9B5CF6 55%, #C9A6FF 100%)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.10) inset, 0 6px 22px rgba(155,92,246,0.55), 0 0 40px rgba(201,166,255,0.30)",
                  letterSpacing: "0.05em",
                }}
              >
                ▶ <span>PRESENTATION MODE</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 relative overflow-hidden" onClick={(e) => {
          if (isLive) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            if (e.clientX > rect.left + rect.width / 2) advance(); else retreat();
          }
        }}
        style={isLive ? { cursor: "none" } : { cursor: "default" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0" style={getSlideStyle(slides[current])}>
                <ScaledSlide>
                  {renderSlide(current, step)}
                </ScaledSlide>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {isLive && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, #3B9BFF, #60B5FF)" }}
              animate={{ width: `${((current + (step / Math.max(maxSteps, 1))) / slides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>
      {exportDialogEl}
    </main>
  );
};

// Extracted context menu component
const ContextMenuPopup: React.FC<{
  ctxMenu: { x: number; y: number; slideIndex: number };
  slides: SlideEntry[];
  invertLabels: string[];
  duplicateSlide: (i: number) => void;
  deleteSlide: (i: number) => void;
  setFontInvert: (i: number, level: number) => void;
  setBgInvert: (i: number, level: number) => void;
}> = ({ ctxMenu, slides, invertLabels, duplicateSlide, deleteSlide, setFontInvert, setBgInvert }) => (
  <div
    className="fixed z-[9999] rounded-[10px] py-[6px] min-w-[220px] shadow-2xl"
    style={{
      left: ctxMenu.x,
      top: ctxMenu.y,
      background: "#1a1f2e",
      border: "1px solid rgba(255,255,255,0.1)",
    }}
    onClick={(e) => e.stopPropagation()}
  >
    <button onClick={() => duplicateSlide(ctxMenu.slideIndex)} className="w-full px-[16px] py-[10px] text-left text-[14px] text-white hover:bg-white/10 transition-colors">⧉ Duplicate</button>
    <button onClick={() => deleteSlide(ctxMenu.slideIndex)} className="w-full px-[16px] py-[10px] text-left text-[14px] text-red-400 hover:bg-white/10 transition-colors">✕ Delete</button>
    <div className="h-[1px] mx-[12px] my-[4px]" style={{ background: "rgba(255,255,255,0.08)" }} />
    <p className="px-[16px] py-[4px] text-[11px] uppercase tracking-[2px] text-gray-500">Invert Font Colors</p>
    {[1, 2, 3].map((level) => (
      <button key={"f" + level} onClick={() => setFontInvert(ctxMenu.slideIndex, level)} className="w-full px-[16px] py-[8px] text-left text-[13px] text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-[10px]">
        <span className="w-[8px] h-[8px] rounded-full" style={{ background: slides[ctxMenu.slideIndex].fontInvert === level ? "#3B9BFF" : "rgba(255,255,255,0.15)" }} />
        {invertLabels[level - 1]}
      </button>
    ))}
    <div className="h-[1px] mx-[12px] my-[4px]" style={{ background: "rgba(255,255,255,0.08)" }} />
    <p className="px-[16px] py-[4px] text-[11px] uppercase tracking-[2px] text-gray-500">Invert Background</p>
    {[1, 2, 3].map((level) => (
      <button key={"b" + level} onClick={() => setBgInvert(ctxMenu.slideIndex, level)} className="w-full px-[16px] py-[8px] text-left text-[13px] text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-[10px]">
        <span className="w-[8px] h-[8px] rounded-full" style={{ background: slides[ctxMenu.slideIndex].bgInvert === level ? "#3B9BFF" : "rgba(255,255,255,0.15)" }} />
        {invertLabels[level - 1]}
      </button>
    ))}
  </div>
);
