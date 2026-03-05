import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://mathhub.me";

export function useCanonical(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${pathname}`;

    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    link.setAttribute("href", canonicalUrl);
  }, [pathname]);
}
