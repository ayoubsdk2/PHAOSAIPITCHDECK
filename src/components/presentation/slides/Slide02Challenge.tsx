import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { Target, TrendingDown, Zap, Users, Clock, DollarSign, Search, RefreshCw, AlertTriangle, Eye } from "lucide-react";
import { motion } from "framer-motion";

const challengesLeft = [
  { icon: Target, label: "Competitors dominating your search results and stealing members" },
  { icon: TrendingDown, label: "Revenue swings wildly month to month — no predictability" },
  { icon: Zap, label: "Ads burning cash but membership growth stays flat" },
  { icon: Users, label: "Leads come in, but nobody follows up fast enough" },
  { icon: AlertTriangle, label: "Your team is overwhelmed juggling marketing + daily ops" },
];

const challengesRight = [
  { icon: Clock, label: "No system to respond in the critical first 5 minutes" },
  { icon: DollarSign, label: "Marketing budget evaporating with zero clear ROI" },
  { icon: Search, label: "No unified view of performance across all locations" },
  { icon: RefreshCw, label: "Branding is inconsistent — every gym feels like a different business" },
  { icon: Eye, label: "Negative reviews going unanswered on Google & Yelp" },
];

export const Slide02Challenge = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="grid h-full grid-cols-[420px_1fr] gap-[84px] px-[60px] py-[48px]">
      <RevealElement step={0} currentStep={step} direction="left" className="flex h-full flex-col justify-center">
        <p className="text-[18px] uppercase tracking-[6px] mb-[12px] font-semibold" style={{ color: "#FF6B6B" }}>
          The Challenge
        </p>
        <h2 className="text-[92px] font-black text-white leading-[0.86] tracking-[-4px] mb-[28px]">
          <span className="block">Does this</span>
          <span className="block">sound</span>
          <motion.span
            className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(135deg, #FF6B6B, #FF8E8E)" }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            familiar?
          </motion.span>
        </h2>
        <p className="text-[26px] text-gray-400 leading-[1.4]">
          Growing a multi-location fitness business means facing these{" "}
          <motion.span
            className="text-white font-bold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            every single day.
          </motion.span>
        </p>
      </RevealElement>

      <div className="flex h-full flex-col justify-center">
        <div className="grid w-full grid-cols-2 gap-x-[64px] gap-y-[40px]">
          <div className="flex flex-col gap-[40px]">
            {challengesLeft.map((c, i) => (
              <RevealElement key={i} step={i + 1} currentStep={step} direction="left" delay={0}>
                <GlassCard className="min-h-[118px] px-[28px] py-[24px] flex items-center gap-[18px]">
                  <motion.div
                    className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,107,107,0.12)" }}
                    animate={step >= i + 1 ? { boxShadow: ["0 0 0px rgba(255,107,107,0)", "0 0 20px rgba(255,107,107,0.3)", "0 0 0px rgba(255,107,107,0)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <c.icon size={24} style={{ color: "#FF8E8E" }} />
                  </motion.div>
                  <p className="text-[22px] text-gray-200 font-medium leading-snug">{c.label}</p>
                </GlassCard>
              </RevealElement>
            ))}
          </div>

          <div className="flex flex-col gap-[40px]">
            {challengesRight.map((c, i) => (
              <RevealElement key={i + 5} step={i + 6} currentStep={step} direction="right" delay={0}>
                <GlassCard className="min-h-[118px] px-[28px] py-[24px] flex items-center gap-[18px]">
                  <motion.div
                    className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,107,107,0.12)" }}
                    animate={step >= i + 6 ? { boxShadow: ["0 0 0px rgba(255,107,107,0)", "0 0 20px rgba(255,107,107,0.3)", "0 0 0px rgba(255,107,107,0)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <c.icon size={24} style={{ color: "#FF8E8E" }} />
                  </motion.div>
                  <p className="text-[22px] text-gray-200 font-medium leading-snug">{c.label}</p>
                </GlassCard>
              </RevealElement>
            ))}
          </div>
        </div>

        <RevealElement step={11} currentStep={step} direction="slam" className="mt-[40px]">
          <motion.div
            className="text-center py-[18px] px-[40px] rounded-[16px]"
            style={{ background: "rgba(255,107,107,0.06)", border: "2px solid rgba(255,107,107,0.2)" }}
            animate={step >= 11 ? { boxShadow: ["0 0 20px rgba(255,107,107,0.08)", "0 0 50px rgba(255,107,107,0.25)", "0 0 20px rgba(255,107,107,0.08)"] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-[26px] font-bold italic" style={{ color: "#FF6B6B" }}>
              These compound across 6 locations.
            </p>
          </motion.div>
        </RevealElement>
      </div>
    </div>
  </SlideLayout>
);
