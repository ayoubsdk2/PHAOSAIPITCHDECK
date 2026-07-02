import { SlideLayout } from "../SlideLayout";
import { RevealElement, AnimatedCounter, PulseGlow } from "../RevealElement";
import { Star, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import referrizerLogo from "@/assets/referrizer-logo.png";
import tcLogo from "@/assets/tc-logo.png";

const stats = [
  { icon: Star, value: "500+", label: "Five-Star Reviews", color: "#FBBF24" },
  { icon: Users, value: "1,000+", label: "Happy Clients", color: "#3B9BFF" },
  { icon: Award, value: "#1", label: "MINDBODY Loyalty Program", color: "#22c55e" },
];

export const Slide04Partners = ({ step }: { step: number }) => (
  <SlideLayout variant="glow">
    <div className="flex flex-col items-center justify-center h-full px-[80px] text-center">
      <RevealElement step={0} currentStep={step} direction="up">
        <p className="text-[20px] uppercase tracking-[6px] mb-[14px] font-semibold" style={{ color: "#3B9BFF" }}>Meet Your Partners</p>
        <h2 className="text-[82px] font-black text-white mb-[10px] leading-[0.92] tracking-[-3px]">The Team Behind<br />Your Growth</h2>
        <p className="text-[30px] text-gray-400 mb-[44px]">Two industry leaders, <span className="text-white font-bold">unified under one strategy</span>, powering all 6 locations.</p>
      </RevealElement>

      <RevealElement step={1} currentStep={step} direction="scale">
        <motion.div className="flex items-center justify-center gap-[40px] mb-[44px]">
          <div
            className="px-[60px] py-[36px] rounded-[20px] text-center flex flex-col items-center"
            style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
          >
            <img src={referrizerLogo} alt="Referrizer" className="h-[60px] object-contain mb-[14px]" />
            <p className="text-[20px] text-gray-700 font-medium mt-[6px]">Marketing Automation Platform</p>
          </div>
          <motion.div
            className="text-[70px] font-black"
            style={{ color: "#3B9BFF" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >+</motion.div>
          <div
            className="px-[60px] py-[36px] rounded-[20px] text-center flex flex-col items-center"
            style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
          >
            <img src={tcLogo} alt="True Conversions" className="h-[60px] object-contain mb-[14px]" />
            <p className="text-[20px] text-gray-700 font-medium mt-[6px]">Performance Ad Management</p>
          </div>
        </motion.div>
      </RevealElement>

      <div className="flex gap-[30px]">
        {stats.map((s, i) => (
          <RevealElement key={i} step={i + 2} currentStep={step} direction="flash">
            <div
              className="w-[380px] py-[40px] px-[40px] text-center rounded-[20px]"
              style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
            >
              <motion.div
                animate={step >= i + 2 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <s.icon size={46} style={{ color: s.color }} className="mx-auto mb-[16px]" />
              </motion.div>
              <AnimatedCounter value={s.value} isVisible={step >= i + 2} pulse className="text-[60px] font-black block mb-[4px] text-gray-900" />
              <p className="text-[22px] text-gray-600 font-medium">{s.label}</p>
            </div>
          </RevealElement>
        ))}
      </div>

      <RevealElement step={5} currentStep={step} direction="fade" delay={0.2}>
        <motion.p
          className="text-[24px] text-gray-500 mt-[40px] italic"
          animate={step >= 5 ? { opacity: [0.4, 0.8, 0.4] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          "Trusted by fitness studios, gyms, and multi-location brands nationwide."
        </motion.p>
      </RevealElement>
    </div>
  </SlideLayout>
);
