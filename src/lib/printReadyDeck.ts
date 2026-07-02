import printReadyPdf from "@/assets/exported-deck/print-ready-pdf.asset.json";
import slide01 from "@/assets/exported-deck/slide-01.png.asset.json";
import slide02 from "@/assets/exported-deck/slide-02.png.asset.json";
import slide03 from "@/assets/exported-deck/slide-03.png.asset.json";
import slide04 from "@/assets/exported-deck/slide-04.png.asset.json";
import slide05 from "@/assets/exported-deck/slide-05.png.asset.json";
import slide06 from "@/assets/exported-deck/slide-06.png.asset.json";
import slide07 from "@/assets/exported-deck/slide-07.png.asset.json";
import slide08 from "@/assets/exported-deck/slide-08.png.asset.json";
import slide09 from "@/assets/exported-deck/slide-09.png.asset.json";
import slide10 from "@/assets/exported-deck/slide-10.png.asset.json";
import slide11 from "@/assets/exported-deck/slide-11.png.asset.json";
import slide12 from "@/assets/exported-deck/slide-12.png.asset.json";

type AssetPointer = { url: string };

export const printReadyPdfAsset = printReadyPdf as AssetPointer;

export const printReadySlideAssets: AssetPointer[] = [
  slide01,
  slide02,
  slide03,
  slide04,
  slide05,
  slide06,
  slide07,
  slide08,
  slide09,
  slide10,
  slide11,
  slide12,
] as AssetPointer[];

export function absoluteAssetUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return `${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;
}

export function downloadAsset(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = absoluteAssetUrl(url);
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}