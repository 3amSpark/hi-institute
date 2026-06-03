import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { image } from "framer-motion/m";
import { useRef } from "react";

export default function FounderIntroStickyImage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0.15, 1],
    reduceMotion ? [1, 1] : [0.55, 1],
  );

  const textScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.65, 1],
  );

  return (
    <div ref={ref} className="sticky top-0 h-svh overflow-hidden">
      <motion.img
        src="/feel-better-than-ever.png"
        alt="Dr. Herbert Maradiaga"
        className="h-full w-full object-cover object-center"
        loading="lazy"
        style={{ scale: imageScale, y: scrollYProgress }}
      />
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-transparent to-black/20"
        style={{ scale: imageScale }}
      />

      <motion.h2
        className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-(length:--step-6)/15 font-black tracking-widest text-balance text-white uppercase md:top-1/2 md:text-(length:--step-7)/20"
        style={{ scale: textScale }}
      >
        Feel Better Than Ever
      </motion.h2>
    </div>
  );
}
