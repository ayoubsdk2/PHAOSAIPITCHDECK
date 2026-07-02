import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { Briefcase, Cpu, Crown, Users, GraduationCap } from "lucide-react";
import daniel from "@/assets/team/daniel-lindros.jpg.asset.json";
import shree from "@/assets/team/shree-dandekar.jpg.asset.json";
import diego from "@/assets/team/diego-barrientos.png.asset.json";
import tori from "@/assets/team/tori-mccrea.png.asset.json";
import kaitlyn from "@/assets/team/kaitlyn-hathaway.jpg.asset.json";
import will from "@/assets/team/will-donahue.png.asset.json";

interface Props { step: number; }

const founderSections = [
  {
    icon: Briefcase,
    title: "Industry Expert & Deep Executive Network",
    body: "Nearly two decades of complete vertical expertise across the document solutions sector. Combines the rare, hands-on perspective of an elite individual producer, operational manager, and corporate executive with an active, global industry network.",
    bullets: [
      { h: "Commercial Print Shop President & COO:", b: "Personally ran a 40-year-old, 30+ employee commercial print shop with $4M+ annual revenue. Closed a deal for Pace working directly with the President of EFI." },
      { h: "Tier-1 Pedigree:", b: "Veteran leadership across industry giants. Managed a $200M division and 100+ reps at Xerox, supported Konica Minolta's top-10 production print channel, and hit 197% of quota as Senior AE at Canon Business Solutions." },
      { h: "Startup Growth & Big Wins:", b: "Fueled hyper-growth for early-stage ventures from $0 to 7/8-figure ARR across three industries. Closed hundreds of 5-7 figure deals with companies such as Bank of America, Harvard Business School, Marriott, PepsiCo, NFL, Thomson Reuters, and more." },
      { h: "Private Dealer & Franchise Consulting:", b: "Held 8 titles at two different private Sharp and Canon copier dealerships. Provided consulting for franchise quick printers such as Minuteman Press and Alpha Graphics, helping multiple owners avoid bankruptcy or radically overhaul operations." },
    ],
  },
  {
    icon: Cpu,
    title: "Technical AI Architect & Product Innovator",
    bullets: [
      { h: "Full-Stack Software Engineering:", b: "Personally architected, designed, and deployed the comprehensive Phaos AI infrastructure with a robust backend and a curated mixture of AI/LLM tech, building deep technical defensibility through agentic workflows integrated into eAutomate, SalesChain, and Printanista." },
      { h: "Elite Capital Efficiency:", b: "Eliminated hundreds of thousands of dollars in traditional software agency bloat by delivering institutional-grade product development from day zero, with the ability to iterate, update, and scale rapidly." },
    ],
  },
  {
    icon: GraduationCap,
    title: "Corporate & Sales Training",
    bullets: [
      { h: "Corporate Training:", b: "Completed in-person onsite corporate sales and product training with Xerox, Canon, Konica Minolta, and Office Depot, along with deep product/solution training with HP, Sharp, EFI, Duplo, CP Bourg, XMPie, and more." },
      { h: "Sales Training:", b: "15 pages of sales training memorized and used across multiple industries. Daniel created an LMS Learning Management System as part of a 40-hour sales training course used to onboard and scale a sales force rapidly, infusing everything he has ever learned into a comprehensive system." },
    ],
  },
  {
    icon: Crown,
    title: "High-Value Owner/Operator & Market Leverage",
    bullets: [
      { h: "$300K - $400K Value:", b: "Delivers the hands-on value of a top-tier AI Sales & Operations Executive as an Owner/Operator, combining AI Architect, CEO, CRO, CMO, COO, overlay, manager, and individual contributor experience to eliminate early-stage executive burn while maximizing skill per pre-seed dollar.", emphasis: true },
      { h: "Omni-Channel Understanding:", b: "Documented history navigating and closing technical contracts across Enterprise, Mid-Market, SMB, and State/Federal Government, enabling rapid pivots and fluid Go-to-Market execution." },
    ],
  },
];

const team = [
  {
    img: shree.url,
    name: "Shree Dandekar",
    role: "Chief Technology Officer",
    bio: "Over 30 years of visionary software innovation across Fortune 500 giants including Dell, Honeywell, and Whirlpool. A strategic growth architect bringing deep AI and Data Governance expertise to transform complex technical challenges into scalable, revenue-generating enterprise software.",
  },
  {
    img: diego.url,
    name: 'Juan "Diego" Barrientos',
    role: "Director of Product Technology",
    bio: "A versatile engineering leader who brings a rigorous, quality-first discipline to QA, UX research, and full-stack development. Ensures every deployed feature and client onboarding experience meets the highest standard of production-grade reliability and real-world usability.",
  },
  {
    img: tori.url,
    name: "Tori McCrea",
    role: "Operations Specialist",
    bio: "A certified administrative expert with 7+ years in financial stewardship and strategic leadership support. Systematizes fast-paced operations with transparent reporting and streamlined workflows that allow the entire organization to scale flawlessly.",
  },
  {
    img: kaitlyn.url,
    name: "Kaitlyn Hathaway",
    role: "Marketing Specialist",
    bio: "A data-driven growth marketer who translates complex technical concepts into compelling, human-centered narratives. Previously grew multi-platform social followings by 800%, commanding brand digital footprint and lead generation.",
  },
  {
    img: will.url,
    name: "Will Donahue",
    role: "Sales Specialist",
    bio: "An elite business development professional and recognized deal-maker (DCA Live Rising Star, Washington Business Journal Deal of the Year). Brings consultative acumen and financial rigor from high-stakes commercial real estate to navigate and close complex B2B partnerships.",
  },
];

const Headshot = ({ src, size, ring = PHAOS.glow }: { src: string; size: number; ring?: string }) => (
  <div
    className="rounded-full shrink-0 overflow-hidden"
    style={{
      width: size,
      height: size,
      border: `2px solid ${ring}`,
      boxShadow: `0 0 18px ${ring}55, inset 0 0 0 2px rgba(0,0,0,0.4)`,
      background: "#000",
    }}
  >
    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
  </div>
);

export const Phaos13Founder = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="flex flex-col h-full px-[32px] pt-[24px] pb-[8px]">
      {/* Header */}
      <RevealElement step={0} currentStep={step} direction="fade">
        <div className="mb-[12px]">
          <p className="text-[20px] uppercase font-semibold leading-none" style={{ color: PHAOS.glow, letterSpacing: "0.42em" }}>
            Leadership & Scaling Team
          </p>
          <h1 className="text-[54px] font-black leading-[1.02] tracking-[-1px] mt-[10px]">
            <span className="text-white">Ideal Founder-Market Fit</span>{" "}
            <span style={{ color: PHAOS.glow }}>& Elite Execution Team</span>
          </h1>
        </div>
      </RevealElement>

      {/* Two-column body */}
      <div className="grid grid-cols-[1.35fr_1fr] gap-[14px] flex-1 min-h-0">
        {/* LEFT, FOUNDER */}
        <RevealElement step={1} currentStep={step} direction="left" delay={0.04} className="h-full">
          <GlassCard
            glow
            className="h-full px-[22px] pt-[4px] pb-[32px] flex flex-col overflow-hidden rounded-[12px]"
            style={{ background: `${PHAOS.glow}10`, borderLeft: `4px solid ${PHAOS.glow}`, border: `1px solid ${PHAOS.primary}55` }}
          >
            {/* Founder header */}
            <div className="flex items-center gap-[18px] pb-[12px] mb-[12px]" style={{ borderBottom: `1px solid ${PHAOS.primary}55` }}>
              <Headshot src={daniel.url} size={160} />
              <div className="flex-1 min-w-0">
                <h2 className="text-[42px] font-black text-white leading-[1.02]">Daniel Lindros</h2>
                <p className="text-[18px] font-semibold leading-tight mt-[5px]" style={{ color: PHAOS.glow }}>
                  Founder, CEO & Technical Architect
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col flex-1 pt-[8px] pb-[0px] gap-[14px]">
              {(() => {
                let stepCounter = 2;
                return founderSections.map((s) => {
                  const Icon = s.icon;
                  const titleStep = stepCounter++;
                  const bodyStep = s.body ? stepCounter++ : null;
                  const bulletSteps = s.bullets.map(() => stepCounter++);
                  return (
                    <div key={s.title} className="flex flex-col gap-[6px]">
                      <RevealElement step={titleStep} currentStep={step} direction="up" delay={0.02}>
                        <div className="flex items-center gap-[10px]">
                          <div
                            className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center shrink-0"
                            style={{ background: `${PHAOS.glow}22`, border: `1px solid ${PHAOS.glow}66` }}
                          >
                            <Icon size={17} color={PHAOS.glow} />
                          </div>
                          <h3 className="text-[18px] font-black text-white leading-tight">{s.title}</h3>
                        </div>
                      </RevealElement>
                      {s.body && bodyStep && (
                        <RevealElement step={bodyStep} currentStep={step} direction="up" delay={0.02}>
                          <p className="text-[15px] text-gray-300 leading-[1.3] pl-[40px]">{s.body}</p>
                        </RevealElement>
                      )}
                      <ul className="grid gap-[4px] pl-[40px]">
                        {s.bullets.map((bl: any, bi: number) => (
                          <RevealElement key={bl.h} step={bulletSteps[bi]} currentStep={step} direction="up" delay={0.02}>
                            <li className="text-[15px] leading-[1.3] flex gap-[6px]">
                              <span style={{ color: PHAOS.gold }} className="shrink-0 font-black">›</span>
                              <span className="text-gray-300">
                                {bl.emphasis ? (
                                  <span className="font-black text-[17px]" style={{ color: "#22c55e", textShadow: "0 0 14px rgba(34,197,94,0.55)" }}>
                                    {bl.h}
                                  </span>
                                ) : (
                                  <span className="text-white font-bold">{bl.h}</span>
                                )}{" "}
                                {bl.b}
                              </span>
                            </li>
                          </RevealElement>
                        ))}
                      </ul>
                    </div>
                  );
                });
              })()}
            </div>

          </GlassCard>
        </RevealElement>

        {/* RIGHT, TEAM */}
        <div className="flex flex-col h-full min-h-0">
          <RevealElement step={17} currentStep={step} direction="right" delay={0.04} className="flex-1 min-h-0">
            <GlassCard
              glow
              className="h-full px-[18px] py-[16px] flex flex-col overflow-hidden rounded-[12px]"
              style={{ background: `${PHAOS.gold}0d`, borderLeft: `4px solid ${PHAOS.gold}`, border: `1px solid ${PHAOS.gold}55` }}
            >
              <div className="flex items-center gap-[10px] pb-[10px] mb-[10px]" style={{ borderBottom: `1px solid ${PHAOS.gold}44` }}>
                <div
                  className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center shrink-0"
                  style={{ background: `${PHAOS.gold}22`, border: `1px solid ${PHAOS.gold}77` }}
                >
                  <Users size={19} color={PHAOS.goldGlow} />
                </div>
                <p className="text-[14px] uppercase font-black leading-none" style={{ color: PHAOS.goldGlow, letterSpacing: "0.28em" }}>
                  The Phaos AI Execution Team
                </p>
              </div>

              <div className="flex flex-col gap-[14px] flex-1 justify-between">
                {team.map((m, i) => (
                  <RevealElement key={m.name} step={18 + i} currentStep={step} direction="right" delay={0.03}>
                    <div
                      className="flex items-start gap-[16px] px-[14px] py-[14px] rounded-[10px]"
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${PHAOS.primary}44` }}
                    >
                      <Headshot src={m.img} size={120} ring={i % 2 === 0 ? PHAOS.glow : PHAOS.gold} />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[27px] font-black text-white leading-tight">{m.name}</h4>
                        <p className="text-[14px] uppercase font-bold leading-none mt-[4px]" style={{ color: PHAOS.glow, letterSpacing: "0.22em" }}>
                          {m.role}
                        </p>
                        <p className="text-[15px] text-gray-300 leading-[1.34] mt-[6px]">{m.bio}</p>
                      </div>
                    </div>
                  </RevealElement>
                ))}
              </div>
            </GlassCard>
          </RevealElement>
        </div>
      </div>
    </div>

  </SlideLayout>
);
