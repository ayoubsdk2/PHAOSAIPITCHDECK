import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter } from "../RevealElement";
import { AlertTriangle, DollarSign, Database, Wrench, Users } from "lucide-react";

interface Props { step: number; }

const categories = [
  {
    icon: DollarSign,
    title: "Financial & Resource Constraints",
    items: [
      { h: "High Labor Costs:", b: "Excessive spending on manual dispatchers to handle repetitive data entry." },
      { h: "Missed Revenue:", b: "Inbound sales leads and lease renewal calls lost to voicemails or slow tracking." },
      { h: "Turnover & Retraining:", b: "High stress drives constant CSR churn, draining weeks on legacy ERP training." },
      { h: "Infrastructure Overhead:", b: "High IT costs managing legacy SIP trunks, physical phone trees, and local lines." },
      { h: "Scale Bottlenecks:", b: "Merging call centers and staff during acquisitions stalls growth for months." },
    ],
  },
  {
    icon: Database,
    title: "Data & Operational Friction",
    items: [
      { h: "ERP Dirty Data:", b: "Human entry errors (mistyped serial or equipment numbers) causing massive downstream chaos." },
      { h: "Delayed Billing Cycles:", b: "Customers failing to provide timely, accurate color vs. black-and-white meter counts." },
      { h: "Unbillable Tech Rolls:", b: "Dispatching expensive field techs for basic, user-correctable issues (e.g., bypass tray errors)." },
      { h: "Toner Leakage:", b: "Accidentally shipping profitable supplies to unauthorized or out-of-contract devices." },
      { h: "Warranty Slippage:", b: "Providing free parts and labor for expired, out-of-warranty hardware." },
    ],
  },
  {
    icon: Wrench,
    title: "Service & Workflow Bottlenecks",
    items: [
      { h: "SLA Breaches:", b: "Missed after-hours emergency calls resulting in heavy client penalties and churn." },
      { h: "Morning Hold Spikes:", b: "Extreme call spikes between 8-10 AM leading to high abandonment rates." },
      { h: "Status Call Inundation:", b: "Inbound lines choked by clients repeatedly asking \u201Cwhere is my tech?\u201D" },
      { h: "Poor Route Efficiency:", b: "Delays in logging calls into the ERP causing technicians to leave the service area prematurely." },
      { h: "Partner Disconnect:", b: "Data drops and slow hand-offs when routing calls to out-of-territory subcontractors." },
    ],
  },
  {
    icon: Users,
    title: "Customer & Sales Experience",
    items: [
      { h: "Frustrating IVRs:", b: "Customers dropping off due to rigid, outdated \u201Cpress 1 for service\u201D phone menus." },
      { h: "Database Fragmentation:", b: "Siloed customer data across multiple independent branches or acquired databases." },
      { h: "Blind Sales Outreach:", b: "Reps pitching upgrades while active, unlogged service crises are occurring." },
      { h: "Language Barriers:", b: "Inability to easily scale multilingual support for increasingly diverse workplaces." },
    ],
  },
];

export const Phaos03Bottleneck = ({ step }: Props) => (
  <SlideLayout variant="default">
    <div className="flex flex-col h-full px-[80px] py-[44px]">
      <div className="mb-[18px]">
        <p className="slide-kicker text-[18px]" style={{ color: PHAOS.glow, letterSpacing: "0.32em" }}>The Operational Bottleneck</p>
        <h1 className="text-[56px] font-black text-white mt-[6px] tracking-[-2px] leading-[1]">
          Painful{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${PHAOS.glow}, ${PHAOS.primary})` }}>
            Problem Areas
          </span>{" "}
          Needing To Be{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${PHAOS.glow}, ${PHAOS.primary})` }}>
            Solved
          </span>
        </h1>
      </div>

      {/* Top row: 3 boxes equal height */}
      <div className="grid grid-cols-[1.1fr_1fr_1.1fr] gap-[20px] h-[300px]">
        <RevealElement step={0} currentStep={step} direction="up">
          <GlassCard className="p-[28px] h-full flex flex-col justify-center">
            <p className="text-[13px] text-gray-400 mb-[10px] uppercase tracking-[0.3em]">The Daily Reality</p>
            <p className="text-[22px] text-gray-200 leading-[1.4]">
              Dealers handle <span className="text-white font-bold">thousands of calls weekly</span> for dispatch, remote meter reads, and toner fulfillment.
            </p>
            <p className="text-[18px] text-gray-400 leading-[1.45] mt-[14px]">
              Support teams act as <span style={{ color: PHAOS.glow }} className="font-semibold">manual data translators</span>, re-keying every call into legacy ERPs.
            </p>
          </GlassCard>
        </RevealElement>

        <RevealElement step={1} currentStep={step} direction="scale" delay={0.05}>
          <GlassCard glow className="p-[24px] h-full flex flex-col items-center justify-center" style={{ background: `linear-gradient(135deg, ${PHAOS.deep}22, ${PHAOS.ultra}11)` }}>
            <p className="text-[13px] text-gray-400 mb-[6px] uppercase tracking-[0.3em]">Per Branch / Month</p>
            <AnimatedCounter
              value="$6,250"
              isVisible={step >= 1}
              pulse
              className="text-[88px] font-black leading-none"
              style={{
                backgroundImage: `linear-gradient(180deg, #fff, ${PHAOS.gold} 80%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            />
            <p className="text-[16px] text-gray-300 mt-[12px] font-mono">1,000 calls × 15 min × $25/hr</p>
            <p className="text-[13px] text-gray-500 mt-[4px]">burdened administrative labor</p>
          </GlassCard>
        </RevealElement>

        <RevealElement step={2} currentStep={step} direction="right" delay={0.05}>
          <GlassCard glow className="p-[28px] h-full flex flex-col justify-center" style={{ borderLeft: `4px solid ${PHAOS.primary}` }}>
            <div className="flex items-center gap-[10px] mb-[14px]">
              <AlertTriangle size={20} color={PHAOS.gold} />
              <p className="text-[13px] font-bold uppercase tracking-[0.25em]" style={{ color: PHAOS.gold }}>1st Client Pain Point, Smart Office Automation</p>
            </div>
            <p className="text-[22px] text-gray-100 leading-[1.4]">
              <span className="text-white font-bold">4 individuals missed the 2026 company kickoff call</span> to answer phones at all 4 locations.
            </p>
            <p className="text-[16px] text-gray-400 leading-[1.5] mt-[14px]">
              Combined with missed calls throughout the day, the cost of staffing receptionists, and after-hours calls lost entirely,
              <span style={{ color: PHAOS.glow }} className="font-semibold"> the pain more than justified the need for Phaos.</span>
            </p>
          </GlassCard>
        </RevealElement>
      </div>

      {/* Bottom: 4 button-style category cards, taller and denser */}
      <div className="mt-[20px] flex-1 min-h-0 grid grid-cols-4 gap-[18px]">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const prevItems = categories.slice(0, i).reduce((sum, c) => sum + c.items.length, 0);
          const cardStep = 3 + i + prevItems;
          return (
            <RevealElement key={i} step={cardStep} currentStep={step} direction="left" delay={0.05} className="h-full">
              <GlassCard
                glow
                className="h-full p-[24px] flex flex-col rounded-[18px]"
                style={{
                  background: `linear-gradient(160deg, ${PHAOS.primary}1f 0%, rgba(255,255,255,0.02) 60%)`,
                  border: `1.5px solid ${PHAOS.primary}55`,
                  boxShadow: `0 12px 40px -16px ${PHAOS.primary}55, inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}
              >
                <div className="flex items-center gap-[12px] mb-[16px] pb-[14px]" style={{ borderBottom: `1px solid ${PHAOS.primary}55` }}>
                  <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0" style={{ background: `${PHAOS.primary}33`, border: `1px solid ${PHAOS.primary}66` }}>
                    <Icon size={22} color={PHAOS.glow} />
                  </div>
                  <h4 className="text-[17px] font-bold uppercase tracking-[0.1em] leading-[1.15]" style={{ color: PHAOS.glow }}>{cat.title}</h4>
                </div>
                <ul className="space-y-[18px] flex-1">
                  {cat.items.map((it, j) => (
                    <RevealElement key={j} step={cardStep + 1 + j} currentStep={step} direction="up" delay={0}>
                      <li className="text-[17px] text-gray-300 leading-[1.45] flex gap-[10px]">
                        <span style={{ color: PHAOS.gold }} className="shrink-0 font-bold text-[18px]">›</span>
                        <span><span className="text-white font-semibold">{it.h}</span> {it.b}</span>
                      </li>
                    </RevealElement>
                  ))}
                </ul>
              </GlassCard>
            </RevealElement>
          );
        })}
      </div>

    </div>
  </SlideLayout>
);
