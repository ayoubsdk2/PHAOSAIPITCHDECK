import { Fragment } from "react";
import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { Rocket, Factory, Globe2, MapPin, ArrowRight, Gauge, Network, Handshake } from "lucide-react";

interface Props { step: number; }

const phases = [
  {
    icon: Rocket,
    phase: "Phase 1",
    tag: "Immediate Capture",
    title: "US Copier Dealers",
    locations: "2,500",
    locLabel: "US Locations",
    arr: "$48M",
    arrLabel: "ARR Opportunity",
    body: "Existing ERP and PSA integrations unlock the independent dealer network with low-friction onboarding and direct pilot motion.",
    bullets: [
      { h: "Native Connectors:", b: "e-automate, SalesChain, Printanista." },
      { h: "GTM Motion:", b: "Direct dealer pilots and channel referrals." },
      { h: "Wedge Win:", b: "First-mover lock on the BTA dealer base." },
    ],
    chips: ["e-automate", "SalesChain", "Printanista"],
  },
  {
    icon: Factory,
    phase: "Phase 2",
    tag: "Volume Expansion",
    title: "US Commercial / Industrial",
    locations: "25,000",
    locLabel: "US Locations",
    arr: "$240M",
    arrLabel: "ARR Opportunity",
    body: "A general onboarding system unlocks B2B production, packaging, wide-format, and franchise print networks at scale.",
    bullets: [
      { h: "Verticals:", b: "B2B production, wide-format, packaging." },
      { h: "Channel:", b: "Franchise networks and print co-ops." },
      { h: "Leverage:", b: "Phase 1 integrations reused at scale." },
    ],
    chips: ["B2B Production", "Packaging", "Franchise Networks"],
  },
  {
    icon: Globe2,
    phase: "Phase 3",
    tag: "Global Enterprise",
    title: "Global OEM Direct",
    locations: "1,000",
    locLabel: "Global Hubs",
    arr: "$42M",
    arrLabel: "ARR Opportunity",
    body: "Targeted deployment into manufacturer regional hubs for the world's top document solutions OEMs and enterprise service networks.",
    bullets: [
      { h: "OEM Targets:", b: "Xerox, Ricoh, Canon, Konica Minolta." },
      { h: "Deal Shape:", b: "Multi-year enterprise contracts." },
      { h: "Data Moat:", b: "Fleet telemetry licensing layered on top." },
    ],
    chips: ["Xerox", "Ricoh", "Canon", "Konica", "Sharp", "Kyocera"],
  },
];

const accelerators = [
  {
    icon: Gauge,
    title: "Integration Acceleration",
    metric: "<48 hrs",
    label: "Time-to-Value",
    body: "By Phase 2, the General Onboarding system uses a templated API handshake protocol that reduces new-client launch time from weeks to under 48 hours.",
  },
  {
    icon: Network,
    title: "Network Effects",
    metric: "+20%",
    label: "Agentic Accuracy",
    body: "For every 500 new locations added, the call-intent database expands and accuracy improves, creating a cycle where deployment makes the product stronger.",
  },
  {
    icon: Handshake,
    title: "Partnership Moats",
    metric: "PSA",
    label: "Marketplace Default",
    body: "Each phase includes proactive co-marketing with major Professional Services Automation providers to position Phaos as the default voice layer.",
  },
];

const geography = [
  { label: "North America", sub: "Domestic beachhead" },
  { label: "English-Speaking EMEA", sub: "UK, Ireland" },
  { label: "Australia / New Zealand", sub: "ANZ commercial" },
  { label: "Global OEM Deployment", sub: "Full international" },
];

export const Phaos09TAM = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="flex flex-col h-full px-[18px] pt-[14px] pb-[8px]">
      <RevealElement step={0} currentStep={step} direction="fade">
        <div className="mb-[14px]">
          <p className="text-[22px] uppercase font-semibold leading-none" style={{ color: PHAOS.glow, letterSpacing: "0.42em" }}>
            Expansion Roadmap
          </p>
          <div className="mt-[16px]">
            <h1 className="text-[72px] font-black text-white leading-[0.98] tracking-[-1px] max-w-[1260px]">
              Sequential Scale from <span style={{ color: PHAOS.glow }}>Niche to Global</span>
            </h1>
          </div>
        </div>
      </RevealElement>

      <div className="grid grid-cols-3 gap-[10px] h-[418px] shrink-0 mb-[10px]">
        {phases.map((p, i) => {
          const Icon = p.icon;
          const accent = PHAOS.glow;
          const cardStep = 1 + i * 3;     // 1, 4, 7
          const bodyStep = cardStep + 1;  // 2, 5, 8
          const chipsStep = cardStep + 2; // 3, 6, 9
          return (
            <RevealElement key={p.phase} step={cardStep} currentStep={step} direction="up" delay={0.04} className="h-full">
              <GlassCard
                glow
                className="h-full px-[24px] py-[20px] flex flex-col overflow-hidden rounded-[12px]"
                style={{
                  background: `${PHAOS.glow}12`,
                  border: `1px solid ${PHAOS.primary}55`,
                }}
              >
                <div className="flex items-center gap-[12px] mb-[12px] pb-[12px]" style={{ borderBottom: `1px solid ${PHAOS.primary}55` }}>
                  <div className="w-[48px] h-[48px] rounded-[11px] flex items-center justify-center shrink-0" style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}>
                    <Icon size={24} color={accent} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[32px] font-black leading-none" style={{ color: accent }}>{p.phase}</p>
                    <p className="text-[15px] text-gray-300 uppercase tracking-[0.15em] mt-[3px] truncate">{p.tag}</p>
                  </div>
                </div>

                <h3 className="text-[29px] font-black text-white leading-[1.02] mb-[14px]">{p.title}</h3>

                <div className="grid grid-cols-2 gap-[8px] mb-[14px]">
                  <div className="rounded-[9px] px-[14px] py-[12px] text-center" style={{ background: "rgba(255,255,255,0.045)", border: `1px solid ${PHAOS.primary}33` }}>
                    <p className="text-[13px] uppercase tracking-[0.18em] text-gray-400 leading-none">{p.locLabel}</p>
                    <p className="text-[38px] font-black text-white leading-none mt-[8px]">{p.locations}</p>
                  </div>
                  <div className="rounded-[9px] px-[14px] py-[12px] text-center" style={{ background: "rgba(255,255,255,0.045)", border: `1px solid ${PHAOS.primary}33` }}>
                    <p className="text-[13px] uppercase tracking-[0.18em] leading-none" style={{ color: accent }}>{p.arrLabel}</p>
                    <p className="text-[40px] font-black leading-none mt-[8px] text-white">{p.arr}</p>
                  </div>
                </div>

                <RevealElement step={bodyStep} currentStep={step} direction="up" delay={0.03}>
                  <>
                    <p className="text-[18px] text-gray-300 leading-[1.24] mb-[12px]">{p.body}</p>
                    <ul className="grid gap-[7px] content-start">
                      {p.bullets.map((bl) => (
                        <li key={bl.h} className="text-[16px] text-gray-300 leading-[1.2] flex gap-[8px]">
                          <span style={{ color: accent }} className="shrink-0 font-black">›</span>
                          <span><span className="text-white font-bold">{bl.h}</span> {bl.b}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                </RevealElement>
                <RevealElement step={chipsStep} currentStep={step} direction="up" delay={0.03} className="mt-auto">
                  <div className="flex flex-wrap gap-[6px] pt-[10px]" style={{ borderTop: `1px solid ${PHAOS.primary}33` }}>
                    {p.chips.map((c) => (
                      <span key={c} className="px-[9px] py-[4px] rounded-full text-[12px] font-bold whitespace-nowrap" style={{ background: `${PHAOS.primary}1f`, border: `1px solid ${PHAOS.primary}55`, color: PHAOS.glow }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </RevealElement>
              </GlassCard>
            </RevealElement>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-[10px] h-[278px] shrink-0 mb-[10px]">
        {accelerators.map((item, i) => {
          const Icon = item.icon;
          return (
            <RevealElement key={item.title} step={10 + i} currentStep={step} direction="up" delay={0.04} className="h-full">
              <div className="h-full rounded-[9px] px-[24px] py-[20px] flex flex-col overflow-hidden" style={{ background: `${PHAOS.glow}12`, border: `1px solid ${PHAOS.primary}55` }}>
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${PHAOS.primary}22`, border: `1px solid ${PHAOS.primary}55` }}>
                    <Icon size={22} color={PHAOS.glow} />
                  </div>
                  <h3 className="text-[26px] font-black text-white leading-[1.05]">{item.title}</h3>
                </div>
                <div className="flex items-end gap-[12px] mb-[12px] pb-[10px]" style={{ borderBottom: `1px solid ${PHAOS.primary}44` }}>
                  <p className="text-[56px] font-black leading-none" style={{ color: PHAOS.glow }}>{item.metric}</p>
                  <p className="text-[16px] uppercase tracking-[0.16em] leading-[1.15] mb-[5px]" style={{ color: PHAOS.goldGlow }}>{item.label}</p>
                </div>
                <p className="text-[20px] text-gray-200 leading-[1.26] flex-1">{item.body}</p>
              </div>
            </RevealElement>
          );
        })}
      </div>

      <RevealElement step={13} currentStep={step} direction="up" delay={0.04}>
        <GlassCard glow className="h-[108px] px-[22px] py-[14px] rounded-[12px]" style={{ background: `linear-gradient(120deg, ${PHAOS.gold}20, ${PHAOS.deep}15 74%)`, border: `1px solid ${PHAOS.gold}66` }}>
          <div className="flex items-center gap-[16px] h-full">
            <div className="flex items-center gap-[12px] shrink-0 pr-[18px] h-full" style={{ borderRight: `1px solid ${PHAOS.gold}44` }}>
              <MapPin size={28} color={PHAOS.goldGlow} />
              <div>
                <p className="text-[17px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Geographic</p>
                <p className="text-[17px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Evolution</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-[10px]">
              {geography.map((g, i) => (
                <Fragment key={g.label}>
                  <div className="text-center px-[10px] py-[12px] rounded-[9px]" style={{ background: "rgba(255,255,255,0.045)", border: `1px solid ${PHAOS.primary}44` }}>
                    <p className="text-[18px] font-black text-white leading-tight">{g.label}</p>
                    <p className="text-[13px] text-gray-400 mt-[4px] leading-tight">{g.sub}</p>
                  </div>
                  {i < geography.length - 1 && <ArrowRight size={22} color={PHAOS.glow} className="mx-auto" />}
                </Fragment>
              ))}
            </div>
          </div>
        </GlassCard>
      </RevealElement>

      <RevealElement step={14} currentStep={step} direction="fade">
        <p className="text-[10px] text-gray-500 mt-[7px] leading-tight">
          Sources: The Cannata Report (Annual Independent Dealer Survey, 2026) · IBISWorld Commercial Printing Industry Report (2026) · Phaos AI internal expansion model.
        </p>
      </RevealElement>
    </div>
  </SlideLayout>
);
