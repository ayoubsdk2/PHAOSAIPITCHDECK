import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter, PulseGlow } from "../RevealElement";
import { TrendingDown, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const Slide12Savings = ({ step }: { step: number }) => (
  <SlideLayout variant="manifesto">
    <div className="flex flex-col items-center justify-center h-full px-[80px] text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 50%)", filter: "blur(100px)" }} />

      <RevealElement step={0} currentStep={step} direction="up">
        <p className="text-[18px] uppercase tracking-[6px] mb-[12px] font-semibold" style={{ color: "#22c55e" }}>
          Your Savings
        </p>
        <h2 className="text-[72px] font-black text-white leading-[0.92] tracking-[-3px] mb-[30px]">
          Built for{" "}
          <motion.span
            className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(135deg, #22c55e, #4ade80)" }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >ROI</motion.span> from Day One
        </h2>
      </RevealElement>

      <div className="flex items-stretch gap-[30px] mb-[30px]">
        <RevealElement step={1} currentStep={step} direction="flash">
          <GlassCard className="w-[460px] p-[36px] text-center flex flex-col justify-center h-full" glow style={{ border: "1px solid rgba(34,197,94,0.25)" }}>
            <TrendingDown size={40} className="mx-auto mb-[12px]" style={{ color: "#22c55e" }} />
            <p className="text-[20px] text-gray-400 mb-[8px]">Monthly Savings</p>
            <PulseGlow color="#22c55e" intensity="strong">
              <AnimatedCounter value="$1,794" isVisible={step >= 1} pulse className="text-[64px] font-black block" style={{ color: "#22c55e" }} />
            </PulseGlow>
            <p className="text-[18px] text-gray-500 mt-[6px]">saved every month vs. standard pricing</p>
          </GlassCard>
        </RevealElement>

        <RevealElement step={2} currentStep={step} direction="flash">
          <GlassCard className="w-[460px] p-[36px] text-center flex flex-col justify-center h-full" glow style={{ border: "1px solid rgba(34,197,94,0.25)" }}>
            <ArrowDown size={40} className="mx-auto mb-[12px]" style={{ color: "#22c55e" }} />
            <p className="text-[20px] text-gray-400 mb-[8px]">Setup Fee Reduced</p>
            <div className="flex items-center justify-center gap-[14px] mb-[6px]">
              <span className="text-[28px] text-gray-600 line-through">$11,394</span>
              <motion.span className="text-[26px] text-gray-500" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              <AnimatedCounter value="$6,000" isVisible={step >= 2} pulse className="text-[44px] font-black block text-white" />
            </div>
            <motion.p
              className="text-[18px] font-bold"
              style={{ color: "#22c55e" }}
              animate={step >= 2 ? { textShadow: ["0 0 0px transparent", "0 0 20px rgba(34,197,94,0.5)", "0 0 0px transparent"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >Saving $5,394 on setup</motion.p>
          </GlassCard>
        </RevealElement>
      </div>

      <RevealElement step={3} currentStep={step} direction="slam">
        <motion.div
          className="px-[80px] py-[40px] rounded-[24px]"
          style={{
            background: "linear-gradient(135deg, rgba(59,155,255,0.12) 0%, rgba(34,197,94,0.08) 100%)",
            border: "3px solid rgba(59,155,255,0.3)",
          }}
          animate={{ boxShadow: ["0 0 40px rgba(59,155,255,0.1)", "0 0 120px rgba(59,155,255,0.25)", "0 0 40px rgba(59,155,255,0.1)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <p className="text-[22px] text-gray-400 mb-[8px]">Total First-Year Savings</p>
          <PulseGlow color="#3B9BFF" intensity="strong">
            <AnimatedCounter value="$26,922" isVisible={step >= 3} pulse className="text-[90px] font-black block" style={{ color: "#3B9BFF" }} />
          </PulseGlow>
          <p className="text-[20px] text-gray-400 mt-[6px]">in reduced pricing to maximize your ROI</p>
        </motion.div>
      </RevealElement>
    </div>
  </SlideLayout>
);
