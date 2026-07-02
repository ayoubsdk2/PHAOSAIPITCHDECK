import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import { Users, Server, Printer, ShieldCheck, Brain, Headphones, Wrench, Cog, Globe, BarChart3, Zap } from "lucide-react";

interface Props { step: number; }

type Item = { name: string; desc: string; icon: any };

const crm: Item[] = [
  { name: "SalesChain",            icon: Users,      desc: "Quote-to-Cash leader for office equipment leasing." },
  { name: "Sherpa CRM (White Cup)",icon: Users,      desc: "Revenue Intelligence layered on top of ERP data." },
  { name: "AgentDealer",           icon: Users,      desc: "Salesforce-powered CRM pre-built for copier dealers." },
  { name: "Compass Sales",         icon: Users,      desc: "MPS-specialized TCO assessments & proposals." },
  { name: "Close CRM",             icon: Headphones, desc: "Action-first CRM with built-in calling & SMS." },
  { name: "HubSpot",               icon: Users,      desc: "Flywheel inbound for digital-first lead generation." },
  { name: "Pipedrive",             icon: Users,      desc: "Activity-Based Selling Kanban for field reps." },
  { name: "Zoho CRM",              icon: Users,      desc: "Massive ecosystem incl. inventory & service desk." },
  { name: "Microsoft Dynamics 365",icon: Users,      desc: "Enterprise standard with native Teams integration." },
  { name: "Salesforce",            icon: Users,      desc: "#1 AI CRM globally via the Agentforce ecosystem." },
  { name: "SugarCRM",              icon: Users,      desc: "Dev-friendly CRM with deep workflow automation." },
  { name: "Keap",                  icon: Users,      desc: "All-in-one CRM + marketing automation for SMB." },
];

const erp: Item[] = [
  { name: "ConnectWise Manage",    icon: Server,     desc: "Tickets, project status, and notes auto-logged from AI." },
  { name: "Syncro MSP",            icon: Server,     desc: "Service appointments triggered from RMM alerts." },
  { name: "Tigerpaw",              icon: Server,     desc: "Sync contacts and service assets via REST API." },
  { name: "e-automate (ECI)",      icon: Cog,        desc: "Pull meter reads into Phaos for automated billing." },
  { name: "HaloPSA",               icon: Server,     desc: "Modern PSA, automate tickets, time, assets via API." },
  { name: "Autotask (Datto/Kaseya)",icon: Server,    desc: "Leading PSA, sync tickets, contracts, billing." },
  { name: "ServiceNow",            icon: Server,     desc: "Enterprise ITSM for large-scale managed print." },
  { name: "Zuper",                 icon: Cog,        desc: "Modern field-service mgmt with real-time dispatch." },
  { name: "Atera",                 icon: Server,     desc: "Combined RMM + PSA for MSPs in a single pane." },
  { name: "Pulseway",              icon: Zap,        desc: "All-in-one IT platform with deep automation." },
  { name: "Freshservice",          icon: Headphones, desc: "ITIL-aligned service desk from Freshworks." },
  { name: "RepairShopr",           icon: Wrench,     desc: "Purpose-built intake & repair tracking for depots." },
];

const mps: Item[] = [
  { name: "PaperCut (Hive/MF)",    icon: Printer,    desc: "Print mgmt with quotas + environmental reporting." },
  { name: "PrinterLogic",          icon: Printer,    desc: "Serverless printing, eliminates print servers." },
  { name: "Printix (by Kofax)",    icon: Printer,    desc: "Cloud-native print with secure mobile release." },
  { name: "ezeep Blue",            icon: Printer,    desc: "Cloud printing, workflows on every new print job." },
  { name: "YSoft SafeQ",           icon: ShieldCheck,desc: "Enterprise print & scan with security automation." },
  { name: "MyQ Solution",          icon: Printer,    desc: "Flexible print mgmt with secure pull-printing." },
  { name: "PrintTracker",          icon: Wrench,     desc: "Industry-leading remote monitoring + supplies agent." },
  { name: "Printanista (ECI)",     icon: BarChart3, desc: "Comprehensive fleet mgmt, meters & contract billing." },
  { name: "Xerox Workplace Cloud", icon: Globe,      desc: "Hybrid/distributed print + content management." },
  { name: "HP JetAdvantage",       icon: BarChart3, desc: "Fleet analytics on device utilization & cost." },
  { name: "Lexmark Cloud",         icon: Cog,        desc: "Enterprise cloud fleet mgmt with predictive analytics." },
  { name: "FMAudit (ECI)",         icon: Printer,    desc: "Automated data collection for MPS providers worldwide." },
];

const Column = ({
  title,
  icon: Icon,
  items,
  step,
  currentStep,
  revealStep,
}: {
  title: string;
  icon: any;
  items: Item[];
  step: number;
  currentStep: number;
  revealStep: number;
}) => (
  <RevealElement step={revealStep} currentStep={currentStep} direction="left" delay={0.05} className="h-full">
    <GlassCard glow className="h-full p-[18px] flex flex-col">
      <div className="flex items-center gap-[10px] mb-[12px] pb-[10px]" style={{ borderBottom: `1px solid ${PHAOS.primary}33` }}>
        <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: `${PHAOS.primary}22`, border: `1px solid ${PHAOS.primary}55` }}>
          <Icon size={20} color={PHAOS.glow} />
        </div>
        <h3 className="text-[20px] font-bold text-white leading-tight">{title}</h3>
        <span className="ml-auto text-[12px] font-bold px-[8px] py-[3px] rounded-full"
          style={{ background: `${PHAOS.gold}1a`, border: `1px solid ${PHAOS.gold}55`, color: PHAOS.goldGlow }}>
          {items.length}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-[8px] flex-1 auto-rows-fr">
        {items.map((it, i) => {
          const ItIcon = it.icon;
          return (
            <RevealElement
              key={it.name}
              step={revealStep}
              currentStep={currentStep}
              direction="fade"
              delay={0.1 + i * 0.025}
              className="h-full"
            >
              <div
                className="rounded-[10px] p-[10px] h-full flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${PHAOS.primary}33`,
                }}
              >
                <div className="flex items-center gap-[8px] mb-[4px]">
                  <ItIcon size={14} color={PHAOS.glow} />
                  <span className="text-[13px] font-bold text-white leading-tight">{it.name}</span>
                </div>
                <p className="text-[11.5px] text-gray-400 leading-[1.35]">{it.desc}</p>
              </div>
            </RevealElement>
          );
        })}
      </div>
    </GlassCard>
  </RevealElement>
);

export const Phaos05Moat = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="relative flex flex-col h-full px-[40px] py-[28px]">
      {/* Header */}
      <div className="mb-[34px]">
        <div className="flex items-end justify-between gap-[24px]">
          <div>
            <p className="slide-kicker text-[18px]" style={{ color: PHAOS.glow, letterSpacing: "0.32em" }}>The Integration & Data Moat</p>
            <h1 className="text-[52px] font-black text-white mt-[4px] tracking-[-1.5px] leading-[1]">
              Deep Legacy Integrations{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${PHAOS.glow}, ${PHAOS.primary})` }}>
                + Proprietary Intelligence
              </span>
            </h1>
          </div>
          <p className="text-[15px] text-gray-400 max-w-[520px] leading-[1.35] text-right">
            Core native integrations + a universal API/webhook framework to seamlessly connect <span className="text-white font-semibold">36+ industry platforms</span>.
          </p>
        </div>
      </div>

      {/* 3 integration columns, shrink to leave large bottom ribbon */}
      <div className="grid grid-cols-3 gap-[16px] flex-1 min-h-0">
        <Column title="CRM & Sales"            icon={Users}   items={crm} step={step} currentStep={step} revealStep={1} />
        <Column title="Industry ERPs & PSAs"   icon={Server}  items={erp} step={step} currentStep={step} revealStep={2} />
        <Column title="Managed Print Services" icon={Printer} items={mps} step={step} currentStep={step} revealStep={3} />
      </div>

      {/* Bottom ribbon, large, matches green-box reference proportions */}
      <div className="grid grid-cols-2 gap-[20px] mt-[20px] h-[260px]">
        <RevealElement step={4} currentStep={step} direction="left" delay={0.05} className="h-full">
          <GlassCard glow className="h-full p-[28px] flex gap-[22px]" style={{ background: `linear-gradient(120deg, ${PHAOS.gold}18, transparent 70%)`, border: `1px solid ${PHAOS.gold}55` }}>
            <div className="w-[80px] h-[80px] rounded-[18px] flex items-center justify-center shrink-0"
              style={{ background: `${PHAOS.gold}22`, border: `1px solid ${PHAOS.gold}77` }}>
              <ShieldCheck size={44} color={PHAOS.goldGlow} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center flex-wrap gap-[10px] mb-[12px]">
                <h3 className="text-[30px] font-bold text-white leading-tight">Security-First Architecture</h3>
                {["SOC2-Ready", "Zero-Retention", "Encrypted"].map((t) => (
                  <span key={t} className="px-[12px] py-[4px] rounded-full text-[13px] font-bold"
                    style={{ background: `${PHAOS.gold}22`, border: `1px solid ${PHAOS.gold}77`, color: PHAOS.goldGlow }}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-[18px] text-gray-200 leading-[1.45]">
                OAuth / API-key isolation, zero-retention voice processing, and encrypted transit + staging.
                <span className="text-white font-semibold"> Dealer PII never leaks</span>, engineered for the compliance posture enterprise procurement teams demand from day one.
              </p>
            </div>
          </GlassCard>
        </RevealElement>

        <RevealElement step={5} currentStep={step} direction="right" delay={0.05} className="h-full">
          <GlassCard glow className="h-full p-[28px] flex gap-[22px]"
            style={{ background: `linear-gradient(120deg, ${PHAOS.primary}26, ${PHAOS.deep}11 70%)`, border: `1px solid ${PHAOS.primary}77` }}>
            <div className="w-[80px] h-[80px] rounded-[18px] flex items-center justify-center shrink-0"
              style={{ background: `${PHAOS.primary}33`, border: `1px solid ${PHAOS.primary}77` }}>
              <Brain size={44} color={PHAOS.goldGlow} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="text-[30px] font-bold leading-tight mb-[12px]" style={{ color: PHAOS.goldGlow }}>Data Gravitation Moat</h3>
              <p className="text-[18px] text-gray-200 leading-[1.45]">
                Every call sharpens proprietary resolution paths generic LLMs can't see. The compounding dataset becomes the industry's first
                <span className="text-white font-semibold"> "Autonomous Operations Brain"</span>, a defensible licensing layer that widens with every dealer onboarded.
              </p>
            </div>
          </GlassCard>
        </RevealElement>
      </div>
    </div>
  </SlideLayout>
);
