import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, PulseGlow } from "../RevealElement";
import { Gift, Heart, Star, MessageSquare, BarChart3, Bot, Users, Plug, Smartphone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import referrizerLogo from "@/assets/referrizer-logo.png";

const features = [
  { icon: Gift, title: "Referral Program", desc: "Turn members into ambassadors with automated reward tracking" },
  { icon: Heart, title: "Loyalty & Rewards", desc: "Points-based retention that reduces churn by 25%+" },
  { icon: Star, title: "Reputation + AI Replies", desc: "Auto-request reviews, AI-respond to dominate local search" },
  { icon: MessageSquare, title: "SMS/Email Campaigns", desc: "Targeted blasts and automated drip sequences at scale" },
  { icon: BarChart3, title: "Pipeline Management", desc: "Visual deal tracking with lead scoring — never lose a prospect" },
  { icon: Bot, title: "AI Employee", desc: "24/7 instant lead response that books appointments on autopilot" },
  { icon: Users, title: "CRM / Quick Connect", desc: "Full contact management with complete interaction history" },
  { icon: Plug, title: "30+ Integrations", desc: "MINDBODY, Stripe, Zapier — seamless tech stack sync" },
  { icon: Smartphone, title: "48,000 SMS/mo Total", desc: "8,000 per location across all 6. Overages at $0.01/SMS" },
  { icon: Mail, title: "150,000 Emails/mo Total", desc: "25,000 per location across all 6. Overages at $0.0025/email" },
];

export const Slide06PremiumPlus = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[60px] py-[36px]">
      <div className="flex items-center justify-between mb-[20px]">
        <RevealElement step={0} currentStep={step} direction="left">
          <p className="text-[18px] uppercase tracking-[6px] mb-[8px] font-semibold" style={{ color: "#3B9BFF" }}>Premium PLUS</p>
          <h2 className="text-[64px] font-black text-white leading-[0.92] tracking-[-3px] mb-[4px]">
            The Full Marketing{" "}
            <motion.span
              className="bg-clip-text text-transparent inline-block"
              style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF)" }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >Engine</motion.span>
          </h2>
          <p className="text-[22px] text-gray-400">Every tool you need to <span className="text-white font-bold">attract, engage, and retain</span> members across all 6 locations.</p>
        </RevealElement>
        <RevealElement step={0} currentStep={step} direction="fade">
          <img src={referrizerLogo} alt="Referrizer" className="h-[44px] object-contain opacity-60" />
        </RevealElement>
      </div>

      <div className="grid grid-cols-2 gap-[12px] flex-1 content-start">
        {features.map((f, i) => (
          <RevealElement key={i} step={i + 1} currentStep={step} direction="scale">
            <GlassCard className="p-[22px] flex items-start gap-[14px]" glow>
              <motion.div
                className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shrink-0"
                style={{ background: "rgba(59,155,255,0.1)" }}
                animate={step >= i + 1 ? { boxShadow: ["0 0 0px rgba(59,155,255,0)", "0 0 25px rgba(59,155,255,0.3)", "0 0 0px rgba(59,155,255,0)"] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
              >
                <f.icon size={24} style={{ color: "#3B9BFF" }} />
              </motion.div>
              <div>
                <h3 className="text-[22px] font-bold text-white mb-[2px]">{f.title}</h3>
                <p className="text-[18px] text-gray-400 leading-snug">{f.desc}</p>
              </div>
            </GlassCard>
          </RevealElement>
        ))}
      </div>
    </div>
  </SlideLayout>
);
