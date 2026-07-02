import { useParams } from "react-router-dom";
import { useDocumentHead } from "@/lib/useDocumentHead";
import { printReadySlideAssets } from "@/lib/printReadyDeck";

export default function PrintDeck() {
  const { prefix } = useParams<{ prefix?: string }>();

  (window as any).__PHAOS_EXPORTING__ = true;

  useDocumentHead({
    title: "Phaos AI Pitch Deck PDF Export",
    description: "Print-ready Phaos AI pitch deck export with one slide per page.",
    canonical: `https://pitch-deck.phaosai.com/${prefix ? `${prefix}/` : ""}export`,
    noindex: true,
  });

  return (
    <main className="print-deck" aria-label="Phaos AI print-ready pitch deck">
      <style>{`
        html, body, #root { margin: 0; min-height: 100%; background: #07040f; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print-deck { background: #07040f; }
        .print-slide { width: 1920px; height: 1080px; overflow: hidden; page-break-after: always; break-after: page; }
        .print-slide img { display: block; width: 1920px; height: 1080px; object-fit: cover; }
        .print-slide:last-child { page-break-after: auto; break-after: auto; }
        @page { size: 1920px 1080px; margin: 0; }
        @media screen { .print-slide { margin: 0 auto 24px; box-shadow: 0 24px 80px rgba(0,0,0,.35); } }
        @media print { .print-slide { margin: 0; box-shadow: none; } }
      `}</style>
      {printReadySlideAssets.map((slide, index) => (
        <section className="print-slide" key={index}>
          <img src={slide.url} alt={`Phaos AI pitch deck slide ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
        </section>
      ))}
    </main>
  );
}