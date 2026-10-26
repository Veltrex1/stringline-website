"use client";

import { useEffect } from "react";

// Section entrances: content renders visible; only once this runs does it hide and rise in.
export function RevealRoot() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("js-reveal");

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of items) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.setAttribute("data-shown", "");
      else io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return null;
}
