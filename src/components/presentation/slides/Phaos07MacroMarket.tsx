import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { SlideLayout, PHAOS } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import {
  TrendingDown,
  Layers,
  Printer,
  Wifi,
  ShieldAlert,
  Workflow,
  Bot,
} from "lucide-react";

interface Props { step: number; }

const ACCENT = PHAOS.glow;                       // #B987FF
const ACCENT_SOFT = "rgba(185,135,255,0.08)";
const ACCENT_BORDER = "rgba(185,135,255,0.28)";
const ACCENT_ICON_BG = "rgba(185,135,255,0.10)";

// Top hero stat card (Print Volume Collapse / Diversification Wave)
const HeroCard = ({
  step: revealStep,
  currentStep,
  icon: Icon,
  label,
  stat,
  children,
}: {
  step: number;
  currentStep: number;
  icon: LucideIcon;
  label: string;
  stat: string;
  children: ReactNode;
}) => (
  <RevealElement step={revealStep} currentStep={currentStep} direction="up" className="h-full">
    <div
      className="h-full rounded-[18px] px-[46px] pt-[42px] pb-[28px] flex flex-col overflow-hidden"
      style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT_BORDER}` }}
    >
      <div className="flex items-center gap-[12px] mb-[28px]">
        <div
          className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center shrink-0"
          style={{ background: ACCENT_ICON_BG, border: `1px solid ${ACCENT_BORDER}` }}
        >
          <Icon size={18} color={ACCENT} />
        </div>
        <span className="text-[18px] font-black tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
          {label}
        </span>
      </div>
      <div
        className="text-[154px] font-black leading-[0.86] mb-[28px]"
        style={{
          background: `linear-gradient(180deg, #ffffff 0%, ${ACCENT} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {stat}
      </div>
      <p className="text-[25px] text-gray-300 leading-[1.35] max-w-[760px]">{children}</p>

    </div>
  </RevealElement>
);

// Era card (the 4 below-fold "green" zones)
const EraCard = ({
  step: revealStep,
  currentStep,
  icon: Icon,
  era,
  title,
  children,
}: {
  step: number;
  currentStep: number;
  icon: LucideIcon;
  era: string;
  title: string;
  children: ReactNode;
}) => (
  <RevealElement step={revealStep} currentStep={currentStep} direction="up" className="min-h-0 h-full">
    <div
      className="h-full rounded-[9px] px-[20px] py-[16px] flex flex-col overflow-hidden"
      style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT_BORDER}` }}
    >
      <div className="flex items-center gap-[8px] mb-[6px]">
        <Icon size={17} color={ACCENT} />
        <span className="text-[13px] font-black tracking-[0.2em]" style={{ color: ACCENT }}>
          {era}
        </span>
      </div>
      <h3 className="text-[20px] font-black text-white leading-[1.1] mb-[8px]">{title}</h3>
      <div className="text-[16px] text-gray-300 leading-[1.28] flex-1">{children}</div>
    </div>
  </RevealElement>
);

// Justification block (the 3 below-fold "red" zones)
const JustifyBlock = ({
  step: revealStep,
  currentStep,
  icon: Icon,
  title,
  children,
}: {
  step: number;
  currentStep: number;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) => (
  <RevealElement step={revealStep} currentStep={currentStep} direction="up" className="h-full">
    <div
      className="h-full rounded-[9px] px-[22px] py-[20px] flex flex-col overflow-hidden"
      style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT_BORDER}` }}
    >
      <div className="flex items-center gap-[10px] mb-[12px]">
        <Icon size={18} color={ACCENT} />
        <h4 className="text-[21px] font-black text-white leading-tight">{title}</h4>
      </div>
      <p className="text-[16px] text-gray-300 leading-[1.32]">{children}</p>
    </div>
  </RevealElement>
);


export const Phaos07MacroMarket = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="flex flex-col h-full px-[18px] pt-[14px] pb-[8px]">
      {/* HEADER */}
      <RevealElement step={0} currentStep={step} direction="fade">
        <div className="mb-[20px]">
          <p className="text-[22px] uppercase font-semibold leading-none" style={{ color: ACCENT, letterSpacing: "0.42em" }}>
            Macro Market Realities
          </p>
          <h1 className="text-[74px] font-black text-white leading-[0.98] mt-[18px]">
            Industry Pivots Creating{" "}
            <span style={{ color: ACCENT }}>AI Necessity</span>
          </h1>
        </div>
      </RevealElement>

      {/* TOP HERO ROW, compact, high-impact band matching the reference spacing */}
      <div className="grid grid-cols-2 gap-[10px] mb-[10px] h-[440px] shrink-0">

        <HeroCard
          step={1}
          currentStep={step}
          icon={TrendingDown}
          label="Print Volume Collapse"
          stat="-32%"
        >
          Print volumes are down, dealers are pivoting to{" "}
          <span className="text-white font-semibold">Managed IT and Cybersecurity</span>,
          spiking technical support volume and making AI deflection an operational mandate.
        </HeroCard>
        <HeroCard
          step={2}
          currentStep={step}
          icon={Layers}
          label="Diversification Wave"
          stat="68%"
        >
          of commercial printers have moved into{" "}
          <span className="text-white font-semibold">wide-format &amp; packaging</span>,
          requiring consultative quoting and complex file troubleshooting{" "}
          <span style={{ color: ACCENT }} className="font-semibold">only agentic automation can handle</span>.
        </HeroCard>
      </div>

      {/* LOWER BAND: seven boxes occupy the bottom section without starving the hero */}
      <div className="grid grid-cols-4 gap-[10px] mb-[10px] h-[170px] shrink-0">
        <EraCard step={3} currentStep={step} icon={Printer} era="2016-2018" title="Shift to MPS">
          Dealers moved from one-off equipment sales to recurring <span className="text-white font-semibold">MPS contracts</span>. Remote fleet monitoring drove the first wave of technical calls.
        </EraCard>
        <EraCard step={4} currentStep={step} icon={Wifi} era="2019-2020" title="The Pandemic Pivot">
          Offices shuttered, print volume collapsed. Dealers expanded into <span className="text-white font-semibold">digital workflows, DMS, and cloud collaboration</span>.
        </EraCard>
        <EraCard step={5} currentStep={step} icon={ShieldAlert} era="2021-2023" title="IT Services Expansion">
          To replace lost print revenue, dealers diversified into <span className="text-white font-semibold">Managed IT and Cybersecurity</span>, every inquiry now a multi-tier ticket.
        </EraCard>
        <EraCard step={6} currentStep={step} icon={Layers} era="2024-2026" title="Agentic Diversification">
          <span className="font-black" style={{ color: ACCENT }}>68%</span> pivoted into <span className="text-white font-semibold">wide-format and packaging</span>, demanding sophisticated automation.
        </EraCard>
      </div>

      <div className="grid grid-cols-3 gap-[10px] h-[170px] shrink-0">
        <JustifyBlock step={7} currentStep={step} icon={ShieldAlert} title="Increased Technical Burden">
          Managing clients' entire IT stack means every hardware request now sits alongside potential network-wide issues, sharply increasing inbound volume and technical intensity.
        </JustifyBlock>
        <JustifyBlock step={8} currentStep={step} icon={Workflow} title="Consultative Complexity">
          Wide-format and specialty packaging demand consultative selling. Unlike transactional copier sales, these projects require coordination across many more touchpoints.
        </JustifyBlock>
        <JustifyBlock step={9} currentStep={step} icon={Bot} title="The Agentic Mandate">
          Wide-format troubleshooting plus managed IT support has overwhelmed phone systems. <span className="font-semibold" style={{ color: ACCENT }}>Agentic automation and AI deflection</span> are now operational requirements.
        </JustifyBlock>
      </div>


      <RevealElement step={10} currentStep={step} direction="fade">
        <p className="text-[10px] text-gray-500 mt-[9px] leading-tight">
          Sources: The Cannata Report (annual State of the Industry, May 2026) · Keypoint Intelligence, Industry diversification index · BTA &amp; ENX Magazine industry coverage.
        </p>
      </RevealElement>

    </div>
  </SlideLayout>
);
