import { SlideLayout, PHAOS } from "../SlideLayout";
import { Play } from "lucide-react";
import { RevealElement, PulseGlow } from "../RevealElement";
import { motion } from "framer-motion";
import phaosLogo from "@/assets/phaos-logo-clear.png";

interface Props {
  step: number;
  onGoLive?: () => void;
}

export const Phaos01Title = ({ step, onGoLive }: Props) => (
  <SlideLayout variant="manifesto">
    <div className="flex flex-col items-center justify-center h-full px-[80px] text-center relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${PHAOS.primary}26 0%, transparent 55%)`, filter: "blur(90px)" }}
      />

      <PulseGlow color={PHAOS.primary} intensity="strong">
        <motion.img
          src={phaosLogo}
          alt="Phaos AI"
          width={323}
          height={280}
          fetchPriority="high"
          decoding="async"
          className="h-[280px] w-auto object-contain"
          style={{ filter: `drop-shadow(0 0 28px ${PHAOS.primary}aa) drop-shadow(0 0 80px ${PHAOS.deep}80)` }}
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </PulseGlow>

      <motion.div
        className="w-[480px] h-[3px] rounded-full mt-[36px] mb-[28px]"
        style={{ background: `linear-gradient(90deg, transparent, ${PHAOS.glow}, transparent)` }}
        animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <h1 className="sr-only">Phaos AI — Autonomous Voice Agents</h1>
      <p className="text-[44px] text-gray-200 font-light tracking-wide mb-[14px]" aria-hidden="true">
        Autonomous Voice Agents <span className="text-gray-500 mx-[10px]">·</span>{" "}
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${PHAOS.glow}, ${PHAOS.primary})` }}>
          Agentic Workflow Automation
        </span>
      </p>

      <RevealElement step={0} currentStep={step} direction="up">
        <div className="flex items-center justify-center gap-[18px] mt-[28px]">
          {[
            "Pre-Seed Pitch Deck",
            "$250,000 SAFE Raise",
            "Daniel Lindros · Founder & CEO",
          ].map((t, i) => (
            <div
              key={i}
              className="px-[26px] py-[12px] rounded-full text-[20px] font-semibold whitespace-nowrap"
              style={{
                background: "rgba(155,92,246,0.10)",
                border: `1px solid ${PHAOS.primary}55`,
                color: "#E9E1FF",
                boxShadow: `0 0 30px ${PHAOS.primary}22`,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </RevealElement>

      <RevealElement step={1} currentStep={step} direction="up" delay={0.1}>
        <p className="max-w-[1300px] text-[26px] text-gray-300 leading-[1.45] mt-[42px] font-light">
          Phaos AI deploys <span className="text-white font-semibold">deeply integrated intelligent voice agents</span> acting as a digital workforce for the document solutions & printing industry. Bridging inbound telephony and legacy ERPs through{" "}
          <span style={{ color: PHAOS.glow }} className="font-semibold">agentic workflow orchestration</span>.
        </p>
      </RevealElement>

      {onGoLive && (
        <RevealElement step={2} currentStep={step} direction="scale" delay={0.2}>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onGoLive();
            }}
            className="mt-[44px] inline-flex items-center gap-[14px] px-[60px] py-[20px] rounded-[14px] text-[22px] font-bold text-white cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${PHAOS.deep}, ${PHAOS.ultra})`,
              boxShadow: `0 4px 60px ${PHAOS.primary}66, inset 0 1px 0 rgba(255,255,255,0.12)`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: [`0 4px 40px ${PHAOS.primary}55`, `0 4px 90px ${PHAOS.primary}88`, `0 4px 40px ${PHAOS.primary}55`] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Play size={24} fill="white" /> Present Live
          </motion.button>
        </RevealElement>
      )}
    </div>
  </SlideLayout>
);
