import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import referrizerArrowBullet from "@/assets/referrizer-arrow-bullet.png";
import { Layers, UserCheck, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Layers,
    title: "Premium PLUS",
    subtitle: "Referrizer Platform",
    accent: "hsl(208 100% 62%)",
    surface: "hsl(208 100% 62% / 0.12)",
    glow: "hsl(208 100% 62% / 0.35)",
    bullets: [
      "Automate referrals, loyalty, and reputation",
      "SMS/email campaigns across all 6 locations",
      "AI Employee for 24/7 instant lead response",
      "Pipeline with lead management",
      "Points-based loyalty to reduce churn",
      "Auto-request reviews & AI-powered replies",
      "30+ integrations (MINDBODY, Stripe, Zapier)",
      "48,000 SMS & 150,000 emails included",
      "Overages: $0.01/SMS, $0.0025/email",
      "Automated win-back campaigns for reactivation",
      "Multi-location analytics dashboard",
    ],
  },
  {
    icon: UserCheck,
    title: "Platinum PRO",
    subtitle: "Managed Service",
    accent: "hsl(206 100% 69%)",
    surface: "hsl(206 100% 69% / 0.12)",
    glow: "hsl(206 100% 69% / 0.32)",
    bullets: [
      "Dedicated marketing expert for all 6 locations",
      "Content creation, campaign design & execution",
      "Monthly strategy and optimization",
      "Consistent branding everywhere",
      "Custom creative for each location",
      "A/B testing and scaling what works",
      "Seasonal campaign pivots",
      "Bi-weekly strategy calls",
      "Monthly performance reports",
      "Email template design & management",
    ],
  },
  {
    icon: Megaphone,
    title: "True Conversions",
    subtitle: "Ad Management",
    accent: "hsl(209 84% 56%)",
    surface: "hsl(209 84% 56% / 0.12)",
    glow: "hsl(209 84% 56% / 0.32)",
    bullets: [
      "Meta & Google PPC campaign management",
      "Custom lead funnels & landing pages",
      "10-touch automated nurture sequences",
      "Bi-weekly strategy & optimization calls",
      "Lookalike audiences & retargeting",
      "A/B tested ad creatives at scale",
      "Geo-targeted campaigns per location",
      "Video ad creation & management",
      "Conversion rate optimization",
    ],
  },
];

const TOP_ROW_COUNT = pillars[0].bullets.length;
const topCardTitle = "hsl(222 47% 11%)";
const topCardBody = "hsl(216 24% 21%)";
const topCardBorder = "hsl(214 24% 84% / 0.9)";
const topCardSurface = "linear-gradient(180deg, hsl(0 0% 100% / 0.99) 0%, hsl(210 25% 98% / 0.97) 100%)";
const titleAccent = "linear-gradient(135deg, hsl(208 100% 62%) 0%, hsl(206 100% 69%) 100%)";
const subtitleTone = "hsl(220 16% 67%)";

const BulletRow = ({ text, visible }: { text?: string; visible: boolean }) => {
  if (!text) {
    return <div aria-hidden="true" className="h-full" />;
  }

  return (
    <motion.div
      className="grid h-full grid-cols-[20px_1fr] items-center gap-[14px]"
      initial={{ opacity: 0, y: 8 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img
        src={referrizerArrowBullet}
        alt=""
        aria-hidden="true"
        className="h-[18px] w-[18px] shrink-0 object-contain"
      />
      <span className="text-[18px] font-medium leading-[1.16]" style={{ color: topCardBody }}>
        {text}
      </span>
    </motion.div>
  );
};

// Step 0 = title. Then for each pillar: 1 step to reveal card, then 1 step per bullet.
// Premium PLUS: card at step 1, bullets at 2..12
// Platinum PRO: card at step 13, bullets at 14..23
// True Conversions: card at step 24, bullets at 25..33
const cardSteps: number[] = [];
const bulletStartSteps: number[] = [];
{
  let s = 1;
  for (const p of pillars) {
    cardSteps.push(s);       // step to show the card
    bulletStartSteps.push(s + 1); // first bullet step
    s += 1 + p.bullets.length;
  }
}

export const Slide05Solution = ({ step }: { step: number }) => (
  <SlideLayout variant="glow">
    <div className="grid h-full grid-rows-[auto_1fr] px-[60px] py-[32px]">
      <RevealElement step={0} currentStep={step} direction="left">
        <p className="mb-[10px] text-[18px] font-semibold uppercase tracking-[6px] text-white">
          The Complete Solution
        </p>
        <h2 className="mb-[14px] max-w-[1380px] text-[74px] font-black leading-[0.96] tracking-[-2px] text-white">
          Three Pillars of{" "}
          <motion.span
            className="inline-block bg-clip-text text-transparent"
            style={{ backgroundImage: titleAccent }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Growth
          </motion.span>
        </h2>
        <p className="mb-[34px] max-w-[1240px] text-[28px] leading-[1.12]" style={{ color: subtitleTone }}>
          Everything you need to attract, convert, and retain — <span className="font-bold" style={{ color: subtitleTone }}>all managed for you.</span>
        </p>
      </RevealElement>

      <div className="grid h-[90%] min-h-0 self-start grid-cols-3 gap-[44px]">
        {pillars.map((pillar, index) => {
          const cardVisible = step >= cardSteps[index];
          return (
            <motion.div
              key={pillar.title}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={cardVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GlassCard
                className="flex h-full flex-col rounded-[30px] px-[34px] pt-[34px] pb-[22px]"
                glow
                style={{
                  background: topCardSurface,
                  border: `1px solid ${topCardBorder}`,
                  boxShadow: "0 34px 90px hsl(222 47% 8% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.88)",
                }}
              >
                <div className="mb-[18px] flex min-h-[68px] items-start gap-[16px]">
                  <motion.div
                    className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[18px] border"
                    style={{ background: pillar.surface, borderColor: pillar.glow }}
                    animate={cardVisible ? { boxShadow: ["0 0 0px hsl(0 0% 0% / 0)", `0 0 28px ${pillar.glow}`, "0 0 0px hsl(0 0% 0% / 0)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <pillar.icon size={28} style={{ color: pillar.accent }} />
                  </motion.div>
                  <div className="flex min-h-[58px] flex-col justify-center">
                    <h3 className="text-[30px] font-black leading-none" style={{ color: topCardTitle }}>
                      {pillar.title}
                    </h3>
                    <p className="mt-[6px] text-[18px] font-semibold" style={{ color: pillar.accent }}>
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid flex-1 min-h-0" style={{ gridTemplateRows: `repeat(${TOP_ROW_COUNT}, minmax(0, 1fr))` }}>
                  {Array.from({ length: TOP_ROW_COUNT }, (_, rowIndex) => (
                    <BulletRow
                      key={`${pillar.title}-${rowIndex}`}
                      text={pillar.bullets[rowIndex]}
                      visible={step >= bulletStartSteps[index] + rowIndex}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  </SlideLayout>
);
