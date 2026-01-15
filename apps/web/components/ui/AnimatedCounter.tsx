"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  delay?: number;
};

const AnimatedCounter = ({
  value,
  duration = 2,
  suffix = "",
  decimals = 0,
  delay = 0,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      const delayTimeout = setTimeout(() => {
        const startTime = performance.now();
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);

          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * value;

          setDisplayValue(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
          }
        };

        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(delayTimeout);
    }
  }, [isInView, value, duration, delay]);

  const formattedValue =
    decimals > 0
      ? displayValue.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(displayValue).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {formattedValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
