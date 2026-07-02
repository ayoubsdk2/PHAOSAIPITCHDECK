import { useEffect } from "react";

interface HeadOptions {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown> | null;
  noindex?: boolean;
}

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ID = "page-jsonld";
const ROBOTS_SELECTOR = `meta[name="robots"]`;

export function useDocumentHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogType = "website",
  jsonLd = null,
  noindex = false,
}: HeadOptions) {
  useEffect(() => {
    document.title = title;
    setMeta(`meta[name="description"]`, "name", "description", description);
    setLink("canonical", canonical);
    setMeta(`meta[property="og:title"]`, "property", "og:title", ogTitle ?? title);
    setMeta(`meta[property="og:description"]`, "property", "og:description", ogDescription ?? description);
    setMeta(`meta[property="og:url"]`, "property", "og:url", canonical);
    setMeta(`meta[property="og:type"]`, "property", "og:type", ogType);

    // robots
    const existingRobots = document.head.querySelector<HTMLMetaElement>(ROBOTS_SELECTOR);
    if (noindex) {
      setMeta(ROBOTS_SELECTOR, "name", "robots", "noindex, nofollow");
    } else if (existingRobots) {
      existingRobots.remove();
    }

    // JSON-LD
    const existing = document.getElementById(JSON_LD_ID);
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSON_LD_ID;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById(JSON_LD_ID);
      if (s) s.remove();
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogType, jsonLd, noindex]);
}
