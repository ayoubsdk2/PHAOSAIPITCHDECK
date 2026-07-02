import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { ArrowBullet } from "../ArrowBullet";
import { Facebook, Search, Target, Layout, Mail, Brain, BarChart3, Phone, Crosshair, Video, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import tcLogo from "@/assets/tc-logo.png";

const services = [
  { icon: Facebook, title: "Meta Campaigns", desc: "Facebook & Instagram ads with lookalike audiences, retargeting, and dynamic creative optimization" },
  { icon: Search, title: "Google PPC", desc: "Search & display ads with keyword optimization, local targeting, and smart bidding strategies" },
  { icon: Target, title: "Lead Funnel Design", desc: "High-converting funnels with A/B tested creatives tailored per location" },
  { icon: Layout, title: "Landing Pages", desc: "Custom per-location, mobile-first, conversion-optimized with heatmap tracking" },
  { icon: Mail, title: "10-Touch Nurture", desc: "SMS + email + voicemail automated sequences that convert leads on autopilot" },
  { icon: Brain, title: "AI Lead Engagement", desc: "Instant response, qualification on autopilot, 24/7 — no lead left behind" },
  { icon: BarChart3, title: "KPI Tracking", desc: "Real-time dashboards with CPL, ROAS, and conversion tracking per location" },
  { icon: Phone, title: "Strategy Calls", desc: "Bi-weekly optimization, campaign pivots, goal alignment, and performance reviews" },
  { icon: Crosshair, title: "Geo-Targeting", desc: "Hyper-local campaigns targeting specific zip codes around each gym location" },
  { icon: Video, title: "Video Ads", desc: "Scroll-stopping video ad creation and management across all platforms" },
  { icon: TrendingUp, title: "CRO", desc: "Conversion rate optimization with continuous A/B testing and funnel analysis" },
  { icon: Calendar, title: "Monthly Deep-Dives", desc: "Comprehensive performance reviews with actionable insights and next steps" },
];

export const Slide08TrueConversions = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[60px] py-[32px]">
      <div className="flex items-center justify-between mb-[16px]">
        <RevealElement step={0} currentStep={step} direction="left">
          <p className="text-[18px] uppercase tracking-[6px] mb-[6px] font-semibold" style={{ color: "#3B9BFF" }}>True Conversions</p>
          <h2 className="text-[58px] font-black text-white leading-[1] tracking-[-3px] mb-[2px]">
            Performance Ad{" "}
            <motion.span
              className="bg-clip-text text-transparent inline-block"
              style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF)" }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >Management</motion.span>
          </h2>
          <p className="text-[20px] text-gray-400">Turn ad spend into <span className="text-white font-bold">measurable membership growth</span> across all 6 locations.</p>
        </RevealElement>
        <RevealElement step={0} currentStep={step} direction="fade">
          <img src={tcLogo} alt="True Conversions" className="h-[50px] object-contain opacity-70" />
        </RevealElement>
      </div>

      <div className="grid grid-cols-4 gap-[10px] flex-1 content-start">
        {services.map((s, i) => (
          <RevealElement key={i} step={i + 1} currentStep={step} direction="scale">
            <GlassCard className="p-[20px] h-full" glow>
              <motion.div
                className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center mb-[10px]"
                style={{ background: "rgba(59,155,255,0.1)" }}
                animate={step >= i + 1 ? { boxShadow: ["0 0 0px rgba(59,155,255,0)", "0 0 25px rgba(59,155,255,0.3)", "0 0 0px rgba(59,155,255,0)"] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
              >
                <s.icon size={22} style={{ color: "#3B9BFF" }} />
              </motion.div>
              <h3 className="text-[18px] font-bold text-white mb-[4px]">{s.title}</h3>
              <p className="text-[14px] text-gray-400 leading-snug">{s.desc}</p>
            </GlassCard>
          </RevealElement>
        ))}
      </div>

      <RevealElement step={13} currentStep={step} direction="slam" className="mt-[10px]">
        <motion.div
          className="text-center py-[16px] px-[40px] rounded-[16px]"
          style={{ background: "rgba(59,155,255,0.06)", border: "2px solid rgba(59,155,255,0.2)" }}
          animate={{ boxShadow: ["0 0 20px rgba(59,155,255,0.08)", "0 0 50px rgba(59,155,255,0.2)", "0 0 20px rgba(59,155,255,0.08)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-[22px] font-bold" style={{ color: "#3B9BFF" }}>Every dollar tracked. Every lead nurtured. Every location growing.</p>
        </motion.div>
      </RevealElement>
    </div>
  </SlideLayout>
);
