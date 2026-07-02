import { Phaos01Title } from "@/components/presentation/slides/Phaos01Title";
import { Phaos02BlueOcean } from "@/components/presentation/slides/Phaos02BlueOcean";
import { Phaos03Bottleneck } from "@/components/presentation/slides/Phaos03Bottleneck";
import { Phaos04Engine } from "@/components/presentation/slides/Phaos04Engine";
import { Phaos05Moat } from "@/components/presentation/slides/Phaos05Moat";
import { Phaos07MacroMarket } from "@/components/presentation/slides/Phaos07MacroMarket";
import { Phaos08MarketSizing } from "@/components/presentation/slides/Phaos08MarketSizing";
import { Phaos09TAM } from "@/components/presentation/slides/Phaos09TAM";
import { Phaos10Monetization } from "@/components/presentation/slides/Phaos10Monetization";
import { Phaos11Validation } from "@/components/presentation/slides/Phaos11Validation";
import { Phaos13Founder } from "@/components/presentation/slides/Phaos13Founder";
import { Phaos14ThankYou } from "@/components/presentation/slides/Phaos14ThankYou";
import { useDocumentHead } from "@/lib/useDocumentHead";

const slides = [
  Phaos01Title,
  Phaos02BlueOcean,
  Phaos03Bottleneck,
  Phaos04Engine,
  Phaos05Moat,
  Phaos07MacroMarket,
  Phaos08MarketSizing,
  Phaos09TAM,
  Phaos10Monetization,
  Phaos11Validation,
  Phaos13Founder,
  Phaos14ThankYou,
];

export default function RenderDeck() {
  (window as any).__PHAOS_EXPORTING__ = true;

  useDocumentHead({
    title: "Phaos AI Deck Render",
    description: "Internal print-render view for the Phaos AI pitch deck.",
    canonical: `${window.location.origin}/render-deck`,
    noindex: true,
  });

  const params = new URLSearchParams(window.location.search);
  const index = Math.max(0, Math.min(slides.length - 1, Number(params.get("slide") ?? 0)));
  const Slide = slides[index];

  return (
    <main className="fixed inset-0 overflow-hidden bg-background" aria-label="Phaos AI export render">
      <div id="export-slide" data-slide-count={slides.length} style={{ width: 1920, height: 1080, overflow: "hidden" }}>
        <Slide step={999} />
      </div>
    </main>
  );
}