import React from "react";

interface SlideLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "manifesto" | "dark" | "glow";
}

// Phaos brand palette
// primary purple #9B5CF6, glow #B987FF, deep #6D28D9, ultra #7C3AED
// gold accent for money/ROI emphasis: #D4B25A
export const SlideLayout: React.FC<SlideLayoutProps> = ({ children, className = "", variant = "default" }) => {
  const bg = {
    default: "linear-gradient(160deg, #07040f 0%, #11071f 40%, #0a0413 100%)",
    manifesto: "linear-gradient(160deg, #07040f 0%, #100620 50%, #07040f 100%)",
    dark: "linear-gradient(160deg, #030106 0%, #0c0518 50%, #060211 100%)",
    glow: "linear-gradient(160deg, #07040f 0%, #14082a 40%, #0c0520 100%)",
  };

  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`} style={{ background: bg[variant] }}>
      {/* Mesh gradient orb 1 - purple glow */}
      <div className="absolute top-[-300px] right-[-100px] w-[900px] h-[900px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(155,92,246,0.10) 0%, transparent 60%)", filter: "blur(80px)" }} />
      {/* Mesh gradient orb 2 - deep violet */}
      <div className="absolute bottom-[-400px] left-[-300px] w-[1000px] h-[1000px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 60%)", filter: "blur(100px)" }} />
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(155,92,246,0.13) 30%, rgba(185,135,255,0.40) 50%, rgba(155,92,246,0.13) 70%, transparent 100%)" }} />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

// Glassmorphism card wrapper
export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ children, className = "", glow = false, style }) => (
  <div
    className={`rounded-[20px] ${className}`}
    style={{
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(155,92,246,0.10)",
      boxShadow: glow ? "0 0 60px rgba(155,92,246,0.12), inset 0 1px 0 rgba(255,255,255,0.05)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
      ...style,
    }}
  >
    {children}
  </div>
);

// Phaos color tokens reusable in slides
export const PHAOS = {
  primary: "#9B5CF6",
  glow: "#B987FF",
  deep: "#6D28D9",
  ultra: "#7C3AED",
  gold: "#D4B25A",
  goldGlow: "#F0D78C",
};
