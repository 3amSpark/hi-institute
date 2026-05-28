import { motion } from "framer-motion";

const reveal = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)" },
};

export default function FounderGradientBand() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-1/2 right-[calc(50%-50dvw)] left-[calc(50%-50dvw)] h-56 -translate-y-1/2 overflow-hidden lg:h-60"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "0px 0px -50% 0px", once: true }}
    >
      <motion.div
        className="from-brand-green to-brand-blue h-full w-full bg-linear-to-r"
        variants={reveal}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
