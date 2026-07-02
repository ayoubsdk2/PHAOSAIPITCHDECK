import React, { useRef, useEffect, useState } from "react";

interface ScaledSlideProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SLIDE_W = 1920;
const SLIDE_H = 1080;

export const ScaledSlide: React.FC<ScaledSlideProps> = ({ children, className = "", onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const sx = parent.clientWidth / SLIDE_W;
      const sy = parent.clientHeight / SLIDE_H;
      setScale(Math.min(sx, sy));
    };
    resize();
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    if (containerRef.current?.parentElement) ro.observe(containerRef.current.parentElement);
    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute slide-content ${className}`}
      onClick={onClick}
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        left: "50%",
        top: "50%",
        marginLeft: -SLIDE_W / 2,
        marginTop: -SLIDE_H / 2,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};
