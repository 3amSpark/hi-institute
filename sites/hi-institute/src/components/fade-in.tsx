import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInElement = "div" | "h1" | "h2" | "h3" | "p";

type FadeInProps = {
  as?: FadeInElement;
  children: ReactNode;
  className?: string;
  delay?: number;
  disableBlur?: boolean;
};

const fadeInComponents = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
};

const fadeTransition = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1],
} as const;

export default function FadeIn({
  as,
  children,
  className,
  delay = 0,
  disableBlur = false,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const Component = fadeInComponents[as ?? "div"];

  return (
    <Component
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
              filter: disableBlur ? "blur(0px)" : "blur(6px)",
            }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.6, margin: "0px 0px -10% 0px" }}
      transition={reduceMotion ? { duration: 0 } : { ...fadeTransition, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
