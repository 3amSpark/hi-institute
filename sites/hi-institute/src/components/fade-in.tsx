import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInElement = "div" | "h1" | "p";

type FadeInProps = {
  as?: FadeInElement;
  children: ReactNode;
  className?: string;
  delay?: number;
};

const fadeInComponents = {
  div: motion.div,
  h1: motion.h1,
  p: motion.p,
};

const fadeTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
} as const;

export default function FadeIn({
  as,
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const Component = fadeInComponents[as ?? "div"];

  return (
    <Component
      className={className}
      initial={
        reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(6px)" }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={reduceMotion ? { duration: 0 } : { ...fadeTransition, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
