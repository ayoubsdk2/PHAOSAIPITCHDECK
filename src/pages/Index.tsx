import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PresentationApp } from "@/components/presentation/PresentationApp";
import { StandardDeckView } from "@/components/presentation/StandardDeckView";
import { TelemetryTracker } from "@/components/presentation/TelemetryTracker";
import { startSession, type SessionHandle } from "@/lib/telemetry";
import { useDocumentHead } from "@/lib/useDocumentHead";

const ROOT_SLUG = "_root";

const Index = () => {
  const [session, setSession] = useState<SessionHandle | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const presentMode = searchParams.get("mode") === "present";

  useDocumentHead({
    title: "Phaos AI Pitch Deck — Autonomous Voice Agents",
    description:
      "Pre-seed investment overview for Phaos AI: autonomous voice agents and agentic workflow automation for the printing industry.",
    canonical: "https://pitch-deck.phaosai.com/",
  });

  useEffect(() => {
    (async () => {
      const s = await startSession(ROOT_SLUG);
      if (s) setSession(s);
    })();
  }, []);

  const enterPresentation = () => {
    setSearchParams({ mode: "present" });
  };
  const exitPresentation = () => {
    setSearchParams({});
  };

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
      {session && <TelemetryTracker session={session} currentSlide={currentSlide} />}
    </>
  );
};

export default Index;
