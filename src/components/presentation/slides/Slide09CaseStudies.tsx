import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter, PulseGlow } from "../RevealElement";
import { motion } from "framer-motion";

const cases = [
  {
    title: "Boutique Fitness Studio — Grand Opening",
    stats: [{ value: "289", label: "Leads" }, { value: "$4.61", label: "CPL" }, { value: "112", label: "Members" }],
    story: "Launched with zero brand recognition. Within 90 days, reached 78% capacity using Meta + Google ads with automated nurture.",
  },
  {
    title: "Multi-Location Gym Chain — 4 Locations",
    stats: [{ value: "1,200+", label: "Leads in 6mo" }, { value: "$6.12", label: "CPL" }, { value: "38%", label: "Conversion" }],
    story: "Replaced 3 separate vendors with one unified system. Cut costs 40% while increasing lead volume 65% across all locations.",
  },
  {
    title: "CrossFit Box — Retention Overhaul",
    stats: [{ value: "52%", label: "Less Churn" }, { value: "4.8★", label: "Google" }, { value: "3x", label: "Referrals" }],
    story: "Deployed loyalty rewards, automated review requests, and referral incentives. Retention improved dramatically, referrals tripled.",
  },
  {
    title: "Yoga & Wellness — Digital Transformation",
    stats: [{ value: "10x", label: "Ad ROI" }, { value: "87%", label: "Follow-Up" }, { value: "$22", label: "Acq. Cost" }],
    story: "Moved from word-of-mouth to a full digital funnel. AI Employee converted leads overnight that would have been lost forever.",
  },
];

export const Slide09CaseStudies = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[70px] py-[44px]">
      <RevealElement step={0} currentStep={step} direction="left">
        <p className="text-[20px] uppercase tracking-[6px] mb-[10px] font-semibold" style={{ color: "#22c55e" }}>Proven Results</p>
        <h2 className="text-[74px] font-black text-white leading-[0.92] tracking-[-3px] mb-[6px]">
          Real Clients.{" "}
          <motion.span
            className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(135deg, #22c55e, #4ade80)" }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >Real Numbers.</motion.span>
        </h2>
        <p className="text-[26px] text-gray-500 mb-[30px]">Here's what happens when fitness businesses partner with us.</p>
      </RevealElement>

      <div className="grid grid-cols-2 gap-[18px] flex-1">
        {cases.map((c, i) => (
          <RevealElement key={i} step={i + 1} currentStep={step} direction={i % 2 === 0 ? "left" : "right"}>
            <GlassCard className="p-[34px] h-full flex flex-col" glow style={{ border: "1px solid rgba(34,197,94,0.15)" }}>
              <h3 className="text-[26px] font-bold text-white mb-[20px]">{c.title}</h3>
              <div className="flex gap-[24px] mb-[18px] flex-1 items-center">
                {c.stats.map((s, j) => (
                  <div key={j} className="text-center flex-1 flex flex-col justify-center">
                    <PulseGlow color="#22c55e" intensity="soft">
                      <AnimatedCounter
                        value={s.value}
                        isVisible={step >= i + 1}
                        pulse
                        className="text-[57px] font-black block"
                        style={{ color: "#3B9BFF" }}
                      />
                    </PulseGlow>
                    <p className="text-[15px] text-gray-500 uppercase tracking-[1px] mt-[4px]">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[20px] text-gray-400 leading-relaxed mt-auto">{c.story}</p>
            </GlassCard>
          </RevealElement>
        ))}
      </div>
    </div>
  </SlideLayout>
);
