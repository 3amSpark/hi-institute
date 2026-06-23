import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type RevealDirection = "ltr" | "rtl" | "tb" | "bt";

type RevealSlidesProps = {
  colors?: string[];
  direction?: RevealDirection;
  duration?: number;
};

const finalClipStates: Record<RevealDirection, string> = {
  ltr: "inset(0 0 0 100%)",
  rtl: "inset(0 100% 0 0)",
  tb: "inset(100% 0 0 0)",
  bt: "inset(0 0 100% 0)",
};

const defaultColors = ["bg-brand-blue", "bg-brand-green", "bg-neutral-100"];

export default function RevealSlides({
  colors = defaultColors,
  direction = "ltr",
  duration = 1,
}: RevealSlidesProps) {
  const reduceMotion = useReducedMotion();
  const [isComplete, setIsComplete] = useState(false);

  if (reduceMotion || isComplete) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999]"
    >
      {colors.map((color, index) => (
        <motion.div
          key={`${color}-${index}`}
          className={`fixed inset-0 ${color}`}
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: finalClipStates[direction] }}
          transition={{
            duration,
            delay: index * 0.075,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            zIndex: colors.length - index,
            willChange: "clip-path",
          }}
          onAnimationComplete={() => {
            if (index === colors.length - 1) setIsComplete(true);
          }}
        />
      ))}
    </div>
  );
}
