import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter } from "../RevealElement";
import {
  CheckCircle2,
  Mic,
  Building2,
  TrendingUp,
  Calendar,
  DollarSign,
  Zap,
  Users2,
  ArrowRight,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

interface Props { step: number; }

const proofPoints = [
  {
    icon: Mic,
    title: "Live Voice Agent",
    body: "Fully functional voice agent live at voice.phaosai.com — calls handled end-to-end without human intervention.",
    badge: "LIVE",
    badgeColor: "#22c55e",
  },
  {
    icon: Building2,
    title: "First Paying Client",
    body: "Smart Office Automation (4-location dealer) signed — Phaos actively deployed, billing, and resolving inbound dispatch calls.",
    badge: "CONTRACTED",
    badgeColor: PHAOS.glow,
  },
  {
    icon: TrendingUp,
    title: "ERP Integrations Built",
    body: "Native read/write integrations with e-automate, SalesChain, and Printanista architected, tested, and production-ready.",
    badge: "BUILT",
    badgeColor: PHAOS.gold,
  },
];

const milestones = [
  { icon: Calendar,   month: "Month 1–3",   label: "5 Pilot Dealers",          sub: "Onboarded & billing",    color: PHAOS.glow },
  { icon: Users2,     month: "Month 4–6",   label: "25 Active Clients",         sub: "Full ERP integration",   color: PHAOS.glow },
  { icon: TrendingUp, month: "Month 7–9",   label: "50 Clients + Partners",     sub: "Advisor units deployed", color: PHAOS.gold },
  { icon: Star,       month: "Month 10–12", label: "100 Clients · $1.5M ARR",   sub: "Seed A runway unlocked", color: PHAOS.goldGlow },
];

const terms = [
  { label: "Instrument",    value: "SAFE Note"     },
  { label: "Raise Amount",  value: "$250,000"       },
  { label: "Valuation Cap", value: "TBD"            },
  { label: "Advisor Units", value: "Up to 5 × $50K" },
];

export const Phaos12Ask = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="flex flex-col h-full px-[28px] pt-[22px] pb-[10px]">

      {/* HEADER */}
      <RevealElement step={0} currentStep={step} direction="fade">
        <div className="mb-[18px]">
          <p className="text-[20px] uppercase font-semibold leading-none" style={{ color: PHAOS.glow, letterSpacing: "0.42em" }}>
            Traction &amp; The Ask
          </p>
          <h1 className="text-[62px] font-black text-white leading-[0.98] tracking-[-1px] mt-[14px]">
            Proven. Deployed.{" "}
            <span style={{ color: PHAOS.glow }}>Ready to Scale.</span>
          </h1>
        </div>
      </RevealElement>

      {/* MAIN BODY */}
      <div className="flex-1 min-h-0 grid grid-cols-[1.25fr_1fr] gap-[16px]">

        {/* LEFT: Proof points + Milestone timeline */}
        <div className="flex flex-col gap-[12px] h-full min-h-0">
          <div className="flex flex-col gap-[10px]">
            {proofPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealElement key={p.title} step={1 + i} currentStep={step} direction="left" delay={0.04}>
                  <GlassCard
                    glow
                    className="px-[20px] py-[16px] flex items-center gap-[18px] rounded-[14px]"
                    style={{ background: `${PHAOS.glow}0d`, border: `1px solid ${PHAOS.primary}55` }}
                  >
                    <div
                      className="w-[52px] h-[52px] rounded-[13px] flex items-center justify-center shrink-0"
                      style={{ background: `${PHAOS.glow}20`, border: `1px solid ${PHAOS.glow}55` }}
                    >
                      <Icon size={26} color={PHAOS.glow} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-[10px] mb-[4px]">
                        <h3 className="text-[22px] font-black text-white leading-tight">{p.title}</h3>
                        <span
                          className="px-[9px] py-[3px] rounded-full text-[11px] font-black tracking-[0.15em] uppercase"
                          style={{ background: `${p.badgeColor}22`, border: `1px solid ${p.badgeColor}77`, color: p.badgeColor }}
                        >
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[16px] text-gray-300 leading-[1.3]">{p.body}</p>
                    </div>
                    <CheckCircle2 size={22} color={p.badgeColor} className="shrink-0" />
                  </GlassCard>
                </RevealElement>
              );
            })}
          </div>

          {/* 12-Month Milestone Timeline */}
          <RevealElement step={4} currentStep={step} direction="up" delay={0.04} className="flex-1 min-h-0">
            <GlassCard
              glow
              className="h-full px-[20px] py-[16px] rounded-[14px] flex flex-col"
              style={{ background: `linear-gradient(120deg, ${PHAOS.gold}18, ${PHAOS.deep}14 74%)`, border: `1px solid ${PHAOS.gold}55` }}
            >
              <p className="text-[13px] uppercase tracking-[0.28em] font-black mb-[14px]" style={{ color: PHAOS.goldGlow }}>
                12-Month Deployment Runway
              </p>
              <div className="flex-1 min-h-0 grid grid-cols-4 gap-[8px] items-stretch">
                {milestones.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <RevealElement key={m.month} step={5 + i} currentStep={step} direction="up" delay={0.04 * i} className="h-full">
                      <div
                        className="h-full rounded-[10px] px-[14px] py-[14px] flex flex-col items-center text-center justify-center"
                        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${m.color}44` }}
                      >
                        <div
                          className="w-[36px] h-[36px] rounded-[9px] flex items-center justify-center mb-[8px]"
                          style={{ background: `${m.color}22`, border: `1px solid ${m.color}55` }}
                        >
                          <Icon size={18} color={m.color} />
                        </div>
                        <p className="text-[11px] uppercase tracking-[0.14em] font-bold mb-[4px]" style={{ color: m.color }}>{m.month}</p>
                        <p className="text-[16px] font-black text-white leading-tight">{m.label}</p>
                        <p className="text-[12px] text-gray-400 mt-[3px] leading-tight">{m.sub}</p>
                      </div>
                    </RevealElement>
                  );
                })}
              </div>
            </GlassCard>
          </RevealElement>
        </div>

        {/* RIGHT: Investment terms + Why Now + CTA */}
        <div className="flex flex-col gap-[12px] h-full min-h-0">
          <RevealElement step={9} currentStep={step} direction="right" delay={0.04} className="flex-1 min-h-0">
            <GlassCard
              glow
              className="h-full px-[26px] py-[24px] flex flex-col rounded-[14px]"
              style={{
                background: `linear-gradient(140deg, ${PHAOS.deep}30, ${PHAOS.primary}18 60%, ${PHAOS.glow}0d)`,
                border: `1.5px solid ${PHAOS.glow}77`,
                boxShadow: `0 0 60px ${PHAOS.primary}22`,
              }}
            >
              <div className="flex items-center gap-[12px] mb-[20px] pb-[16px]" style={{ borderBottom: `1px solid ${PHAOS.primary}44` }}>
                <div
                  className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background: `${PHAOS.glow}22`, border: `1px solid ${PHAOS.glow}66` }}
                >
                  <DollarSign size={24} color={PHAOS.glow} />
                </div>
                <p className="text-[16px] uppercase font-black tracking-[0.3em]" style={{ color: PHAOS.glow }}>
                  Investment Terms
                </p>
              </div>

              <div className="grid grid-cols-2 gap-[10px] mb-[20px]">
                {terms.map((t, i) => (
                  <RevealElement key={t.label} step={10 + i} currentStep={step} direction="scale" delay={0.04}>
                    <div
                      className="rounded-[10px] px-[16px] py-[14px] text-center"
                      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PHAOS.primary}33` }}
                    >
                      <p className="text-[12px] uppercase tracking-[0.18em] text-gray-400 leading-none mb-[6px]">{t.label}</p>
                      <p className="text-[24px] font-black text-white leading-tight">{t.value}</p>
                    </div>
                  </RevealElement>
                ))}
              </div>

              {/* Why Now */}
              <RevealElement step={14} currentStep={step} direction="up" delay={0.04}>
                <div
                  className="rounded-[12px] px-[18px] py-[16px] mb-[16px]"
                  style={{ background: `${PHAOS.gold}12`, border: `1px solid ${PHAOS.gold}55` }}
                >
                  <div className="flex items-center gap-[8px] mb-[8px]">
                    <Zap size={16} color={PHAOS.goldGlow} />
                    <p className="text-[12px] uppercase tracking-[0.22em] font-black" style={{ color: PHAOS.goldGlow }}>Why Now</p>
                  </div>
                  <p className="text-[16px] text-gray-200 leading-[1.35]">
                    Zero validated competitors. Integration moat fully built. First client live. The window to own this vertical is
                    <span className="text-white font-bold"> open today</span> — but not indefinitely.
                  </p>
                </div>
              </RevealElement>

              {/* ARR Unlock */}
              <RevealElement step={15} currentStep={step} direction="scale" delay={0.05}>
                <div
                  className="rounded-[12px] px-[18px] py-[16px] flex items-center gap-[16px]"
                  style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.45)" }}
                >
                  <AnimatedCounter
                    value="$1.5M"
                    isVisible={step >= 15}
                    pulse
                    className="text-[52px] font-black leading-none shrink-0"
                    style={{ color: "#22c55e", textShadow: "0 0 22px rgba(34,197,94,0.6)" }}
                  />
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.18em] font-bold" style={{ color: "#22c55e" }}>ARR Unlocked</p>
                    <p className="text-[15px] text-gray-300 leading-[1.3] mt-[3px]">
                      $250K SAFE fully deployed → 100 integrated dealers → Seed A readiness
                    </p>
                  </div>
                </div>
              </RevealElement>
            </GlassCard>
          </RevealElement>

          {/* CTA */}
          <RevealElement step={16} currentStep={step} direction="up" delay={0.06}>
            <motion.a
              href="https://pitch-deck.phaosai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-[14px] w-full rounded-[16px] py-[22px] text-[26px] font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${PHAOS.deep} 0%, ${PHAOS.ultra} 50%, ${PHAOS.glow} 100%)`,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 40px ${PHAOS.primary}77, 0 0 80px ${PHAOS.glow}33`,
                letterSpacing: "0.04em",
              }}
              animate={{
                boxShadow: [
                  `0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 30px ${PHAOS.primary}66, 0 0 50px ${PHAOS.glow}22`,
                  `0 0 0 1px rgba(255,255,255,0.16) inset, 0 8px 60px ${PHAOS.primary}99, 0 0 100px ${PHAOS.glow}44`,
                  `0 0 0 1px rgba(255,255,255,0.12) inset, 0 8px 30px ${PHAOS.primary}66, 0 0 50px ${PHAOS.glow}22`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Invest in Phaos AI
              <ArrowRight size={26} />
            </motion.a>
          </RevealElement>
        </div>
      </div>
    </div>
  </SlideLayout>
);
