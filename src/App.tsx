import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ProspectDeck from "./pages/ProspectDeck.tsx";
import PrintDeck from "./pages/PrintDeck.tsx";
import RenderDeck from "./pages/RenderDeck.tsx";
import RoiVoiceAiMpsGuide from "./pages/RoiVoiceAiMpsGuide.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/export" element={<PrintDeck />} />
          <Route path="/render-deck" element={<RenderDeck />} />
          <Route path="/guides/roi-voice-ai-mps" element={<RoiVoiceAiMpsGuide />} />
          <Route path="/:prefix/export" element={<PrintDeck />} />
          <Route path="/:prefix" element={<ProspectDeck />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
