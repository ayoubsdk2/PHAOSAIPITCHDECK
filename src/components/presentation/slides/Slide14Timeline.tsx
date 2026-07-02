import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement, PulseGlow } from "../RevealElement";
import { motion } from "framer-motion";

const steps = [
  { week: "Week 1", title: "Kick-Off & Onboarding", desc: "Account setup, brand assets collection, strategy alignment across all 6 locations.", color: "#3B9BFF" },
  { week: "Week 2", title: "Campaign Build & Launch", desc: "Ad creatives, landing pages, lead funnels, and Referrizer campaigns go live.", color: "#2D8BEF" },
  { week: "Week 4", title: "First Results Review", desc: "Performance check-in — analyze initial data, optimize targeting and messaging.", color: "#1F7BDF" },
  { week: "Week 6+", title: "Ongoing Optimization", desc: "Bi-weekly strategy calls, monthly refreshes, continuous improvement.", color: "#116BCF" },
];

export const Slide14Timeline = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex flex-col h-full px-[80px] py-[50px]">
      <RevealElement step={0} currentStep={step} direction="left">
        <p className="text-[20px] uppercase tracking-[6px] mb-[12px] font-semibold" style={{ color: "#3B9BFF" }}>
          Timeline
        </p>
        <h2 className="text-[76px] font-black text-white leading-[0.92] tracking-[-3px] mb-[8px]">
          What to{" "}
          <motion.span
            className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: "linear-gradient(135deg, #3B9BFF, #60B5FF)" }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >Expect</motion.span>
        </h2>
        <p className="text-[28px] text-gray-500 mb-[20px]">
          From signing to results — <span className="text-white font-bold">we move fast</span> so you see impact quickly.
        </p>
      </RevealElement>

      {/* Center the 4-week section vertically in remaining space */}
      <div className="flex items-center flex-1">
        <div className="flex items-start gap-[20px] w-full relative">
          {/* Timeline connector line */}
          <div className="absolute top-[55px] left-[120px] right-[120px] h-[5px] rounded-full overflow-hidden"
            style={{ background: "rgba(59,155,255,0.1)" }}>
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, #3B9BFF, #116BCF)" }}
              initial={{ width: "0%" }}
              animate={step >= 1 ? { width: `${Math.min((step - 1) / 3 * 100, 100)}%` } : { width: "0%" }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {steps.map((s, i) => (
            <RevealElement key={i} step={i + 1} currentStep={step} direction="up" className="flex-1 flex flex-col items-center text-center relative z-10">
              <PulseGlow color={s.color} intensity="medium">
                <motion.div
                  className="w-[110px] h-[110px] rounded-full flex items-center justify-center mb-[28px] text-[26px] font-black text-white"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)` }}
                  animate={step >= i + 1 ? { boxShadow: [`0 0 20px ${s.color}33`, `0 0 60px ${s.color}55`, `0 0 20px ${s.color}33`] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {s.week.split(" ")[1]}
                </motion.div>
              </PulseGlow>
              <motion.p
                className="text-[20px] uppercase tracking-[3px] mb-[12px] font-bold"
                style={{ color: s.color }}
                animate={step >= i + 1 ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >{s.week}</motion.p>
              <h3 className="text-[28px] font-black text-white mb-[14px]">{s.title}</h3>
              <p className="text-[22px] text-gray-400 leading-relaxed max-w-[380px]">{s.desc}</p>
            </RevealElement>
          ))}
        </div>
      </div>

      <RevealElement step={5} currentStep={step} direction="slam" className="mt-[10px]">
        <motion.div
          className="text-center py-[20px] px-[40px] rounded-[16px]"
          style={{ background: "rgba(59,155,255,0.06)", border: "2px solid rgba(59,155,255,0.2)" }}
          animate={{ boxShadow: ["0 0 20px rgba(59,155,255,0.08)", "0 0 60px rgba(59,155,255,0.2)", "0 0 20px rgba(59,155,255,0.08)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-[28px] font-black" style={{ color: "#3B9BFF" }}>
            From signing to results in under 30 days. Let's move.
          </p>
        </motion.div>
      </RevealElement>
    </div>
  </SlideLayout>
);
