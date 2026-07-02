import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PresentationApp } from "@/components/presentation/PresentationApp";
import { StandardDeckView } from "@/components/presentation/StandardDeckView";
import { TelemetryTracker } from "@/components/presentation/TelemetryTracker";
import { startSession, type SessionHandle } from "@/lib/telemetry";
import { useDocumentHead } from "@/lib/useDocumentHead";

const RESERVED = new Set(["admin"]);

export default function ProspectDeck() {
  const { prefix } = useParams<{ prefix: string }>();
  const [session, setSession] = useState<SessionHandle | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const presentMode = searchParams.get("mode") === "present";

  useDocumentHead({
    title: `Phaos AI Pitch Deck for ${prefix ?? "Prospect"}`,
    description:
      "Personalized Phaos AI pre-seed pitch deck: autonomous voice agents and agentic workflow automation for the printing industry.",
    canonical: `https://pitch-deck.phaosai.com/${prefix ?? ""}`,
    noindex: true,
  });

  useEffect(() => {
    if (!prefix || RESERVED.has(prefix)) {
      setNotFound(true);
      return;
    }
    (async () => {
      const s = await startSession(prefix);
      if (!s) setNotFound(true);
      else setSession(s);
    })();
  }, [prefix]);

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Link not found.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading…</p>
      </div>
    );
  }

  const enterPresentation = () => setSearchParams({ mode: "present" });
  const exitPresentation = () => setSearchParams({});

  return (
    <>
      {presentMode ? (
        <PresentationApp
          onSlideChange={setCurrentSlide}
          session={session}
          onExitToStandard={exitPresentation}
          autoLive
        />
      ) : (
        <StandardDeckView
          onEnterPresentation={enterPresentation}
          onSlideChange={setCurrentSlide}
          session={session}
        />
      )}
      <TelemetryTracker session={session} currentSlide={currentSlide} />
    </>
  );
}
