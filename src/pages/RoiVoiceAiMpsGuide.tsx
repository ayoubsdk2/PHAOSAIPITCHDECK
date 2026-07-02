import { Link } from "react-router-dom";
import { useDocumentHead } from "@/lib/useDocumentHead";

export default function RoiVoiceAiMpsGuide() {
  useDocumentHead({
    title: "ROI of Voice AI in Managed Print Services — Phaos AI Guide",
    description:
      "How autonomous voice agents drive managed print services automation, MPS operational efficiency, and measurable ROI for dealers, OEMs, and leasing partners.",
    canonical: "https://pitch-deck.phaosai.com/guides/roi-voice-ai-mps",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "ROI of Voice AI in Managed Print Services",
      description:
        "A practical playbook on managed print services automation, MPS operational efficiency, and the unit economics of autonomous voice agents.",
      author: { "@type": "Organization", name: "Phaos AI" },
      publisher: { "@type": "Organization", name: "Phaos AI" },
      mainEntityOfPage: "https://pitch-deck.phaosai.com/guides/roi-voice-ai-mps",
    },
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Guides</span>
          <span className="mx-2">/</span>
          <span aria-current="page">ROI of Voice AI in MPS</span>
        </nav>

        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Phaos AI · Industry Guide</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            ROI of Voice AI in Managed Print Services
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            A practical playbook on managed print services automation, MPS operational efficiency,
            and the unit economics of autonomous voice agents for dealers, OEMs, and leasing partners.
          </p>
        </header>

        <section className="prose prose-invert max-w-none space-y-6">
          <h2 className="text-2xl font-bold">Why voice is the missing automation layer in MPS</h2>
          <p>
            Managed print services run on phone calls — supply requests, service dispatch,
            meter reads, lease inquiries, escalations. Legacy ERPs like eAutomate, Printanista,
            and SalesChain only capture what a human types after the fact. The call itself —
            and the operational signal inside it — is lost. Voice AI closes that gap by
            answering, transacting, and writing structured data back into the ERP in real time.
          </p>

          <h2 className="text-2xl font-bold">Where the ROI shows up</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Labor displacement:</strong> Inbound supply, dispatch, and meter calls
              handled by autonomous voice agents at a fraction of a CSR's loaded cost.
            </li>
            <li>
              <strong>Faster resolution:</strong> Sub-minute answer times and zero hold queues
              translate into higher SLA attainment and lower churn on managed accounts.
            </li>
            <li>
              <strong>Cleaner data:</strong> Every call writes structured fields to the ERP, so
              billing, contract compliance, and supplier reorders stop relying on transcription.
            </li>
            <li>
              <strong>New revenue from telemetry:</strong> Anonymized failure and displacement
              signals become a licensable dataset for OEMs, suppliers, and leasing partners.
            </li>
          </ul>

          <h2 className="text-2xl font-bold">A worked example</h2>
          <p>
            A mid-market dealer running 6,000 contracted devices typically fields 1,200–1,800
            inbound calls per month across supply, service, and meter reads. Replacing 70% of
            that volume with a deeply integrated voice agent — one that authenticates the
            caller, resolves the request, and posts the transaction back to the ERP — recovers
            roughly 2–3 full CSR FTEs while improving response times and first-call resolution.
          </p>

          <h2 className="text-2xl font-bold">What "deeply integrated" actually means</h2>
          <p>
            The ROI only materializes when the voice agent is wired into the ERP write path —
            not bolted on as a front-end IVR. That means authenticated lookups against the
            customer of record, contract-aware pricing and supply limits, and structured event
            writes that trigger downstream dispatch, billing, and replenishment workflows.
          </p>

          <h2 className="text-2xl font-bold">Where Phaos AI fits</h2>
          <p>
            Phaos AI deploys autonomous voice agents engineered specifically for the document
            solutions and printing industry, with native integrations into eAutomate,
            Printanista, and SalesChain. The full investment thesis, market sizing, and
            unit economics are in the <Link to="/" className="underline text-primary">Phaos AI pitch deck</Link>.
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
          <p>
            Targeting <em>managed print services automation</em>, <em>MPS operational efficiency</em>,
            and <em>voice AI ROI</em> as the primary search intents for industry decision-makers.
          </p>
        </footer>
      </article>
    </main>
  );
}
