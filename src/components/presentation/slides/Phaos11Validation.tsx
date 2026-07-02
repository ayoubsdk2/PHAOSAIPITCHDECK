import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter } from "../RevealElement";
import { Users, Server, Megaphone, ShieldCheck, Target, TrendingUp, Coins, Crosshair, LineChart } from "lucide-react";

interface Props { step: number; }

const allocations = [
  {
    icon: Users,
    pct: "50%",
    amount: "$125,000",
    title: "Salaries & Compensation",
    bullets: [
      { h: "Founder Stipend ($84K):", b: "$7K/mo lean allocation for 100% dedicated executive focus." },
      { h: "Team Compensation ($16K):", b: "Project-based pay driving architected product and revenue milestones." },
      { h: "RevOps Stack ($7K):", b: "Pipedrive, Apollo.io, Instantly.ai, Loom, and LinkedIn Sales Navigator." },
      { h: "Global SDRs ($18K):", b: "Performance-based international talent scaling top-of-funnel pipeline volume." },
      { h: "Zero-Base Closers:", b: "Commission-only sales team ensuring strictly variable acquisition costs." },
    ],
  },
  {
    icon: Server,
    pct: "25%",
    amount: "$62,500",
    title: "Infrastructure & Technology",
    bullets: [
      { h: "Voice Infrastructure ($16.5K):", b: "High-concurrency Telnyx call routing, LLM tokens, and real-time TTS/STT." },
      { h: "Legacy ERP Integrations ($15.0K):", b: "Dedicated staging layers and secure write paths for eAutomate, Printanista, and Sales Chain." },
      { h: "Pilot Customer Subsidies ($21.0K):", b: "Fully absorbing integration API costs for the first 10 enterprise case studies." },
      { h: "Multi-Model Redundancy ($10.0K):", b: "Automatic LLM failover systems ensuring zero downtime for live voice agents." },
    ],
  },
  {
    icon: Megaphone,
    pct: "15%",
    amount: "$37,500",
    title: "Marketing & Acquisition",
    bullets: [
      { h: "Data & Outbound ($7.5K):", b: "Targeted Apollo lists built into an automated Instantly.ai email infrastructure." },
      { h: "Direct Mail Hook ($9K):", b: "Premium trojan horse mailers forcing 200-250 high-value targets to live voice-agent phone demos." },
      { h: "ABM Paid Social ($7.5K):", b: "Hyper-targeted LinkedIn ads served exclusively to a matched list of 1,500 - 2,000 dealer principals." },
      { h: "High-Impact Collateral ($6K):", b: "Deep-dive case studies and calculators proving direct operational ROI to prospects." },
      { h: "High Touch Conferences ($7.5K):", b: "In-person networking + VIP dinners at BTA Ignite, ECS, and PRINTING United." },
    ],
  },
  {
    icon: ShieldCheck,
    pct: "10%",
    amount: "$25,000",
    title: "Legal, Compliance & Ops",
    bullets: [
      { h: "Multi-Patent IP Filings ($19.0K):", b: "Securing proprietary rights for core AI voice workflows and strategic integrations." },
      { h: "FinTech & Ops Stack ($3.5K):", b: "Automated financial architecture leveraging Mercury, Stripe, and operational AI tools." },
      { h: "Data Privacy Compliance ($1.5K):", b: "Basic data privacy policy frameworks to clear early client software reviews." },
      { h: "Corporate Maintenance ($1.0K):", b: "Annual Florida C-Corporation state filing fees, taxes, and legal governance." },
    ],
  },
];

const deRisk = [
  {
    icon: Coins,
    title: "Capital Leverage",
    metric: "51x",
    label: "Projected ROAS",
    body: "With a $375 Programmatic CAC and a $19,200 target ACV, our highly orchestrated acquisition infrastructure is engineered to generate a 51x Return on Ad Spend per active dealership.",
  },
  {
    icon: Crosshair,
    title: "Acquisition Efficiency",
    metric: "<$375",
    label: "Programmatic CAC",
    body: "Every dollar of the $37,500 Marketing allocation is strictly architected for targeted account acquisition, maintaining a maximum $375 Programmatic CAC (lead-to-contract) per integrated location.",
  },
  {
    icon: LineChart,
    title: "Next Funding Phase",
    metric: "Month 12",
    label: "Seed A Path",
    body: "Preparation for Seed A investment with a clear path to $3M, $5M, $10M+ ARR scaling.",
  },
];

// Step mapping — sequential per allocation card (frame, then its bullets), then de-risk, then source
// 0: title
// 1-4: milestone cells (4)
// then for each allocation card: 1 frame step + N bullet steps
// then de-risk (3), then source
const MILESTONE_BASE = 1;
const ALLOC_BASE = MILESTONE_BASE + 4; // 5

// Per-card frame and bullet steps
const allocFrameStep: number[] = [];
const allocBulletStart: number[] = [];
{
  let acc = ALLOC_BASE;
  for (const a of allocations) {
    allocFrameStep.push(acc);          // frame reveals card + title
    allocBulletStart.push(acc + 1);    // bullets start after frame
    acc += 1 + a.bullets.length;
  }
}
const DERISK_BASE = ALLOC_BASE + allocations.reduce((n, a) => n + 1 + a.bullets.length, 0); // 5 + 4*1 + 18 = 27
const SOURCE_STEP = DERISK_BASE + deRisk.length; // 30

export const Phaos11Validation = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="relative h-full w-full overflow-hidden">
      {/* HEADER */}
      <RevealElement step={0} currentStep={step} direction="fade">
        <div className="absolute left-[18px] top-[16px]">
          <p className="text-[20px] uppercase font-semibold leading-none" style={{ color: PHAOS.glow, letterSpacing: "0.42em" }}>
            Capital Allocation & Milestones
          </p>
          <h1 className="text-[70px] font-black text-white leading-[0.98] mt-[20px]">
            $250K SAFE to <span style={{ color: PHAOS.glow }}>$1.5M ARR</span>
          </h1>
        </div>
      </RevealElement>

      {/* MILESTONE ROW */}
      <GlassCard
        glow
        className="absolute left-[18px] top-[137px] w-[1884px] h-[166px] p-[18px] rounded-[18px]"
        style={{
          background: `linear-gradient(120deg, ${PHAOS.gold}22, ${PHAOS.deep}18 72%)`,
          border: `1px solid ${PHAOS.gold}66`,
        }}
      >
        <div className="grid grid-cols-[244px_repeat(4,minmax(0,1fr))] items-stretch gap-[18px] h-full">
          <div className="flex items-center gap-[14px] h-full pr-[18px]" style={{ borderRight: `1px solid ${PHAOS.gold}44` }}>
            <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center shrink-0" style={{ background: `${PHAOS.gold}22`, border: `1px solid ${PHAOS.gold}77` }}>
              <Target size={28} color={PHAOS.goldGlow} />
            </div>
            <div>
              <p className="text-[18px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Primary</p>
              <p className="text-[18px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Milestone</p>
            </div>
          </div>

          {[
            { label: "Total Raise", value: "$250K", sub: "Pre-Seed SAFE", animate: false },
            { label: "Strategic Partnerships", value: "Up to 5", sub: "Advisor Units ($50K Min)", animate: true },
            { label: "Paying Customers", value: "100", sub: "Active, Integrated, Billing", animate: true },
            { label: "Resulting ARR Run-Rate", value: "$1.5M", sub: "Locked, Recurring, Defensible", animate: true },
          ].map((m, i) => {
            const myStep = MILESTONE_BASE + i;
            return (
              <RevealElement key={m.label} step={myStep} currentStep={step} direction="scale" delay={0.03} className="h-full">
                <div className="h-full text-center rounded-[10px] px-[10px] py-[10px] flex flex-col items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PHAOS.primary}33` }}>
                  <p className="text-[13px] uppercase tracking-[0.18em] text-gray-400 leading-none">{m.label}</p>
                  {m.animate ? (
                    <AnimatedCounter value={m.value} isVisible={step >= myStep} pulse className="block text-[46px] font-black text-white leading-none mt-[12px]" />
                  ) : (
                    <p className="text-[46px] font-black text-white leading-none mt-[12px]">{m.value}</p>
                  )}
                  <p className="text-[15px] text-gray-400 mt-[10px] leading-none">{m.sub}</p>
                </div>
              </RevealElement>
            );
          })}
        </div>
      </GlassCard>

      {/* ALLOCATIONS — cards reveal one at a time, then bullets one at a time within each */}
      <div className="absolute left-[18px] top-[313px] w-[1884px] h-[357px] grid grid-cols-4 gap-[10px]">
        {allocations.map((a, i) => {
          const Icon = a.icon;
          const accent = PHAOS.glow;
          const frameStep = allocFrameStep[i];
          const bulletStart = allocBulletStart[i];
          return (
            <RevealElement key={a.title} step={frameStep} currentStep={step} direction="up" delay={0.03} className="h-full">
              <GlassCard
                glow
                className="h-full px-[20px] py-[20px] flex flex-col overflow-hidden rounded-[14px]"
                style={{ background: `${PHAOS.glow}12`, border: `1px solid ${PHAOS.primary}55` }}
              >
                <div className="flex items-center gap-[12px] mb-[14px] pb-[14px]" style={{ borderBottom: `1px solid ${PHAOS.primary}55` }}>
                  <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}>
                    <Icon size={22} color={accent} />
                  </div>
                  <p className="text-[46px] font-black leading-none ml-auto" style={{ color: accent }}>{a.pct}</p>
                </div>
                <p className="text-[34px] font-black text-white leading-none mb-[6px]">{a.amount}</p>
                <h3 className="text-[19px] font-black leading-[1.05] mb-[13px]" style={{ color: accent }}>{a.title}</h3>
                <ul className="grid gap-[5px] flex-1 content-start">
                  {a.bullets.map((bl, bi) => {
                    const bStep = bulletStart + bi;
                    return (
                      <RevealElement key={bl.h} step={bStep} currentStep={step} direction="fade" delay={0}>
                        <li className="text-[12px] text-gray-300 leading-[1.18] flex gap-[6px]">
                          <span style={{ color: PHAOS.gold }} className="shrink-0 font-black">›</span>
                          <span><span className="text-white font-bold">{bl.h}</span> {bl.b}</span>
                        </li>
                      </RevealElement>
                    );
                  })}
                </ul>
              </GlassCard>
            </RevealElement>
          );
        })}
      </div>

      {/* DE-RISK */}
      <div className="absolute left-[18px] top-[681px] w-[1884px] h-[295px] grid grid-cols-3 gap-[10px]">
        {deRisk.map((item, i) => {
          const Icon = item.icon;
          return (
            <RevealElement key={item.title} step={DERISK_BASE + i} currentStep={step} direction="up" delay={0.03} className="h-full">
              <div className="h-full rounded-[9px] px-[24px] py-[22px] flex flex-col overflow-hidden" style={{ background: `${PHAOS.glow}12`, border: `1px solid ${PHAOS.primary}55` }}>
                <div className="flex items-center gap-[14px] mb-[20px]">
                  <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${PHAOS.primary}22`, border: `1px solid ${PHAOS.primary}55` }}>
                    <Icon size={22} color={PHAOS.glow} />
                  </div>
                  <h3 className="text-[28px] font-black text-white leading-[1.05]">{item.title}</h3>
                </div>
                <div className="flex items-end gap-[14px] mb-[14px] pb-[14px]" style={{ borderBottom: `1px solid ${PHAOS.primary}44` }}>
                  <p className="text-[58px] font-black leading-none" style={{ color: PHAOS.glow }}>{item.metric}</p>
                  <p className="text-[16px] uppercase tracking-[0.16em] leading-[1.15] mb-[8px]" style={{ color: PHAOS.goldGlow }}>{item.label}</p>
                </div>
                <p className="text-[20px] text-gray-200 leading-[1.23] flex-1">{item.body}</p>
              </div>
            </RevealElement>
          );
        })}
      </div>

      {/* SOURCE */}
      <RevealElement step={SOURCE_STEP} currentStep={step} direction="fade">
        <p className="absolute left-[18px] top-[990px] text-[12px] text-gray-500 leading-tight flex items-center gap-[7px]">
          <TrendingUp size={12} className="inline" style={{ color: PHAOS.glow }} /> Full capital deployment secures the first 100 paying customers, driving Phaos AI to a $1.5M ARR run-rate and unlocking the Seed round.
        </p>
      </RevealElement>
    </div>
  </SlideLayout>
);
