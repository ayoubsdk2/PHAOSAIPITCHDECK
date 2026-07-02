import { SlideLayout, PHAOS } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { motion } from "framer-motion";

interface Props { step: number; }

export const Phaos14ThankYou = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="relative flex flex-col items-center justify-center h-full px-[80px] py-[60px] overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${PHAOS.primary}22 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, ${PHAOS.gold}18 0%, transparent 55%)`,
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <RevealElement step={1} currentStep={step} direction="scale">
        <motion.h1
          className="text-[300px] font-black leading-none tracking-[-6px] text-center bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${PHAOS.glow} 50%, ${PHAOS.goldGlow} 100%)`,
            filter: `drop-shadow(0 0 60px ${PHAOS.primary}66)`,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Thank You!
        </motion.h1>
      </RevealElement>

      <RevealElement step={2} currentStep={step} direction="up" delay={0.2} className="mt-[80px] max-w-[1500px] w-full">
        <div className="px-[80px]">
          <p
            className="text-[64px] font-black leading-[1.15] text-center italic"
            style={{
              color: "#ffffff",
              textShadow: `0 0 30px ${PHAOS.goldGlow}66`,
            }}
          >
            "Commit to the Lord whatever you do, and he will establish your plans."
          </p>
          <p
            className="text-[36px] font-black text-center mt-[36px] tracking-[0.18em] uppercase"
            style={{ color: PHAOS.primary }}
          >
            — Proverbs 16:3
          </p>
        </div>
      </RevealElement>
    </div>
  </SlideLayout>
);
