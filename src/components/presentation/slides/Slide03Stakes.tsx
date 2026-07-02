import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter, PulseGlow } from "../RevealElement";
import { motion } from "framer-motion";

const stakes = [
  { amount: "$2,000+", label: "Wasted monthly on ads that don't convert", impact: "$144,000/yr across 6 gyms burned.", source: "WordStream", color: "#FF6B6B" },
  { amount: "78%", label: "Of leads buy from the FIRST responder", impact: "Slow response = handing members to competitors.", source: "Harvard Business Review", color: "#FBBF24" },
  { amount: "5 min", label: "After 5 min, contact rates drop 400%", impact: "6 locations × missed leads = massive leak.", source: "MIT / InsideSales", color: "#FF6B6B" },
  { amount: "67%", label: "Of leads never get follow-up", impact: "Hundreds of potential members ghosted monthly.", source: "Drift", color: "#FBBF24" },
  { amount: "40%", label: "Of members churn within 90 days", impact: "~240 lost members/yr across 6 gyms.", source: "IHRSA", color: "#FF6B6B" },
  { amount: "80%", label: "Of sales need 5+ follow-ups", impact: "Your team can't keep up without automation.", source: "Marketing Donut", color: "#FBBF24" },
  { amount: "10x", label: "ROI with automated lead nurture", impact: "Every lead becomes a revenue opportunity.", source: "Forrester", color: "#22c55e" },
  { amount: "50%", label: "More leads with unified marketing", impact: "One system, 6 locations = exponential growth.", source: "HubSpot", color: "#22c55e" },
];

export const Slide03Stakes = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[60px] py-[36px]">
      <RevealElement step={0} currentStep={step} direction="left">
        <p className="text-[18px] uppercase tracking-[6px] mb-[8px] font-semibold" style={{ color: "#FBBF24" }}>The Stakes</p>
        <h2 className="text-[64px] font-black text-white leading-[1.1] tracking-[-1px] mb-[12px]">
          What Inaction <motion.span
            className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >Really</motion.span> Costs
        </h2>
        <p className="text-[22px] text-gray-500 mb-[48px]">The data is clear — the longer you wait, the more you lose.</p>
      </RevealElement>

      <div className="grid grid-cols-4 gap-[24px]">
        {stakes.map((s, i) => (
          <RevealElement key={i} step={i + 1} currentStep={step} direction="flash" delay={0}>
            <GlassCard className="p-[22px] py-[28px] flex flex-col h-full min-h-[220px]" glow>
              <PulseGlow color={s.color} intensity="medium" className="mb-[6px]">
                <AnimatedCounter
                  value={s.amount}
                  isVisible={step >= i + 1}
                  pulse
                  className="text-[46px] font-black block leading-none"
                  style={{ color: s.color }}
                />
              </PulseGlow>
              <p className="text-[18px] text-gray-200 font-semibold leading-snug mb-[6px]">{s.label}</p>
              <motion.p
                className="text-[15px] font-black mb-[6px]"
                style={{ color: "#FBBF24" }}
                animate={step >= i + 1 ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              >
                — {s.source}
              </motion.p>
              <p className="text-[16.5px] text-red-400/80 leading-snug italic mt-auto">{s.impact}</p>
            </GlassCard>
          </RevealElement>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <RevealElement step={9} currentStep={step} direction="slam">
          <div className="flex items-center justify-center gap-[40px]">
            <p className="text-[27px] text-gray-400 uppercase tracking-[4px] font-semibold mr-[20px]">
              Estimated Lost Monthly Revenue
            </p>
            <div className="text-center">
              <p className="text-[14px] text-gray-500 uppercase tracking-[2px] mb-[4px]">Conservative</p>
              <PulseGlow color="#FF6B6B" intensity="strong">
                <AnimatedCounter value="$18,000" isVisible={step >= 9} pulse className="text-[52px] font-black block" style={{ color: "#FF6B6B" }} />
              </PulseGlow>
              <p className="text-[14px] text-gray-500">/month</p>
            </div>
            <motion.span
              className="text-[36px] text-gray-600 font-light"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >→</motion.span>
            <div className="text-center">
              <p className="text-[14px] text-gray-500 uppercase tracking-[2px] mb-[4px]">Aggressive</p>
              <PulseGlow color="#FF6B6B" intensity="strong">
                <AnimatedCounter value="$45,000" isVisible={step >= 9} pulse className="text-[52px] font-black block" style={{ color: "#FF6B6B" }} />
              </PulseGlow>
              <p className="text-[14px] text-gray-500">/month</p>
            </div>
          </div>
        </RevealElement>
      </div>

      <RevealElement step={10} currentStep={step} direction="slam">
        <motion.div
          className="text-center py-[14px] px-[40px] rounded-[16px]"
          style={{ background: "rgba(251,191,36,0.08)", border: "2px solid rgba(251,191,36,0.3)" }}
          animate={{ boxShadow: ["0 0 20px rgba(251,191,36,0.1)", "0 0 60px rgba(251,191,36,0.25)", "0 0 20px rgba(251,191,36,0.1)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-[24px] font-black italic" style={{ color: "#FBBF24" }}>
            The feast-or-famine cycle continues — unless you change the approach.
          </p>
        </motion.div>
      </RevealElement>
    </div>
  </SlideLayout>
);
