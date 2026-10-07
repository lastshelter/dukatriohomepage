"use client";

import { useEffect } from "react";

/**
 * Mounts once on the landing page and progressively enhances the DOM:
 *  - Below-the-fold <section> elements fade/slide in when scrolled into view.
 *  - Children of any `[data-stagger]` grid reveal with a cascading delay.
 *  - Elements with `.spotlight-card` receive a cursor-tracking radial glow.
 *
 * Above-the-fold content is never hidden (no flash, no SEO/LCP impact), the
 * effect is skipped entirely for `prefers-reduced-motion`, and all temporary
 * classes are removed after the animation so hover physics stay untouched.
 */
export default function ScrollEffects(): null {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // ---- Cursor spotlight (fine pointers only) ----
    if (window.matchMedia("(pointer: fine)").matches) {
      const onMove = (e: MouseEvent) => {
        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spotlight-card");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        target.style.setProperty("--my", `${e.clientY - rect.top}px`);
      };
      document.addEventListener("mousemove", onMove, { passive: true });
      cleanups.push(() => document.removeEventListener("mousemove", onMove));
    }

    // ---- Scroll reveal ----
    if (!reduceMotion && "IntersectionObserver" in window) {
      const viewportH = window.innerHeight;
      const targets: Array<{ el: HTMLElement; delay: number }> = [];

      document.querySelectorAll<HTMLElement>("section").forEach((el) => {
        if (el.closest("form")) return;
        if (el.getBoundingClientRect().top > viewportH * 0.92) targets.push({ el, delay: 0 });
      });

      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
          const el = child as HTMLElement;
          if (el.getBoundingClientRect().top > viewportH * 0.92) {
            targets.push({ el, delay: Math.min(i, 5) * 90 });
          }
        });
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            observer.unobserve(el);
            el.classList.remove("reveal-pending");
            el.classList.add("reveal-run");
            const done = () => {
              el.classList.remove("reveal-run");
              el.style.removeProperty("--reveal-delay");
            };
            el.addEventListener("animationend", done, { once: true });
          });
        },
        { threshold: 0, rootMargin: "0px 0px -8% 0px" }
      );

      targets.forEach(({ el, delay }) => {
        el.style.setProperty("--reveal-delay", `${delay}ms`);
        el.classList.add("reveal-pending");
        observer.observe(el);
      });

      cleanups.push(() => {
        observer.disconnect();
        targets.forEach(({ el }) => {
          el.classList.remove("reveal-pending", "reveal-run");
          el.style.removeProperty("--reveal-delay");
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
