import { SlideLayout } from "../SlideLayout";
import { Play } from "lucide-react";
import { RevealElement, PulseGlow } from "../RevealElement";
import { motion } from "framer-motion";
import epicLogo from "@/assets/epic-logo-transparent.png";

interface Slide01TitleProps {
  step: number;
  onGoLive?: () => void;
}

export const Slide01Title = ({ step, onGoLive }: Slide01TitleProps) => (
  <SlideLayout variant="manifesto">
    <div className="flex flex-col items-center justify-center h-full px-[80px] text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,155,255,0.12) 0%, transparent 50%)", filter: "blur(80px)" }} />

      <PulseGlow color="#3B9BFF" intensity="strong">
        <h1 className="text-[110px] font-black text-white tracking-[-4px] leading-[0.95] mb-[16px]">
          Your Path to{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF, #3B9BFF)" }}>
            Growth
          </span>
        </h1>
      </PulseGlow>

      <motion.div
        className="w-[400px] h-[4px] rounded-full mt-[24px] mb-[36px]"
        style={{ background: "linear-gradient(90deg, transparent, #3B9BFF, transparent)" }}
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <RevealElement step={0} currentStep={step} direction="up" className="flex flex-col items-center">
        <p className="text-[38px] text-gray-400 mb-[24px] font-light tracking-wide">
          A Custom Growth Strategy for
        </p>
        <motion.img
          src={epicLogo}
          alt="Epic Health & Fitness"
          className="h-[156px] object-contain"
          style={{ filter: "drop-shadow(0 0 18px hsl(var(--primary) / 0.65)) drop-shadow(0 0 48px hsl(var(--primary) / 0.4)) brightness(1.08)" }}
          animate={{ opacity: [0.94, 1, 0.94], scale: [1, 1.02, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </RevealElement>

      <RevealElement step={1} currentStep={step} direction="up">
        <div className="flex gap-[120px] text-gray-400 mt-[36px]">
          <div className="text-left">
            <p className="text-[15px] uppercase tracking-[6px] mb-[16px] font-medium" style={{ color: "#3B9BFF66" }}>Prepared For</p>
            <p className="text-gray-100 text-[30px] font-semibold">Ryan Unger <span className="text-gray-600 text-[22px] font-normal ml-[10px]">CEO</span></p>
            <p className="text-gray-100 text-[30px] font-semibold">Tom Cromer <span className="text-gray-600 text-[22px] font-normal ml-[10px]">Owner</span></p>
          </div>
          <div className="w-[2px] rounded-full" style={{ background: "linear-gradient(180deg, transparent, #3B9BFF44, transparent)" }} />
          <div className="text-left">
            <p className="text-[15px] uppercase tracking-[6px] mb-[16px] font-medium" style={{ color: "#3B9BFF66" }}>Presented By</p>
            <p className="text-gray-100 text-[30px] font-semibold">Daniel Lindros <span className="text-gray-600 text-[22px] font-normal ml-[10px]">VP of Sales</span></p>
            <p className="text-gray-100 text-[30px] font-semibold">Nina Delic <span className="text-gray-600 text-[22px] font-normal ml-[10px]">Senior AE</span></p>
          </div>
        </div>
      </RevealElement>

      {onGoLive && (
        <RevealElement step={2} currentStep={step} direction="scale" delay={0.3}>
          <motion.button
            onClick={(e) => { e.stopPropagation(); onGoLive(); }}
            className="mt-[50px] inline-flex items-center gap-[14px] px-[70px] py-[24px] rounded-[16px] text-[24px] font-bold text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg, #0056B3, #003d80)", boxShadow: "0 4px 60px rgba(59,155,255,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 80px rgba(59,155,255,0.6)" }}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: ["0 4px 40px rgba(59,155,255,0.3)", "0 4px 80px rgba(59,155,255,0.5)", "0 4px 40px rgba(59,155,255,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Play size={26} fill="white" /> Present Live
          </motion.button>
        </RevealElement>
      )}
    </div>
  </SlideLayout>
);
