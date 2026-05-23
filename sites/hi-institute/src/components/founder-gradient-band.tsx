import { motion, useReducedMotion } from "framer-motion";

export default function FounderGradientBand() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 h-56 w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:h-60"
    >
      <motion.div
        className="from-brand-green to-brand-blue h-full w-full origin-left bg-linear-to-r"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -50% 0px" }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 2.5, ease: [0.22, 1, 0.36, 1] }
        }
      />
    </div>
  );
}
