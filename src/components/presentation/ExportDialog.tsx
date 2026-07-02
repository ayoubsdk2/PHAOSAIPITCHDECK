import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logInteraction, type SessionHandle } from "@/lib/telemetry";
import { absoluteAssetUrl, downloadAsset, printReadyPdfAsset } from "@/lib/printReadyDeck";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  slideFactories: Array<() => React.ReactNode>;
  filename?: string;
  session?: SessionHandle | null;
}

type Mode = "download" | "email";

const getPrintExportUrl = () => {
  return absoluteAssetUrl(printReadyPdfAsset.url);
};

const getInvokeErrorMessage = async (error: any) => {
  const response = error?.context;
  if (response instanceof Response) {
    const text = await response.text().catch(() => "");
    try {
      const json = JSON.parse(text);
      return json?.error || json?.message || error.message;
    } catch {
      return text || error.message;
    }
  }
  return error?.message ?? "Email failed";
};

export const ExportDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  slideFactories,
  filename = "phaos-pitch-deck.pdf",
  session,
}) => {
  const [mode, setMode] = useState<Mode>("download");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const track = async (action: string, metadata: Record<string, unknown> = {}) => {
    if (!session) return;
    try { await logInteraction(session, action, metadata); } catch { /* noop */ }
  };

  const handleExport = async () => {
    if (mode === "email") {
      if (!session) {
        toast({ title: "Email is still loading", description: "Please try again in a moment.", variant: "destructive" });
        return;
      }
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!ok) {
        toast({ title: "Enter a valid email address", variant: "destructive" });
        return;
      }
    }
    setBusy(true);
    setProgress(null);
    await track("export_started", { mode, slideCount: slideFactories.length });

    try {
      if (mode === "download") {
        downloadAsset(printReadyPdfAsset.url, filename);
        await track("export_downloaded", { filename, method: "pre_rendered_print_ready_pdf" });
        toast({ title: "PDF downloaded", description: "Using the verified print-ready deck render." });
        onOpenChange(false);
      } else {
        setProgress(null);
        const recipient = email.trim();
        const { error } = await supabase.functions.invoke("send-presentation-pdf", {
          body: {
            to: recipient,
            filename,
            exportUrl: getPrintExportUrl(),
            session_id: session?.sessionId,
            update_token: session?.token,
          },
        });
        if (error) throw new Error(await getInvokeErrorMessage(error));
        toast({ title: "Email sent", description: `Sent to ${recipient}` });
        onOpenChange(false);
      }
    } catch (e: any) {
      await track("export_failed", { mode, error: String(e?.message ?? e) });
      toast({
        title: "Export failed",
        description: e?.message ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export presentation</DialogTitle>
          <DialogDescription>
            One PDF page per slide. Choose where to send it.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={mode === "download" ? "default" : "outline"}
            onClick={() => setMode("download")}
            disabled={busy}
          >
            DOWNLOAD
          </Button>
          <Button
            type="button"
            variant={mode === "email" ? "default" : "outline"}
            onClick={() => setMode("email")}
            disabled={busy}
          >
            EMAIL
          </Button>
        </div>

        {mode === "email" && (
          <div className="space-y-2">
            <Label htmlFor="export-email">Recipient email</Label>
            <Input
              id="export-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={busy}
            />
          </div>
        )}

        {progress && (
          <p className="text-sm text-muted-foreground">
            Rendering slide {progress.done} / {progress.total}…
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={busy}>
            {busy ? "Exporting…" : mode === "download" ? "DOWNLOAD" : "EMAIL"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
