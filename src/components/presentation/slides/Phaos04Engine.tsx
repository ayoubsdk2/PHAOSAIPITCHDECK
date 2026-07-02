import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { motion } from "framer-motion";
import { Mic, Cpu, Database, ShieldCheck, ArrowRight } from "lucide-react";
import phoebe from "@/assets/phaos-soa-phoebe.png";

interface Props { step: number; }

const steps = [
  {
    icon: Mic,
    title: "Intelligent Capture",
    body: "Sub-second agents parse industry-specific jargon, error codes, machine serials, meter reads, in real time.",
  },
  {
    icon: Cpu,
    title: "Agentic Execution",
    body: "The agent triggers multi-step backend workflows: logging calls, querying databases, creating service tickets.",
  },
  {
    icon: Database,
    title: "Autonomous Sync",
    body: "Bi-directional data mutation instantly, the ERP becomes the single source of truth without human intervention.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data Referencing",
    body: "The CRM database is cloned (read-only) for near-instantaneous data pings, eliminating lag and delivering a world-class integrated experience with zero risk of leakage or compromise.",
  },
];

export const Phaos04Engine = ({ step }: Props) => (
  <SlideLayout variant="glow">
    <div className="flex flex-col h-full px-[100px] py-[70px]">
      <div className="mb-[30px]">
        <p className="slide-kicker text-[22px]" style={{ color: PHAOS.glow, letterSpacing: "0.32em" }}>The Phaos AI Workflow Engine</p>
        <h1 className="text-[72px] font-black text-white mt-[10px] tracking-[-2.5px] leading-[1.02]">
          Agentic Orchestration:{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${PHAOS.glow}, ${PHAOS.primary})` }}>
            Call → Resolution
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-[420px_1fr] gap-[40px] flex-1 items-center">
        {/* Phoebe demo card */}
        <RevealElement step={0} currentStep={step} direction="left">
          <img
            src={phoebe}
            alt="Phoebe, Phaos AI SOA"
            className="w-full rounded-[24px]"
            style={{
              boxShadow: `0 0 80px ${PHAOS.primary}44, 0 0 0 1px ${PHAOS.primary}33`,
              border: `1px solid ${PHAOS.primary}33`,
            }}
          />
        </RevealElement>

        {/* Flow */}
        <div className="flex flex-col gap-[14px]">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealElement key={i} step={1 + i} currentStep={step} direction="right" delay={0.05}>
                <div className="flex items-center gap-[20px]">
                  <GlassCard glow className="flex-1 p-[18px] flex items-center gap-[18px]">
                    <div
                      className="w-[54px] h-[54px] rounded-[14px] shrink-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${PHAOS.deep}, ${PHAOS.ultra})`, boxShadow: `0 0 30px ${PHAOS.primary}55` }}
                    >
                      <Icon size={26} color="#fff" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-[12px]">
                        <span className="text-[16px] font-mono" style={{ color: PHAOS.glow }}>0{i + 1}</span>
                        <h3 className="text-[24px] font-bold text-white">{s.title}</h3>
                      </div>
                      <p className="text-[17px] text-gray-300 leading-[1.35] mt-[2px]">{s.body}</p>
                    </div>
                  </GlassCard>
                </div>
              </RevealElement>
            );
          })}
        </div>
      </div>

      <RevealElement step={5} currentStep={step} direction="scale" delay={0.05}>
        <div className="flex justify-center mt-[28px]">
          <motion.a
            href="https://voice.phaosai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-[48px] py-[20px] rounded-[18px] text-[44px] font-black tracking-[0.04em] text-white"
            style={{
              background: `linear-gradient(135deg, ${PHAOS.deep}, ${PHAOS.ultra})`,
              border: `2px solid ${PHAOS.glow}`,
              boxShadow: `0 0 60px ${PHAOS.primary}88, 0 0 0 1px ${PHAOS.primary}55`,
            }}
            animate={{ scale: [1, 1.04, 1], boxShadow: [`0 0 40px ${PHAOS.primary}66`, `0 0 80px ${PHAOS.primary}aa`, `0 0 40px ${PHAOS.primary}66`] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.08 }}
          >
            CLICK TO TRY NOW!
          </motion.a>
        </div>
      </RevealElement>
    </div>
  </SlideLayout>
);
