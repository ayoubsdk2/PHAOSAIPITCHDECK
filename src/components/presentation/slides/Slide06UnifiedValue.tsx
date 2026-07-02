import { SlideLayout, GlassCard } from "../SlideLayout";
import { RevealElement } from "../RevealElement";
import referrizerArrowBullet from "@/assets/referrizer-arrow-bullet.png";
import { Rocket, Brain, ShieldAlert, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const accent = "hsl(142 71% 45%)";

const sections = [
  {
    icon: Rocket,
    title: "Key Benefits",
    kicker: "Operational upside",
    bullets: [
      "Full Funnel Mastery: Ads drive targeted traffic; CRM automates the nurturing.",
      "Centralized Control: Manage and push campaigns to all 6 gyms simultaneously.",
      "Instant Engagement: Automated speed-to-lead skyrockets booking rates.",
      "Auto-Reputation: Seamless review requests scale your local SEO effortlessly.",
    ],
  },
  {
    icon: Brain,
    title: "Why It Works",
    kicker: "Strategic logic",
    bullets: [
      'Smart "Lookalike" Loops: Clean CRM data feeds ad platforms for hyper-accurate targeting.',
      "Capitalizing Webtraffic: True Conversions boosts website traffic, landing on your gym homepage. Referrizer's pop-up instantly captures the lead, and Smart Line Quick Connect calls them! Scheduling while they're HOT!",
      "Seamless Brand Continuity: High-end ads instantly transition to frictionless, branded follow-ups.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Challenges Avoided",
    kicker: "Risk reduction",
    bullets: [
      'No "Leaky Buckets": Eliminates lost leads caused by front-desk human error.',
      "Unified Strategy: Cures the nightmare of rogue, siloed marketing across 6 locations.",
      "Zero Tech Bloat: Consolidates a messy tech stack into one streamlined ecosystem.",
      "Reputation Boosting: Inspire members to leave 5 Star Reviews amidst their endorphin rush! Right after their workouts!",
    ],
  },
  {
    icon: TrendingUp,
    title: "Opportunities Maximized",
    kicker: "Scalable growth",
    bullets: [
      "Plug-and-Play Expansion: An ironclad system ready for locations 7, 8, and 9.",
      "Cross-Pollination: Launch network-wide challenges and upsells to your existing base.",
      "Omnipresent Retargeting: 30-day automated nurture paired with social media retargeting.",
      "Database Reactivation: Instantly monetize dormant leads sitting in your current lists.",
    ],
  },
];

const cardTitle = "hsl(222 47% 11%)";
const cardBody = "hsl(216 24% 21%)";
const cardBorder = "hsl(214 24% 84% / 0.9)";
const cardSurface = "linear-gradient(180deg, hsl(0 0% 100% / 0.99) 0%, hsl(210 25% 98% / 0.97) 100%)";

const BulletRow = ({ text }: { text: string }) => (
  <div className="grid grid-cols-[20px_1fr] gap-[14px] items-start">
    <img
      src={referrizerArrowBullet}
      alt=""
      aria-hidden="true"
      className="mt-[5px] h-[18px] w-[18px] shrink-0 object-contain"
    />
    <p className="text-[22px] leading-[1.28] font-medium" style={{ color: cardBody }}>{text}</p>
  </div>
);

export const Slide06UnifiedValue = ({ step }: { step: number }) => (
  <SlideLayout>
    <div className="flex h-full flex-col px-[70px] py-[44px]">
      <RevealElement step={0} currentStep={step} direction="left">
        <p className="mb-[10px] text-[20px] font-semibold uppercase tracking-[6px]" style={{ color: accent }}>
          Unified Value Opportunity
        </p>
        <h2 className="mb-[8px] text-[72px] font-black leading-[0.92] tracking-[-3px] text-white">
          Why This Stack{" "}
          <motion.span
            className="inline-block bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, hsl(142 71% 45%), hsl(142 70% 60%))" }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Wins.
          </motion.span>
        </h2>
        <p className="mb-[30px] max-w-[1320px] text-[25px] text-gray-500">
          Four reasons the combined system creates faster, cleaner, and more scalable growth across every Epic location.
        </p>
      </RevealElement>

      <div className="grid flex-1 min-h-0 grid-cols-2 gap-[36px]">
        {sections.map((section, index) => (
          <RevealElement
            key={section.title}
            step={index + 1}
            currentStep={step}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <GlassCard
              className="flex h-full flex-col p-[32px] rounded-[24px]"
              glow
              style={{
                background: cardSurface,
                border: `1px solid ${cardBorder}`,
                boxShadow: "0 20px 60px hsl(222 47% 8% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.88)",
              }}
            >
              <div className="mb-[22px] flex items-center gap-[16px]">
                <motion.div
                  className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] border"
                  style={{ background: "hsl(142 71% 45% / 0.12)", borderColor: "hsl(142 71% 45% / 0.22)" }}
                  animate={step >= index + 1 ? { boxShadow: ["0 0 0px hsl(142 71% 45% / 0)", "0 0 32px hsl(142 71% 45% / 0.22)", "0 0 0px hsl(142 71% 45% / 0)"] } : {}}
                  transition={{ duration: 2.3, repeat: Infinity }}
                >
                  <section.icon size={28} style={{ color: accent }} />
                </motion.div>
                <div>
                  <p className="mb-[4px] text-[13px] uppercase tracking-[3px]" style={{ color: "hsl(220 16% 55%)" }}>{section.kicker}</p>
                  <h3 className="text-[30px] font-bold leading-[1.02]" style={{ color: cardTitle }}>{section.title}</h3>
                </div>
              </div>

              <div className="mt-[4px] flex flex-1 flex-col gap-[20px]">
                {section.bullets.map((bullet) => (
                  <BulletRow key={bullet} text={bullet} />
                ))}
              </div>
            </GlassCard>
          </RevealElement>
        ))}
      </div>
    </div>
  </SlideLayout>
);
