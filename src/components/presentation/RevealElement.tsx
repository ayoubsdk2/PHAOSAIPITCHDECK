import React from "react";
import { motion } from "framer-motion";

interface RevealElementProps {
  children: React.ReactNode;
  step: number;
  currentStep: number;
  direction?: "up" | "left" | "right" | "scale" | "fade" | "flash" | "slam";
  delay?: number;
  className?: string;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  flash: {
    hidden: { opacity: 0, scale: 0.3, filter: "brightness(3)" },
    visible: { opacity: 1, scale: 1, filter: "brightness(1)" },
  },
  slam: {
    hidden: { opacity: 0, scale: 2.5, y: -100 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
};

const isExportRender = () => typeof window !== "undefined" && Boolean((window as any).__PHAOS_EXPORTING__);

export const RevealElement: React.FC<RevealElementProps> = ({
  children,
  step,
  currentStep,
  direction = "up",
  delay = 0,
  className = "",
}) => {
  const isVisible = currentStep >= step;

  if (isExportRender()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: direction === "slam" ? 0.5 : direction === "flash" ? 0.4 : 0.7,
        delay: isVisible ? delay : 0,
        ease: direction === "slam" ? [0.22, 1, 0.36, 1] : [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

// Counter animation for big numbers with optional glow pulse
export const AnimatedCounter: React.FC<{
  value: string;
  isVisible: boolean;
  className?: string;
  style?: React.CSSProperties;
  pulse?: boolean;
}> = ({ value, isVisible, className = "", style, pulse = false }) => {
  if (isExportRender()) {
    return <span className={className} style={style}>{value}</span>;
  }

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              scale: [0.3, 1.15, 1],
              filter: pulse
                ? ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                : undefined,
            }
          : { opacity: 0, scale: 0.3 }
      }
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {value}
    </motion.span>
  );
};

// Pulsing glow wrapper for emphasis
export const PulseGlow: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
  intensity?: "soft" | "medium" | "strong";
}> = ({ children, color = "#3B9BFF", className = "", intensity = "medium" }) => {
  if (isExportRender()) {
    return <div className={className}>{children}</div>;
  }

  const spread = { soft: 20, medium: 40, strong: 80 }[intensity];
  return (
    <motion.div
      className={className}
      animate={{
        filter: [
          `drop-shadow(0 0 ${spread * 0.5}px ${color}44)`,
          `drop-shadow(0 0 ${spread}px ${color}88)`,
          `drop-shadow(0 0 ${spread * 0.5}px ${color}44)`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// Typewriter-style flash text
export const FlashText: React.FC<{
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, isVisible, className = "", style }) => {
  if (isExportRender()) {
    return <span className={className} style={style}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={
        isVisible
          ? {
              opacity: [0, 1, 0.6, 1],
              textShadow: [
                "0 0 0px transparent",
                "0 0 30px rgba(59,155,255,0.8)",
                "0 0 10px rgba(59,155,255,0.3)",
                "0 0 0px transparent",
              ],
            }
          : { opacity: 0 }
      }
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.span>
  );
};
