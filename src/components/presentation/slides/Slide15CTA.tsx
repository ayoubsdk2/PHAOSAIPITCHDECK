import { SlideLayout } from "../SlideLayout";
import { RevealElement, PulseGlow } from "../RevealElement";
import { motion } from "framer-motion";
import epicLogo from "@/assets/epic-logo-transparent.png";
import referrizerLogo from "@/assets/referrizer-logo.png";
import tcLogo from "@/assets/tc-logo.png";

export const Slide15CTA = ({ step }: { step: number }) => (
  <SlideLayout variant="manifesto">
    <div className="flex flex-col items-center justify-center h-full px-[100px] text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(59,155,255,0.14) 0%, transparent 50%)", filter: "blur(100px)" }} />

      {/* Push content up to account for 25% white footer */}
      <div className="flex flex-col items-center justify-center flex-1 pb-[270px]">
        <RevealElement step={0} currentStep={step} direction="slam">
          <PulseGlow color="#3B9BFF" intensity="strong">
            <h2 className="text-[110px] font-black text-white mb-[16px] leading-[0.95] tracking-[-4px]">
              Let's Build Something<br />
              <motion.span
                className="bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF, #3B9BFF)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >Epic</motion.span> Together.
            </h2>
          </PulseGlow>
        </RevealElement>

        <RevealElement step={0} currentStep={step} direction="fade" delay={0.3}>
          <motion.div
            className="w-[400px] h-[4px] rounded-full my-[28px]"
            style={{ background: "linear-gradient(90deg, transparent, #3B9BFF, transparent)" }}
            animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </RevealElement>

        <RevealElement step={1} currentStep={step} direction="up">
          <p className="text-[34px] text-gray-400 mb-[40px] max-w-[1000px] leading-relaxed">
            Ready to transform all 6 locations with a unified growth strategy?<br />
            <motion.span
              className="text-white font-bold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >Let's get started today.</motion.span>
          </p>
        </RevealElement>

        <RevealElement step={2} currentStep={step} direction="up">
          <div className="flex gap-[100px]">
            <div className="text-center">
              <p className="text-[36px] font-bold text-white mb-[4px]">Daniel Lindros</p>
              <p className="text-[24px] text-gray-500">VP of Sales</p>
            </div>
            <div className="text-center">
              <p className="text-[36px] font-bold text-white mb-[4px]">Nina Delic</p>
              <p className="text-[24px] text-gray-500">Senior Account Executive</p>
            </div>
          </div>
        </RevealElement>
      </div>

      {/* White bottom strip — 25% height, hard border */}
      <RevealElement step={3} currentStep={step} direction="up">
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-[100px]"
          style={{ height: "25%", background: "#ffffff" }}
        >
          <motion.img
            src={referrizerLogo}
            alt="Referrizer"
            className="h-[90px] object-contain"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="w-[2px] h-[70px] bg-gray-300 rounded-full" />
          <motion.img
            src={epicLogo}
            alt="Epic Health & Fitness"
            className="h-[130px] object-contain"
            style={{ filter: "drop-shadow(0 0 18px hsl(var(--primary) / 0.65)) drop-shadow(0 0 48px hsl(var(--primary) / 0.4)) brightness(1.08)" }}
            animate={{ opacity: [0.94, 1, 0.94], scale: [1, 1.02, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="w-[2px] h-[70px] bg-gray-300 rounded-full" />
          <motion.img
            src={tcLogo}
            alt="True Conversions"
            className="h-[112px] object-contain"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </div>
      </RevealElement>
    </div>
  </SlideLayout>
);
