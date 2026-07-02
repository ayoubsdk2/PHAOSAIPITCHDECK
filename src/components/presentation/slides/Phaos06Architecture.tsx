import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { motion } from "framer-motion";
import { Phone, Waves, Database, Volume2, Shield } from "lucide-react";

interface Props { step: number; }

const nodes = [
  { icon: Phone,    label: "Telnyx",     sub: "Telephony Filter" },
  { icon: Waves,    label: "Deepgram",   sub: "Speech-to-Text" },
  { icon: Database, label: "Supabase",   sub: "Staging / Orchestration", primary: true },
  { icon: Volume2,  label: "Cartesia",   sub: "Edge Voice Synthesis" },
];

export const Phaos06Architecture = ({ step }: Props) => (
  <SlideLayout variant="glow">
    <div className="flex flex-col h-full px-[100px] py-[70px]">
      <div className="mb-[40px]">
        <p className="slide-kicker text-[22px]" style={{ color: PHAOS.glow, letterSpacing: "0.32em" }}>Production-Grade Technical Architecture</p>
        <h1 className="text-[64px] font-black text-white mt-[10px] tracking-[-2px] leading-[1.04]">
          Millisecond Latency with{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${PHAOS.glow}, ${PHAOS.primary})` }}>
            High-Availability Staging
          </span>
        </h1>
      </div>

      {/* Pipeline */}
      <RevealElement step={0} currentStep={step} direction="up">
        <div className="flex items-center justify-between gap-[16px] mb-[40px]">
          {nodes.map((n, i) => {
            const Icon = n.icon;
            return (
              <div key={i} className="flex items-center flex-1">
                <motion.div
                  className="flex flex-col items-center text-center flex-1"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                >
                  <div
                    className="w-[110px] h-[110px] rounded-[26px] flex items-center justify-center mb-[12px]"
                    style={{
                      background: n.primary
                        ? `linear-gradient(135deg, ${PHAOS.deep}, ${PHAOS.ultra})`
                        : "rgba(155,92,246,0.10)",
                      border: `1px solid ${PHAOS.primary}${n.primary ? "" : "55"}`,
                      boxShadow: n.primary ? `0 0 50px ${PHAOS.primary}88` : `0 0 20px ${PHAOS.primary}33`,
                    }}
                  >
                    <Icon size={44} color={n.primary ? "#fff" : PHAOS.glow} />
                  </div>
                  <p className="text-[24px] font-bold text-white">{n.label}</p>
                  <p className="text-[16px] text-gray-400">{n.sub}</p>
                </motion.div>
                {i < nodes.length - 1 && (
                  <motion.div
                    className="h-[2px] flex-1 mx-[6px]"
                    style={{ background: `linear-gradient(90deg, ${PHAOS.primary}aa, ${PHAOS.glow}aa)` }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </RevealElement>

      <div className="grid grid-cols-3 gap-[24px] flex-1">
        <RevealElement step={1} currentStep={step} direction="up">
          <GlassCard glow className="p-[26px] h-full flex flex-col items-center justify-center text-center">
            <p className="text-[22px] text-gray-400 uppercase tracking-[0.2em] mb-[6px]">Response Latency</p>
            <p className="text-[100px] font-black leading-none bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(180deg, #fff, ${PHAOS.glow})` }}>
              &lt;1s
            </p>
            <p className="text-[18px] text-gray-500 mt-[8px]">Sub-second audio round-trip</p>
          </GlassCard>
        </RevealElement>

        <RevealElement step={2} currentStep={step} direction="up" delay={0.05}>
          <GlassCard glow className="p-[26px] h-full flex flex-col">
            <div className="flex items-center gap-[10px] mb-[10px]">
              <Database size={22} color={PHAOS.glow} />
              <h4 className="text-[22px] font-bold text-white">Isolated Staging Layer</h4>
            </div>
            <p className="text-[18px] text-gray-300 leading-[1.45]">
              Supabase acts as an isolated staging layer, preventing database locks and ensuring
              <span className="text-white font-semibold"> transactional integrity</span> across legacy ERPs.
            </p>
          </GlassCard>
        </RevealElement>

        <RevealElement step={3} currentStep={step} direction="up" delay={0.1}>
          <GlassCard glow className="p-[26px] h-full flex flex-col">
            <div className="flex items-center gap-[10px] mb-[10px]">
              <Shield size={22} color={PHAOS.gold} />
              <h4 className="text-[22px] font-bold text-white">Redundant Failover</h4>
            </div>
            <p className="text-[18px] text-gray-300 leading-[1.45]">
              <span className="text-white font-semibold">Multiple fail-safes</span> across every node, if a vendor experiences technical friction,
              traffic is rerouted without dropping a call.
            </p>
          </GlassCard>
        </RevealElement>
      </div>
    </div>
  </SlideLayout>
);
