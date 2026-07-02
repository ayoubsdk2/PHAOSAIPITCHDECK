import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter } from "../RevealElement";
import { Compass, Lock, Zap, Swords, XCircle } from "lucide-react";

interface Props { step: number; }

const items = [
  { icon: Compass, title: "The Reality", body: "We are targeting a mature, non-displaceable $922 Billion Global Ecosystem. In the US alone, this represents a massive $210B+ infrastructure that is fundamentally bottlenecked by legacy voice operations and manual dealer workflow constraints. Highly established, battle tested businesses lagging other industries with AI adoption and innovation." },
  { icon: Lock,    title: "First-Mover Advantage", body: "Zero validated and prominent competitors for specialized agentic voice infrastructure native to the dealer tech stack such as EAutomate, Sales Chain, and Printanista." },
  { icon: Zap,     title: "The Result", body: "Phaos is strategically positioned to dominate this space, combining technical competency, deep executive networks, 100% founder focus and a team ready to jump in for scaling quickly." },
];

const competitors = [
  {
    name: "Help Genie",
    domain: "helpgenie.ai",
    url: "https://helpgenie.ai/",
    meta: "NZ 2026 Startup",
    points: [
      { h: "Market Focus:",       b: "Horizontal SMB across trades, real estate, hopsitality vs. Phaos AI, deeply verticalized exclusively for global document solutions, franchise and commercial printing operations." },
      { h: "Integration Competency:", b: "Cites API and webhooks to complete integration vs. Phaos AI discovered ECI charges $600 /month for all required API calls, and is orchestrating custom workarounds." },
      { h: "Security:",   b: "No information about how their product ensures security vs. Phaos AI, which is built on a SOC2-compliant architecture featuring zero-retention voice processing and isolated API." },
      { h: "ICP:", b: "Small businesses packaged for as few as 10-30 calls vs. Phaos AI's mixed volume, multi-location and enterprise print centric focus" },
      { h: "Live Website Demo:",  b: "Several buttons, none are functional vs. Phaos AI: active, functional, and able to demonstrate \u201Cas-if\u201D full integrations are in place." },
    ],
  },
  {
    name: "Envyro",
    domain: "envyro.io",
    url: "https://www.envyro.io/",
    meta: "Self funded 2025 Startup",
    points: [
      { h: "Business Model:",          b: "Services agency selling custom dev hours, retainers, and fractional CAIO roles vs. Phaos AI's scalable, high-margin proprietary software licensing platform." },
      { h: "Time to Value:",           b: "Multi-week custom consulting & discovery for every new client build vs. Phaos AI's pre-built vertical platform engineered for immediate deployment." },
      { h: "R&D Concentration:",       b: "Split across municipal government, e-commerce, and real estate vs. Phaos AI committing 100% of engineering velocity to a single compounding vertical." },
      { h: "Integration Architecture:",b: "Manually programs bespoke middleware case-by-case vs. Phaos AI's native pre-mapped structures for e-automate, SalesChain, and Printanista." },
      { h: "Operational Scalability:", b: "Constrained by human consulting and manual code management vs. Phaos AI's automated cloud platform deploying across thousands of dealer nodes." },
    ],
  },
];

export const Phaos02BlueOcean = ({ step }: Props) => (
  <SlideLayout variant="glow">
    <div className="flex flex-col h-full px-[56px] py-[26px]">
      <div className="text-center mb-[6px]">
        <h1 className="text-[58px] font-black text-white mt-[4px] tracking-[-2px] leading-[1]">
          A Neglected{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${PHAOS.glow}, ${PHAOS.primary})` }}>
            Global Vertical
          </span>
        </h1>
      </div>

      <RevealElement step={0} currentStep={step} direction="scale">
        <div className="flex justify-center my-[2px]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${PHAOS.primary}55 0%, transparent 65%)`, filter: "blur(60px)" }} />
            <AnimatedCounter
              value="$922B+"
              isVisible={step >= 0}
              pulse
              className="relative text-[80px] font-black leading-none"
              style={{
                backgroundImage: `linear-gradient(180deg, #ffffff 0%, ${PHAOS.glow} 70%, ${PHAOS.primary} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            />
          </div>
        </div>
      </RevealElement>

      <div className="grid grid-cols-3 gap-[18px] mt-[10px]">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <RevealElement key={i} step={1 + i} currentStep={step} direction="up" delay={0.05}>
              <GlassCard glow className="p-[24px] h-[330px]">
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <div className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center" style={{ background: `${PHAOS.primary}22`, border: `1px solid ${PHAOS.primary}55` }}>
                    <Icon size={24} color={PHAOS.glow} />
                  </div>
                  <h3 className="text-[24px] font-bold text-white">{it.title}</h3>
                </div>
                <p className="text-[21px] text-gray-200 leading-[1.4]">{it.body}</p>
              </GlassCard>
            </RevealElement>
          );
        })}
      </div>

      <div className="mt-[12px] flex-1 min-h-0 flex flex-col gap-[10px]">
        {competitors.map((c, i) => {
          const baseStep = 4 + i * 6; // Help Genie: 4 (box) + 5..9 (rows); Envyro: 10 (box) + 11..15 (rows)
          return (
            <RevealElement key={i} step={baseStep} currentStep={step} direction="up" delay={0.05} className="flex-1 min-h-0">
              <GlassCard glow className="h-full p-[12px] flex items-stretch gap-[14px] min-h-0" style={{ borderLeft: `5px solid ${PHAOS.gold}` }}>
                <div
                  className="w-[250px] shrink-0 rounded-[12px] px-[16px] py-[14px] flex flex-col justify-center"
                  style={{ background: `${PHAOS.gold}12`, border: `1px solid ${PHAOS.gold}45` }}
                >
                  <div className="flex items-center gap-[10px] mb-[10px]">
                    <Swords size={24} color={PHAOS.goldGlow} />
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.22em] leading-tight" style={{ color: PHAOS.goldGlow }}>Primary Competition</h3>
                  </div>
                  <span className="text-[30px] font-black text-white leading-[1]">{c.name}</span>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] lowercase tracking-[0.08em] leading-[1.35] mt-[8px] underline decoration-dotted underline-offset-[3px] hover:opacity-80 transition-opacity"
                    style={{ color: PHAOS.glow }}
                  >
                    {c.domain}
                  </a>
                  <span className="text-[12px] uppercase tracking-[0.14em] leading-[1.35] mt-[4px]" style={{ color: PHAOS.glow }}>{c.meta}</span>
                </div>
                <ul className="grid grid-rows-5 gap-[6px] flex-1 min-w-0 min-h-0">
                  {c.points.map((p, j) => (
                    <RevealElement key={j} step={baseStep + 1 + j} currentStep={step} direction="up" delay={0.03}>
                      <li
                        className="flex items-center gap-[10px] rounded-[9px] px-[12px] py-[4px] text-[16.5px] text-gray-200 leading-[1.22] min-h-0 h-full"
                        style={{ background: "rgba(255,255,255,0.026)", border: `1px solid ${PHAOS.primary}26` }}
                      >
                        <XCircle size={17} className="shrink-0" color={PHAOS.gold} />
                        <span className="block min-w-0"><span className="text-white font-bold">{p.h}</span> {p.b}</span>
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

