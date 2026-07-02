import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter } from "../RevealElement";
import { Globe, Flag, Crosshair, TrendingDown, Link2, ShieldCheck } from "lucide-react";

interface Props { step: number; }

const tiers = [
  {
    icon: Globe,
    tag: "TAM",
    subtitle: "Total Addressable Market",
    scope: "Global Print & Document Fleet",
    locations: "212,000+",
    locLabel: "Global Sites",
    arr: "$2.15B",
    arrLabel: "ARR Potential",
    body: "Independent dealers, OEM regional hubs, and commercial print facilities worldwide modeled at baseline Phaos pricing.",
    bullets: [
      { h: "Global Footprint:", b: "Every dealer, OEM hub, and B2B printer worldwide." },
      { h: "Conservative Base:", b: "Modeled at entry tier pricing, not premium adoption." },
      { h: "Macro Anchor:", b: "Market caps checked against MPS and commercial print realities." },
    ],
  },
  {
    icon: Flag,
    tag: "SAM",
    subtitle: "Serviceable Addressable Market",
    scope: "United States Print Market",
    locations: "27,500",
    locLabel: "US Locations",
    arr: "$288M",
    arrLabel: "Serviceable ARR",
    body: "US dealerships, OEM branches, and commercial print operators reachable today through native ERP and PSA integrations.",
    bullets: [
      { h: "Native Integrations:", b: "e-automate, SalesChain, Printanista live." },
      { h: "Direct GTM Reach:", b: "Existing channel and pilot relationships." },
      { h: "Reachable Now:", b: "No platform rebuild required to sell the segment." },
    ],
  },
  {
    icon: Crosshair,
    tag: "SOM",
    subtitle: "Integration-Locked Wedge",
    scope: "3-Year Beachhead Capture",
    locations: "4,500",
    locLabel: "Target Sites",
    arr: "$67.2M",
    arrLabel: "Defensible ARR",
    body: "100% of US independent copier dealers plus the top 10% of B2B commercial printers, locked through deep workflow integrations.",
    bullets: [
      { h: "Sticky Workflows:", b: "Embedded in daily dispatch and billing flows." },
      { h: "Switching Cost:", b: "Replacement requires re-integrating every ERP." },
      { h: "Wedge Quality:", b: "Small enough to win, large enough to fund the category." },
    ],
  },
];

const leverage = [
  {
    icon: TrendingDown,
    title: "Operating Leverage",
    metric: "15%",
    metricLabel: "Annual Cost Decline",
    body: "As the SOM cohort matures, fixed costs for LLM orchestration and API management are projected to decrease annually through refined model quantization and edge-processing efficiencies.",
  },
  {
    icon: Link2,
    title: "Customer Lifetime Value",
    metric: "5+ yrs",
    metricLabel: "LTV Horizon",
    body: "High switching costs from deep-stack ERP integrations with e-automate and SalesChain support projected churn below 8% per annum.",
  },
  {
    icon: ShieldCheck,
    title: "Pricing Resilience",
    metric: "40%",
    metricLabel: "Labor Cost Discount",
    body: "Subscription tiers are benchmarked against manual dispatch cost-per-ticket metrics so Phaos remains meaningfully below labor-heavy overhead.",
  },
];

export const Phaos08MarketSizing = ({ step }: Props) => (
  <SlideLayout variant="glow">
    <div className="flex flex-col h-full px-[18px] pt-[14px] pb-[8px]">
      <RevealElement step={0} currentStep={step} direction="fade">
        <div className="mb-[14px]">
          <p className="text-[22px] uppercase font-semibold leading-none" style={{ color: PHAOS.glow, letterSpacing: "0.42em" }}>
            Financial Architecture
          </p>
          <div className="mt-[16px]">
            <h1 className="text-[72px] font-black text-white leading-[0.98] tracking-[-1px] max-w-[1260px]">
              Verified Market Math, <span style={{ color: PHAOS.glow }}>No Blue Sky</span>
            </h1>
          </div>
        </div>
      </RevealElement>

      <div className="grid grid-cols-3 gap-[10px] h-[420px] shrink-0 mb-[10px]">
        {tiers.map((t, i) => {
          const Icon = t.icon;
          const accent = PHAOS.glow;
          const cardStep = 1 + i * 2;       // 1, 3, 5
          const bulletsStep = cardStep + 1; // 2, 4, 6
          return (
            <RevealElement key={t.tag} step={cardStep} currentStep={step} direction="up" delay={0.04} className="h-full">
              <GlassCard
                glow
                className="h-full px-[24px] py-[20px] flex flex-col overflow-hidden rounded-[12px]"
                style={{
                  background: `${PHAOS.glow}12`,
                  border: `1px solid ${PHAOS.primary}55`,
                }}
              >
                <div className="flex items-center gap-[12px] mb-[12px] pb-[12px]" style={{ borderBottom: `1px solid ${PHAOS.primary}55` }}>
                  <div className="min-w-0 flex-1">
                    <p className="text-[36px] font-black leading-none" style={{ color: accent }}>{t.tag}</p>
                    <p className="text-[15px] text-gray-300 uppercase tracking-[0.15em] mt-[3px] truncate">{t.subtitle}</p>
                  </div>
                </div>

                <h3 className="text-[29px] font-black text-white leading-[1.02] mb-[14px]">{t.scope}</h3>

                <div className="grid grid-cols-2 gap-[8px] mb-[14px]">
                  <div className="rounded-[9px] px-[14px] py-[12px] text-center" style={{ background: "rgba(255,255,255,0.045)", border: `1px solid ${PHAOS.primary}33` }}>
                    <p className="text-[13px] uppercase tracking-[0.18em] text-gray-400 leading-none">{t.locLabel}</p>
                    <p className="text-[38px] font-black text-white leading-none mt-[8px]">{t.locations}</p>
                  </div>
                  <div className="rounded-[9px] px-[14px] py-[12px] text-center" style={{ background: "rgba(255,255,255,0.045)", border: `1px solid ${PHAOS.primary}33` }}>
                    <p className="text-[13px] uppercase tracking-[0.18em] leading-none" style={{ color: accent }}>{t.arrLabel}</p>
                    <p className="text-[40px] font-black text-white leading-none mt-[8px]">{t.arr}</p>
                  </div>
                </div>


                <RevealElement step={bulletsStep} currentStep={step} direction="up" delay={0.03}>
                  <>
                    <p className="text-[18px] text-gray-300 leading-[1.25] mb-[12px]">{t.body}</p>
                    <ul className="grid gap-[7px] flex-1 content-start">
                      {t.bullets.map((bl) => (
                        <li key={bl.h} className="text-[16px] text-gray-300 leading-[1.22] flex gap-[8px]">
                          <span style={{ color: accent }} className="shrink-0 font-black">›</span>
                          <span><span className="text-white font-bold">{bl.h}</span> {bl.b}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                </RevealElement>
              </GlassCard>
            </RevealElement>
          );
        })}
      </div>

      <RevealElement step={7} currentStep={step} direction="up" delay={0.04}>
        <GlassCard
          glow
          className="h-[134px] px-[24px] py-[18px] mb-[10px] rounded-[12px]"
          style={{ background: `linear-gradient(120deg, ${PHAOS.gold}20, ${PHAOS.deep}15 74%)`, border: `1px solid ${PHAOS.gold}66` }}
        >
          <div className="grid grid-cols-[240px_1fr_1fr_1fr] items-center gap-[18px] h-full">
            <div className="flex items-center gap-[12px] h-full pr-[18px]" style={{ borderRight: `1px solid ${PHAOS.gold}44` }}>
              <div>
                <p className="text-[18px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Core Unit</p>
                <p className="text-[18px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Economics</p>
              </div>
            </div>
            {[
              { label: "Gross Margin", value: "60%", sub: "on voice compute and usage" },
              { label: "Avg Dealer ARPU", value: "$1,500/mo", sub: "sustained across every tier" },
              { label: "Capture Rate", value: "$0.20/min", sub: "stepping to $0.15 at volume" },
            ].map((e, idx) => {
              return (
                <RevealElement key={e.label} step={8 + idx} currentStep={step} direction="up" delay={0.03} className="h-full">
                  <div className="flex flex-col items-center justify-center text-center gap-[6px] h-full rounded-[10px] px-[16px] py-[10px]" style={{ background: "rgba(255,255,255,0.035)", border: `1px solid ${PHAOS.primary}33` }}>
                    <p className="text-[13px] uppercase tracking-[0.18em] text-gray-400 leading-none">{e.label}</p>
                    <p className="text-[38px] font-black text-white leading-none">{e.value}</p>
                    <p className="text-[14px] text-gray-400 leading-none">{e.sub}</p>
                  </div>
                </RevealElement>
              );
            })}
          </div>
        </GlassCard>
      </RevealElement>

      <div className="grid grid-cols-3 gap-[10px] h-[330px] shrink-0">
        {leverage.map((item, i) => {
          return (
            <RevealElement key={item.title} step={11 + i} currentStep={step} direction="up" delay={0.04} className="h-full">
              <div className="h-full rounded-[9px] px-[24px] py-[20px] flex flex-col overflow-hidden" style={{ background: `${PHAOS.glow}12`, border: `1px solid ${PHAOS.primary}55` }}>
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <h3 className="text-[26px] font-black text-white leading-[1.05]">{item.title}</h3>
                </div>
                <div className="flex items-end gap-[12px] mb-[14px] pb-[12px]" style={{ borderBottom: `1px solid ${PHAOS.primary}44` }}>
                  <p className="text-[58px] font-black leading-none" style={{ color: PHAOS.glow }}>{item.metric}</p>
                  <p className="text-[16px] uppercase tracking-[0.16em] leading-[1.15] mb-[5px]" style={{ color: PHAOS.goldGlow }}>{item.metricLabel}</p>
                </div>
                <p className="text-[21px] text-gray-200 leading-[1.28] flex-1">{item.body}</p>
              </div>
            </RevealElement>
          );
        })}
      </div>

      <RevealElement step={14} currentStep={step} direction="fade">
        <p className="text-[10px] text-gray-500 mt-[8px] leading-tight">
          Sources: IBISWorld Industry Research (2025 / 2026) · The Cannata Report (Annual Independent Dealer Survey) · Precedence Research (Global Market Sizing Reports, May 2026).
        </p>
      </RevealElement>
    </div>
  </SlideLayout>
);
