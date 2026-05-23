import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

type ScrollUnderlineProps = {
  children: ReactNode;
};

export default function ScrollUnderline({ children }: ScrollUnderlineProps) {
  const targetRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 85%", "end 45%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <span ref={targetRef} className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="from-brand-blue to-brand-green absolute top-7/8 left-0 z-0 mt-1 h-1 w-full origin-left skew-x-6 bg-black bg-linear-to-r"
        style={{ scaleX: reduceMotion ? 1 : scaleX }}
      />
    </span>
  );
}
