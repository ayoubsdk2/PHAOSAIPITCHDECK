import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { SlideLayout, PHAOS, GlassCard } from "../SlideLayout";
import { RevealElement, AnimatedCounter } from "../RevealElement";
import { Factory, Truck, BadgeCheck, Database, Landmark, TrendingUp, Mic, ShieldCheck, FileCheck2, Shield } from "lucide-react";

interface Props { step: number; }

const LicenseCard = ({ icon: Icon, title, price, unit, body, buyers, accent }: { icon: LucideIcon; title: string; price: string; unit: string; body: ReactNode; buyers: string; accent: string }) => (
  <div className="h-full rounded-[10px] px-[24px] py-[20px] flex flex-col overflow-hidden" style={{ background: `${PHAOS.glow}12`, border: `1px solid ${PHAOS.primary}55` }}>
    <div className="flex items-start gap-[14px] mb-[14px] pb-[12px]" style={{ borderBottom: `1px solid ${PHAOS.primary}44` }}>
      <div className="w-[48px] h-[48px] rounded-[11px] flex items-center justify-center shrink-0" style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}>
        <Icon size={24} color={accent} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[30px] font-black text-white leading-[1.02]">{title}</h3>
        <p className="text-[15px] text-gray-400 uppercase tracking-[0.18em] mt-[5px]">Data Licensing Tier</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[40px] font-black leading-none whitespace-nowrap" style={{ color: accent }}>{price}</p>
        <p className="text-[14px] text-gray-400 mt-[5px]">{unit}</p>
      </div>
    </div>
    <p className="text-[21px] text-gray-200 leading-[1.28] flex-1">{body}</p>
    <p className="text-[15px] uppercase tracking-[0.16em] mt-[14px]" style={{ color: PHAOS.glow }}>
      Buyers: <span className="text-gray-300 normal-case tracking-normal">{buyers}</span>
    </p>
  </div>
);

const InsightCard = ({ icon: Icon, title, metric, label, body }: { icon: LucideIcon; title: string; metric: string; label: string; body: ReactNode }) => (
  <div className="h-full rounded-[9px] px-[24px] py-[20px] flex flex-col overflow-hidden" style={{ background: `${PHAOS.glow}12`, border: `1px solid ${PHAOS.primary}55` }}>
    <div className="flex items-center gap-[12px] mb-[12px]">
      <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${PHAOS.primary}22`, border: `1px solid ${PHAOS.primary}55` }}>
        <Icon size={22} color={PHAOS.glow} />
      </div>
      <h3 className="text-[25px] font-black text-white leading-[1.05]">{title}</h3>
    </div>
    <div className="flex items-end gap-[12px] mb-[12px] pb-[10px]" style={{ borderBottom: `1px solid ${PHAOS.primary}44` }}>
      <p className="text-[52px] font-black leading-none" style={{ color: PHAOS.glow }}>{metric}</p>
      <p className="text-[15px] uppercase tracking-[0.16em] leading-[1.15] mb-[5px] text-white">{label}</p>
    </div>
    <p className="text-[20px] text-gray-200 leading-[1.26] flex-1">{body}</p>
  </div>
);

const Benchmark = ({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) => (
  <div className="rounded-[9px] px-[16px] py-[14px] flex gap-[12px] h-full" style={{ background: "rgba(255,255,255,0.045)", border: `1px solid ${PHAOS.primary}33` }}>
    <Icon size={22} color={PHAOS.glow} className="mt-[2px] shrink-0" />
    <div className="min-w-0">
      <p className="text-[20px] font-black text-white leading-tight">{title}</p>
      <p className="text-[15px] text-gray-400 leading-[1.25] mt-[5px]">{body}</p>
    </div>
  </div>
);

export const Phaos10Monetization = ({ step }: Props) => (
  <SlideLayout variant="dark">
    <div className="flex flex-col h-full px-[18px] pt-[14px] pb-[8px]">
      <RevealElement step={0} currentStep={step} direction="fade">
        <div className="mb-[14px]">
          <div className="flex items-end justify-between gap-[34px]">
            <div className="flex flex-col items-start max-w-[1260px]">
              <h1 className="text-[72px] font-black text-white leading-[0.98] tracking-[-1px]">
                Proprietary Intelligence Engine
              </h1>
              <h2 className="text-[72px] font-black text-white leading-[0.98] tracking-[-1px] mt-[6px]">
                Voice Agent Data <span style={{ color: PHAOS.glow }}>Revenue Stream</span>
              </h2>
            </div>
            <RevealElement step={13} currentStep={step} direction="scale" delay={0.05}>
              <div
                className="rounded-[14px] shrink-0 flex flex-col items-center justify-center text-center"
                style={{
                  background: "hsl(142 76% 56% / 0.10)",
                  border: "1px solid hsl(142 76% 56% / 0.55)",
                  boxShadow: "0 0 32px hsl(142 76% 56% / 0.25)",
                  paddingLeft: 26,
                  paddingRight: 26,
                  paddingTop: 18,
                  paddingBottom: 18,
                  minWidth: 320,
                }}
              >
                <div
                  className="text-[60px] font-black leading-none whitespace-nowrap"
                  style={{ color: "hsl(142 76% 56%)", textShadow: "0 0 22px hsl(142 76% 56% / 0.7)" }}
                >
                  $1B+
                </div>
                <div className="text-[15px] uppercase tracking-[0.22em] text-gray-200 mt-[8px]">
                  CCC FY2025 Revenue
                </div>
                <div className="text-[12px] text-gray-400 mt-[3px] tracking-[0.08em]">
                  Vertical data precedent
                </div>
              </div>
            </RevealElement>
          </div>
        </div>
      </RevealElement>

      <div className="grid grid-cols-2 gap-[10px] h-[286px] shrink-0 mb-[10px]">
        <RevealElement step={1} currentStep={step} direction="left" delay={0.04} className="h-full">
          <LicenseCard
            icon={Factory}
            title="OEM Intelligence License"
            price="$250K to $500K"
            unit="per OEM / year"
            accent={PHAOS.glow}
            body={<><span className="text-white font-bold">Anonymized model health, error-code telemetry, and failure intelligence</span> sourced from dealer calls routed through Phaos.</>}
            buyers="HP · Canon · Ricoh · Xerox · Konica Minolta · Epson · EFI · Kyocera Mita · Sharp · Riso · Screen · Heidelberg"
          />
        </RevealElement>
        <RevealElement step={2} currentStep={step} direction="right" delay={0.04} className="h-full">
          <LicenseCard
            icon={Truck}
            title="Supplier & Leasing License"
            price="$50K to $120K"
            unit="per supplier / year"
            accent="#ffffff"
            body={<><span className="text-white font-bold">Demand signals, parts-risk modeling, and replacement-cycle forecasting</span> for distributors, leasing companies, and supply networks.</>}
            buyers="Katun · Clover · GreatAmerica · Wells"
          />
        </RevealElement>
      </div>

      <div className="grid grid-cols-[1.05fr_0.95fr] gap-[10px] h-[222px] shrink-0 mb-[10px]">
        <RevealElement step={3} currentStep={step} direction="up" delay={0.04} className="h-full">
          <GlassCard glow className="h-full px-[24px] py-[18px] rounded-[12px]" style={{ background: `linear-gradient(120deg, ${PHAOS.gold}20, ${PHAOS.deep}15 74%)`, border: `1px solid ${PHAOS.gold}66` }}>
            <div className="grid grid-cols-[200px_1fr_1fr] gap-[16px] h-full items-center">
              <div className="flex items-center gap-[12px] h-full pr-[14px]" style={{ borderRight: `1px solid ${PHAOS.gold}44` }}>
                <TrendingUp size={30} color={PHAOS.goldGlow} />
                <div>
                  <p className="text-[18px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Financial</p>
                  <p className="text-[18px] font-black uppercase leading-[1.05]" style={{ color: PHAOS.goldGlow, letterSpacing: "0.2em" }}>Payoff</p>
                </div>
              </div>
              <RevealElement step={4} currentStep={step} direction="scale" delay={0.03} className="h-full">
                <div className="h-full text-center rounded-[10px] px-[14px] py-[12px] flex flex-col justify-center" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PHAOS.primary}44` }}>
                  <p className="text-[13px] uppercase tracking-[0.18em] text-white">5-Year Projection</p>
                  <AnimatedCounter value="$1.2M to $5.5M" isVisible={step >= 4} pulse className="block text-[34px] font-black leading-none mt-[9px] text-white" />
                  <p className="text-[16px] text-gray-300 mt-[8px]">ARR run-rate, 4 OEM + 35 supplier growth mechanic</p>
                </div>
              </RevealElement>
              <RevealElement step={5} currentStep={step} direction="scale" delay={0.03} className="h-full">
                <div className="h-full text-center rounded-[10px] px-[14px] py-[12px] flex flex-col justify-center" style={{ background: `${PHAOS.gold}16`, border: `1px solid ${PHAOS.gold}66` }}>
                  <p className="text-[13px] uppercase tracking-[0.18em] text-white">10-Year Projection</p>
                  <AnimatedCounter value="$7.5M to $25M+" isVisible={step >= 5} pulse className="block text-[34px] font-black leading-none mt-[9px] text-white" />
                  <p className="text-[16px] text-gray-300 mt-[8px]">ARR run-rate from Managed IT + Office Automation expansion</p>
                </div>
              </RevealElement>
            </div>
          </GlassCard>
        </RevealElement>

        <RevealElement step={6} currentStep={step} direction="up" delay={0.04} className="h-full">
          <GlassCard glow className="h-full px-[20px] py-[16px] rounded-[12px]" style={{ background: `${PHAOS.glow}10`, border: `1px solid ${PHAOS.primary}55` }}>
            <div className="grid grid-cols-3 gap-[8px] h-full">
              <RevealElement step={7} currentStep={step} direction="up" delay={0.03} className="h-full">
                <Benchmark icon={BadgeCheck} title="CCC" body="$1B+ FY2025 revenue from proprietary auto-insurance claims data." />
              </RevealElement>
              <RevealElement step={8} currentStep={step} direction="up" delay={0.03} className="h-full">
                <Benchmark icon={Database} title="Veeva" body="Vertical cloud leader built on deep workflow and reference data." />
              </RevealElement>
              <RevealElement step={9} currentStep={step} direction="up" delay={0.03} className="h-full">
                <Benchmark icon={Landmark} title="Toast" body="Operator telemetry productized as benchmarking intelligence." />
              </RevealElement>
            </div>
          </GlassCard>
        </RevealElement>
      </div>

      <div className="grid grid-cols-3 gap-[10px] h-[274px] shrink-0">
        <RevealElement step={10} currentStep={step} direction="up" delay={0.04} className="h-full">
          <InsightCard icon={Mic} title="Voice-Level Failure Capture" metric="Live" label="Telemetry Source" body={<>Legacy ERPs like <span className="text-white font-bold">eAutomate</span> and <span className="text-white font-bold">SalesChain</span> only see what humans type later. Phaos captures failures, error codes, and displacement risk the instant the call happens.</>} />
        </RevealElement>
        <RevealElement step={11} currentStep={step} direction="up" delay={0.04} className="h-full">
          <InsightCard icon={ShieldCheck} title="Zero-PII Ingestion" metric="Compliant" label="By Design" body="Customer and dealer personal data is processed ephemerally and scrubbed. The retained asset is hardware telemetry, failure trends, and macro displacement signals, clearing enterprise procurement security." />
        </RevealElement>
        <RevealElement step={12} currentStep={step} direction="up" delay={0.04} className="h-full">
          <InsightCard icon={FileCheck2} title="MSA Ownership Rights" metric="Aggregated" label="Macro Rights" body="Dealer contracts deliver local utility while preserving Phaos AI's right to aggregate, anonymize, and commercialize macro-level trends across OEMs, suppliers, and leasing partners." />
        </RevealElement>
      </div>

      <RevealElement step={14} currentStep={step} direction="fade">
        <p className="text-[10px] text-gray-500 mt-[14px] leading-tight flex items-center gap-[7px]">
          <Shield size={11} style={{ color: PHAOS.glow }} /> Sources: investors.cccis.com (CCC FY2025 results &amp; 10-K) · ir.veeva.com (FY2026 annual report) · investors.toasttab.com (2024 10-K, Toast Benchmarking). Phaos ARR figures: internal scenario model.
        </p>
      </RevealElement>
    </div>
  </SlideLayout>
);
