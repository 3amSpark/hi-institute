import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function FounderImageReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

  const textScale = useSpring(
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.8, 1]),
    { stiffness: 300, damping: 30, bounce: 0 },
  );

  const imageScale = useSpring(
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.65, 1]),
    { stiffness: 300, damping: 30, bounce: 0 },
  );

  return (
    <div ref={ref} className="sticky top-0 h-svh overflow-hidden">
      <motion.img
        src="/assets/images/home/founder/feel-better-than-ever.webp"
        alt="Dr. Herbert Maradiaga"
        className="absolute inset-x-0 h-full w-full object-cover object-center"
        loading="lazy"
        style={{ scale: textScale }}
      />
      <motion.div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20" />

      <motion.h2
        className="text-massive absolute inset-x-4 top-1/2 -translate-y-1/2 text-center font-black tracking-widest text-balance text-white uppercase md:top-1/2"
        style={{ scale: textScale }}
      >
        Feel Better Than Ever
      </motion.h2>
    </div>
  );
}
