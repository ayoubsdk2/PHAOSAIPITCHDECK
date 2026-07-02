import { SlideLayout } from "../SlideLayout";
import { RevealElement, PulseGlow } from "../RevealElement";
import referrizerArrow from "@/assets/referrizer-arrow-bullet.png";
import { Shield, Calendar, Clock, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const terms = [
  {
    icon: Calendar,
    title: "12-Month Commitment",
    bullets: ["A partnership built for lasting results", "12 months to fully realize the ROI", "Consistent strategy compounds over time"],
    color: "#3B9BFF",
  },
  {
    icon: Shield,
    title: "60-Day No-Penalty Cancel",
    bullets: ["We're confident in the results", "If it's not working within 60 days, cancel free", "Zero risk to get started"],
    color: "#22c55e",
  },
  {
    icon: Clock,
    title: "Payment Starts After Activation",
    bullets: ["First $9,600 payment not due for 30 days", "Billing begins after all 6 licenses are live", "Time to onboard before you pay"],
    color: "#60B5FF",
  },
  {
    icon: CreditCard,
    title: "Setup: $1,000 Per Location",
    bullets: ["Only $6,000 total (reduced from $11,394)", "Covers onboarding, config, and campaign launch", "Saving $5,394 on setup alone"],
    color: "#FBBF24",
  },
];

export const Slide13Terms = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[70px] py-[44px]">
      <RevealElement step={0} currentStep={step} direction="left">
        <p className="text-[22px] uppercase tracking-[6px] mb-[10px] font-semibold" style={{ color: "#3B9BFF" }}>
          Terms & Commitment
        </p>
        <h2 className="text-[70px] font-black text-white mb-[6px] leading-[0.92] tracking-[-3px]">
          Structured for Your{" "}
          <motion.span
            className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >Success</motion.span>
        </h2>
        <p className="text-[28px] text-gray-400 mb-[36px]">
          Transparent terms designed to <span className="text-white font-bold">reduce your risk</span> and maximize your return.
        </p>
      </RevealElement>

      <div className="grid grid-cols-2 gap-[20px] flex-1">
        {terms.map((t, i) => (
          <RevealElement key={i} step={i + 1} currentStep={step} direction={i % 2 === 0 ? "left" : "right"}>
            <div className="p-[36px] rounded-[20px] flex items-start gap-[24px] h-full"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${t.color}22` }}>
              <PulseGlow color={t.color} intensity="medium">
                <motion.div
                  className="w-[68px] h-[68px] rounded-[16px] flex items-center justify-center shrink-0"
                  style={{ background: `${t.color}15` }}
                  animate={step >= i + 1 ? { boxShadow: [`0 0 0px ${t.color}00`, `0 0 30px ${t.color}44`, `0 0 0px ${t.color}00`] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <t.icon size={34} style={{ color: t.color }} />
                </motion.div>
              </PulseGlow>
              <div>
                <h3 className="text-[30px] font-black text-white mb-[24px]">{t.title}</h3>
                <div className="flex flex-col gap-[18px]">
                  {t.bullets.map((b, j) => (
                    <div key={j} className="flex items-center gap-[12px]">
                      <img src={referrizerArrow} alt="" className="shrink-0" style={{ width: 31, height: 31 }} />
                      <span className="text-[31px] text-gray-300 leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealElement>
        ))}
      </div>

      <RevealElement step={5} currentStep={step} direction="slam" className="mt-[16px]">
        <motion.div
          className="text-center py-[18px] rounded-[14px]"
          style={{ background: "rgba(34,197,94,0.08)", border: "2px solid rgba(34,197,94,0.25)" }}
          animate={{ boxShadow: ["0 0 20px rgba(34,197,94,0.1)", "0 0 50px rgba(34,197,94,0.25)", "0 0 20px rgba(34,197,94,0.1)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-[26px] font-black text-green-400">
            Zero risk. Maximum upside. Your first month is on us to prove it.
          </p>
        </motion.div>
      </RevealElement>
    </div>
  </SlideLayout>
);
