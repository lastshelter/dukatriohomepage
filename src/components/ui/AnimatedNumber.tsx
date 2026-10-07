"use client";

import React, { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const fmt = (n: number): string => Math.round(n).toLocaleString("en-US");

/**
 * Renders a number that smoothly rolls from its previous value to the next.
 * The text node is written imperatively (React renders only the initial value),
 * so re-renders never cause a flash back to the final number mid-animation.
 */
export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 0.9,
  className,
}: AnimatedNumberProps): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const initial = useRef(value).current;
  const latest = useRef(value);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduceMotion || latest.current === value) {
      latest.current = value;
      node.textContent = `${prefix}${fmt(value)}${suffix}`;
      return;
    }

    const controls = animate(latest.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        latest.current = v;
        node.textContent = `${prefix}${fmt(v)}${suffix}`;
      },
      onComplete: () => {
        latest.current = value;
        node.textContent = `${prefix}${fmt(value)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [value, prefix, suffix, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${fmt(initial)}${suffix}`}
    </span>
  );
}
