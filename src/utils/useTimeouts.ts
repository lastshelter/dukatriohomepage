import { useCallback, useEffect, useRef } from "react";

/**
 * Tracks setTimeout handles so staged UI animations can be cancelled
 * (on restart) and are always cleaned up on unmount.
 */
export function useTimeouts(): {
  schedule: (fn: () => void, ms: number) => void;
  clear: () => void;
} {
  const ids = useRef<number[]>([]);

  useEffect(() => {
    const list = ids.current;
    return () => {
      list.forEach((id) => window.clearTimeout(id));
      list.length = 0;
    };
  }, []);

  const clear = useCallback(() => {
    ids.current.forEach((id) => window.clearTimeout(id));
    ids.current.length = 0;
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    ids.current.push(window.setTimeout(fn, ms));
  }, []);

  return { schedule, clear };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
