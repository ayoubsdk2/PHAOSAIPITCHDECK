import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter, PulseGlow } from "../RevealElement";
import { ArrowBullet } from "../ArrowBullet";
import { motion } from "framer-motion";

const lineItems = [
  { item: "Premium PLUS License", perLocation: "$499", total: "$2,994" },
  { item: "Platinum PRO Managed Service", perLocation: "$500", total: "$3,000" },
  { item: "True Conversions Ad Management", perLocation: "$900", total: "$5,400" },
];

const included = [
  "Full Referrizer platform access per location",
  "Dedicated marketing expert managing all campaigns",
  "Meta & Google PPC ad management",
  "AI Employee, CRM, pipeline, loyalty, referrals",
  "10-touch lead nurture sequences",
  "Bi-weekly strategy calls & KPI reporting",
  "2,000 SMS credits per location per month",
];

export const Slide10StandardPricing = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex h-full">
      <div className="flex-1 flex flex-col justify-center px-[70px]">
        <RevealElement step={0} currentStep={step} direction="left">
          <p className="text-[20px] uppercase tracking-[6px] mb-[12px] font-semibold" style={{ color: "#3B9BFF" }}>
            Standard Pricing
          </p>
          <h2 className="text-[68px] font-black text-white leading-[0.92] tracking-[-3px] mb-[8px]">
            What This{" "}
            <motion.span
              className="bg-clip-text text-transparent inline-block"
              style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >Normally</motion.span> Costs
          </h2>
          <p className="text-[26px] text-gray-400 mb-[30px]">
            Our standard per-location pricing that <span className="text-white font-bold">many clients already invest in:</span>
          </p>
        </RevealElement>

        {lineItems.map((l, i) => (
          <RevealElement key={i} step={i + 1} currentStep={step} direction="up">
            <GlassCard className="flex items-center gap-[8px] px-[24px] py-[22px] mb-[10px] text-[23px]">
              <span className="flex-1 text-gray-200 font-medium">{l.item}</span>
              <span className="w-[140px] text-right text-gray-500">{l.perLocation}</span>
              <motion.span
                className="w-[160px] text-right text-white font-bold"
                animate={step >= i + 1 ? { opacity: [0, 1] } : {}}
                transition={{ duration: 0.5 }}
              >{l.total}</motion.span>
            </GlassCard>
          </RevealElement>
        ))}

        <RevealElement step={4} currentStep={step} direction="slam">
          <motion.div
            className="mt-[14px]"
            animate={step >= 4 ? { boxShadow: ["0 0 20px rgba(59,155,255,0.1)", "0 0 60px rgba(59,155,255,0.3)", "0 0 20px rgba(59,155,255,0.1)"] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GlassCard className="flex items-center gap-[8px] px-[28px] py-[24px]" glow style={{ border: "2px solid rgba(59,155,255,0.3)" }}>
              <span className="flex-1 text-[28px] text-white font-black">Total Monthly</span>
              <span className="w-[140px] text-right text-[24px] text-gray-400 font-semibold">$1,899</span>
              <PulseGlow color="#3B9BFF" intensity="strong">
                <AnimatedCounter value="$11,394" isVisible={step >= 4} pulse className="w-[160px] text-right text-[38px] font-black block" style={{ color: "#3B9BFF" }} />
              </PulseGlow>
            </GlassCard>
          </motion.div>
        </RevealElement>

        <RevealElement step={5} currentStep={step} direction="up">
          <div className="flex items-center gap-[12px] px-[28px] mt-[18px]">
            <span className="text-[22px] text-gray-500">Setup Fee:</span>
            <span className="text-[22px] text-white font-bold">$1,899 × 6 =</span>
            <motion.span
              className="text-[24px] font-black"
              style={{ color: "#FF6B6B" }}
              animate={step >= 5 ? { opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >$11,394</motion.span>
          </div>
        </RevealElement>
      </div>

      <div className="w-[580px] flex items-center pr-[60px]">
        <RevealElement step={6} currentStep={step} direction="right">
          <GlassCard className="w-full p-[44px]" glow>
            <h3 className="text-[30px] font-black text-white mb-[28px]">Included at Every Location</h3>
            <div className="flex flex-col gap-[20px]">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-[16px]">
                  <ArrowBullet size={24} />
                  <span className="text-[22px] text-gray-200 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </RevealElement>
      </div>
    </div>
  </SlideLayout>
);
