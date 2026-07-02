import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter, PulseGlow } from "../RevealElement";
import { ArrowBullet } from "../ArrowBullet";
import { motion } from "framer-motion";

const included = [
  "6 Premium PLUS licenses — full platform access",
  "Platinum PRO — dedicated expert for all 6 locations",
  "True Conversions — full ad management for all 6",
  "48,000 SMS credits/month (8,000 per location)",
  "150,000 email credits/month (25,000 per location)",
  "Bi-weekly strategy & optimization calls",
];

export const Slide11Pricing = ({ step }: { step: number }) => (
  <SlideLayout variant="glow">
    <div className="flex flex-col h-full px-[120px] py-[60px]">
      <RevealElement step={0} currentStep={step} direction="left">
        <p className="text-[18px] uppercase tracking-[6px] mb-[10px] font-semibold" style={{ color: "#22c55e" }}>
          The Epic Deal
        </p>
        <h2 className="text-[66px] font-black text-white leading-[0.92] tracking-[-3px] mb-[16px]">
          6 Locations.<br />One{" "}
          <motion.span
            className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(135deg, #22c55e, #4ade80)" }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >Powerful</motion.span> Price.
        </h2>
      </RevealElement>

      <div className="flex flex-1 items-center justify-center gap-[60px]">
        <div className="w-[700px] flex flex-col justify-center">
            <RevealElement step={1} currentStep={step} direction="slam">
              <div className="mb-[10px]">
                <div className="flex items-end gap-[16px] mb-[12px]">
                  <PulseGlow color="#3B9BFF" intensity="strong">
                    <AnimatedCounter value="$1,600" isVisible={step >= 1} pulse className="text-[110px] font-black leading-none block" style={{ color: "#3B9BFF" }} />
                  </PulseGlow>
                  <span className="text-[28px] text-gray-500 mb-[20px]">per location / mo</span>
                </div>
                <div className="flex items-center gap-[16px] mb-[12px]">
                  <span className="text-[32px] text-gray-600 line-through">$1,899</span>
                  <motion.span
                    className="text-[26px] font-black px-[18px] py-[6px] rounded-[10px]"
                    style={{ color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                    animate={{ opacity: [0.7, 1, 0.7], boxShadow: ["0 0 10px rgba(34,197,94,0.1)", "0 0 30px rgba(34,197,94,0.3)", "0 0 10px rgba(34,197,94,0.1)"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >Save $299/location</motion.span>
                </div>
              </div>
            </RevealElement>

            <RevealElement step={2} currentStep={step} direction="flash">
              <div className="flex items-center gap-[16px] mb-[12px]">
                <div className="h-[3px] w-[50px]" style={{ background: "rgba(59,155,255,0.4)" }} />
                <PulseGlow color="#3B9BFF" intensity="medium">
                  <span className="text-[52px] font-black text-white">$9,600<span className="text-[24px] text-gray-500 font-normal ml-[8px]">/mo total</span></span>
                </PulseGlow>
              </div>
            </RevealElement>

            <RevealElement step={3} currentStep={step} direction="up">
              <GlassCard className="inline-block px-[28px] py-[16px] mt-[10px]">
                <span className="text-[22px] text-gray-300">+ $500 – $1,500/mo in ad spend</span>
              </GlassCard>
            </RevealElement>
        </div>

        <RevealElement step={4} currentStep={step} direction="right">
          <GlassCard className="w-[620px] p-[40px]" glow style={{ border: "1px solid rgba(34,197,94,0.2)" }}>
            <h3 className="text-[30px] font-black text-white mb-[28px]">Everything Included</h3>
            <div className="flex flex-col gap-[22px]">
              {included.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-[14px]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={step >= 5 + i ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ArrowBullet size={24} />
                  <span className="text-[22px] text-gray-200 leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </RevealElement>
      </div>
    </div>
  </SlideLayout>
);
