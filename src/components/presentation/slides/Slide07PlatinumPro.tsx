import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, PulseGlow } from "../RevealElement";
import { Palette, BarChart3, Rocket, RefreshCw, MapPin, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Palette, title: "Content Curation & Design", desc: "Custom creative for each location, on-brand social assets, campaign copy that converts" },
  { icon: BarChart3, title: "Campaign Analytics", desc: "KPI dashboards per location, monthly performance reports, data-driven optimization" },
  { icon: Rocket, title: "Campaign Execution", desc: "Launch on schedule, A/B test everything, scale what works across all 6 gyms" },
  { icon: RefreshCw, title: "Continuous Optimization", desc: "Monthly refreshes, audience retargeting, seasonal pivots for maximum results" },
  { icon: MapPin, title: "Multi-Location Management", desc: "Consistent branding across all 6, localized messaging, unified reporting" },
  { icon: CalendarCheck, title: "Bi-Weekly Strategy Calls", desc: "Review performance, plan next pushes, align on goals and KPIs" },
];

export const Slide07PlatinumPro = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex h-full">
      <div className="w-[620px] flex flex-col justify-center px-[70px]">
        <RevealElement step={0} currentStep={step} direction="left">
          <p className="text-[20px] uppercase tracking-[6px] mb-[14px] font-semibold" style={{ color: "#3B9BFF" }}>Platinum PRO</p>
          <h2 className="text-[70px] font-black text-white leading-[0.92] tracking-[-3px] mb-[24px]">
            Your Dedicated<br />Marketing{" "}
            <motion.span
              className="bg-clip-text text-transparent inline-block"
              style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF)" }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >Expert</motion.span>
          </h2>
          <p className="text-[26px] text-gray-400 leading-relaxed">
            A <span className="text-white font-bold">full-time marketing professional</span> managing strategy, execution, and optimization across all 6 Epic locations.
          </p>
        </RevealElement>
      </div>

      <div className="flex-1 flex items-center pr-[60px]">
        <div className="w-full flex flex-col gap-[14px]">
          {services.map((s, i) => (
            <RevealElement key={i} step={i + 1} currentStep={step} direction="right">
              <GlassCard className="p-[30px] flex items-start gap-[18px]" glow>
                <motion.div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ background: "rgba(59,155,255,0.1)" }}
                  animate={step >= i + 1 ? { boxShadow: ["0 0 0px rgba(59,155,255,0)", "0 0 20px rgba(59,155,255,0.25)", "0 0 0px rgba(59,155,255,0)"] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <s.icon size={28} style={{ color: "#3B9BFF" }} />
                </motion.div>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-[4px]">{s.title}</h3>
                  <p className="text-[20px] text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </GlassCard>
            </RevealElement>
          ))}
        </div>
      </div>
    </div>
  </SlideLayout>
);
