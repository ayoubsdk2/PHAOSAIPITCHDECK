import { createRoot, type Root } from "react-dom/client";
import { flushSync } from "react-dom";
import html2canvas from "html2canvas";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import React from "react";

const SLIDE_W = 1920;
const SLIDE_H = 1080;
const EXPORT_SCALE = 2;

type ExportImageFormat = "png" | "jpeg";

interface BuildPresentationPdfOptions {
  imageFormat?: ExportImageFormat;
  jpegQuality?: number;
}

function gradientFallbackColor(style: CSSStyleDeclaration) {
  const bg = `${style.backgroundImage} ${style.background}`.toLowerCase();
  if (bg.includes("d4b25a") || bg.includes("f0d78c") || bg.includes("212, 178, 90")) return "#F0D78C";
  if (bg.includes("ffffff") || bg.includes("255, 255, 255")) return "#EDE7FF";
  return "#B987FF";
}

function neutralizeUnsupportedTextClips(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    const style = getComputedStyle(el);
    const clipsText = style.backgroundClip === "text" || style.webkitBackgroundClip === "text";
    const transparentText = style.color === "rgba(0, 0, 0, 0)" || style.webkitTextFillColor === "rgba(0, 0, 0, 0)";
    if (!clipsText && !transparentText) return;

    const color = gradientFallbackColor(style);
    el.style.backgroundImage = "none";
    el.style.webkitBackgroundClip = "initial";
    el.style.backgroundClip = "initial";
    el.style.color = color;
    el.style.webkitTextFillColor = color;
  });
}

function cloneForSafeCanvasCapture(mount: HTMLElement) {
  const clone = mount.cloneNode(true) as HTMLElement;
  clone.style.width = `${SLIDE_W}px`;
  clone.style.height = `${SLIDE_H}px`;
  clone.style.position = "relative";
  clone.style.overflow = "hidden";
  neutralizeUnsupportedTextClips(clone);
  return clone;
}

async function captureSlideImage(
  mount: HTMLElement,
  format: ExportImageFormat,
  jpegQuality: number
) {
  try {
    const shared = {
      pixelRatio: EXPORT_SCALE,
      width: SLIDE_W,
      height: SLIDE_H,
      canvasWidth: SLIDE_W * EXPORT_SCALE,
      canvasHeight: SLIDE_H * EXPORT_SCALE,
      backgroundColor: "#0a0e17",
      cacheBust: true,
    };

    return format === "png"
      ? await toPng(mount, shared)
      : await toJpeg(mount, { ...shared, quality: jpegQuality });
  } catch {
    const fallback = cloneForSafeCanvasCapture(mount);
    document.body.appendChild(fallback);
    fallback.style.position = "fixed";
    fallback.style.left = "0";
    fallback.style.top = "0";
    fallback.style.zIndex = "-1";
    try {
      const canvas = await html2canvas(fallback, {
        backgroundColor: "#0a0e17",
        scale: EXPORT_SCALE,
        width: SLIDE_W,
        height: SLIDE_H,
        windowWidth: SLIDE_W,
        windowHeight: SLIDE_H,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 15000,
        onclone: (_doc, clonedElement) => neutralizeUnsupportedTextClips(clonedElement),
      });
      return format === "png" ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", jpegQuality);
    } finally {
      fallback.remove();
    }
  }
}

async function waitForSlideReady(mount: HTMLElement) {
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await (document as any).fonts?.ready?.catch?.(() => undefined);

  const images = Array.from(mount.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });
    })
  );

  await new Promise((r) => setTimeout(r, 1200));
}

/**
 * Renders each slide into a hidden 1920x1080 container, snapshots it,
 * and builds a multi-page landscape PDF (one page per slide).
 */
export async function buildPresentationPdf(
  slides: Array<() => React.ReactNode>,
  onProgress?: (done: number, total: number) => void,
  options: BuildPresentationPdfOptions = {}
): Promise<Blob> {
  const previousExportFlag = (window as any).__PHAOS_EXPORTING__;
  (window as any).__PHAOS_EXPORTING__ = true;

  const imageFormat = options.imageFormat ?? "png";
  const jpegQuality = options.jpegQuality ?? 0.96;

  // Hidden render host. It stays at the exact slide dimensions so capture math
  // matches the live 1920x1080 slide instead of Chrome print pagination.
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "0";
  host.style.top = "0";
  host.style.width = `${SLIDE_W}px`;
  host.style.height = `${SLIDE_H}px`;
  host.style.background = "#0a0e17";
  host.style.zIndex = "-9999";
  host.style.pointerEvents = "none";
  host.style.overflow = "hidden";
  document.body.appendChild(host);

  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [SLIDE_W, SLIDE_H] });

  let root: Root | null = null;
  try {
    for (let i = 0; i < slides.length; i++) {
      // Fresh mount per slide for clean reveal state
      const mount = document.createElement("div");
      mount.style.width = `${SLIDE_W}px`;
      mount.style.height = `${SLIDE_H}px`;
      mount.style.position = "relative";
      mount.style.overflow = "hidden";
      host.innerHTML = "";
      host.appendChild(mount);

      root = createRoot(mount);
      flushSync(() => {
        root?.render(slides[i]() as any);
      });

      await waitForSlideReady(mount);

      const dataUrl = await captureSlideImage(mount, imageFormat, jpegQuality);
      if (i > 0) pdf.addPage([SLIDE_W, SLIDE_H], "landscape");
      pdf.addImage(dataUrl, imageFormat === "png" ? "PNG" : "JPEG", 0, 0, SLIDE_W, SLIDE_H, undefined, "SLOW");

      root.unmount();
      root = null;

      onProgress?.(i + 1, slides.length);
    }
  } finally {
    try { root?.unmount(); } catch { /* noop */ }
    host.remove();
    (window as any).__PHAOS_EXPORTING__ = previousExportFlag;
  }

  return pdf.output("blob");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // strip data URL prefix
      const idx = result.indexOf(",");
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
