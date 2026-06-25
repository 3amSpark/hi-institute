import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type FadeInElement = "div" | "h1" | "h2" | "h3" | "p" | "li";

type FadeInProps = {
  as?: FadeInElement;
  children: ReactNode;
  className?: string;
  delay?: number;
  mobileDelay?: number;
  instant?: boolean;
  disableBlur?: boolean;
  amount?: number;
};

const fadeInComponents = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  li: motion.li,
};

const fadeTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94],
} as const;

export default function FadeIn({
  as,
  children,
  className,
  delay = 0,
  mobileDelay,
  amount = 0.6,
  instant = false,
  disableBlur = false,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(min-width: 1024px)").matches,
  );
  const Component = fadeInComponents[as ?? "div"];
  const resolvedDelay = isDesktop ? delay : (mobileDelay ?? delay);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateIsDesktop = () => setIsDesktop(desktopQuery.matches);

    updateIsDesktop();
    desktopQuery.addEventListener("change", updateIsDesktop);

    return () => desktopQuery.removeEventListener("change", updateIsDesktop);
  }, []);

  if (instant === true) {
    return (
      <Component
        className={className}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 24,
              }
        }
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { ...fadeTransition, delay: resolvedDelay }
        }
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: amount, margin: "0px 0px -10% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { ...fadeTransition, delay: resolvedDelay }
      }
      {...props}
    >
      {children}
    </Component>
  );
}
