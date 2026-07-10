import { Phaos01Title } from "./slides/Phaos01Title";
import { Phaos02BlueOcean } from "./slides/Phaos02BlueOcean";
import { Phaos03Bottleneck } from "./slides/Phaos03Bottleneck";
import { Phaos04Engine } from "./slides/Phaos04Engine";
import { Phaos05Moat } from "./slides/Phaos05Moat";
import { Phaos06Architecture } from "./slides/Phaos06Architecture";
import { Phaos07MacroMarket } from "./slides/Phaos07MacroMarket";
import { Phaos08MarketSizing } from "./slides/Phaos08MarketSizing";
import { Phaos09TAM } from "./slides/Phaos09TAM";
import { Phaos10Monetization } from "./slides/Phaos10Monetization";
import { Phaos11Validation } from "./slides/Phaos11Validation";
import { Phaos12Ask } from "./slides/Phaos12Ask";
import { Phaos13Founder } from "./slides/Phaos13Founder";
import { Phaos14ThankYou } from "./slides/Phaos14ThankYou";

export interface DeckSlideEntry {
  id: string;
  component: any;
  title: string;
  totalSteps: number;
  fontInvert?: number;
  bgInvert?: number;
}

export const DECK_SLIDES: DeckSlideEntry[] = [
  { id: "title",        component: Phaos01Title,        title: "Title & Executive Summary",  totalSteps: 2  },
  { id: "blue-ocean",   component: Phaos02BlueOcean,    title: "Blue Ocean Opportunity",     totalSteps: 15 },
  { id: "bottleneck",   component: Phaos03Bottleneck,   title: "Operational Bottleneck",     totalSteps: 25 },
  { id: "engine",       component: Phaos04Engine,       title: "Workflow Engine",            totalSteps: 5  },
  { id: "moat",         component: Phaos05Moat,         title: "Integration & Data Moat",    totalSteps: 6  },
  { id: "architecture", component: Phaos06Architecture, title: "Technical Architecture",      totalSteps: 4  },
  { id: "macro",        component: Phaos07MacroMarket,  title: "Macro Market Realities",     totalSteps: 10 },
  { id: "sizing",       component: Phaos08MarketSizing, title: "Financial Architecture",      totalSteps: 14 },
  { id: "tam",          component: Phaos09TAM,          title: "Expansion Roadmap",          totalSteps: 14 },
  { id: "monetization", component: Phaos10Monetization, title: "Data Asset Playbook",        totalSteps: 14 },
  { id: "validation",   component: Phaos11Validation,   title: "Capital Allocation",         totalSteps: 30 },
  { id: "ask",          component: Phaos12Ask,          title: "Traction & The Ask",         totalSteps: 17 },
  { id: "founder",      component: Phaos13Founder,      title: "Leadership & Scaling Team",  totalSteps: 23 },
  { id: "thank-you",    component: Phaos14ThankYou,     title: "Thank You",                  totalSteps: 2  },
];
