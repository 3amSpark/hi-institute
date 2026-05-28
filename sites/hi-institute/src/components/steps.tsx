import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import FadeIn from "./fade-in";

const steps = [
  {
    src: "/assets/pasos/1.webp",
    number: "1",
    title: "Evaluaci\u00f3n Completa",
    description: "Hormonas, metabolismo, estilo de vida.",
    color: "#707070",
  },
  {
    src: "/assets/pasos/2.webp",
    number: "2",
    title: "Plan Personalizado",
    description:
      "Alimentaci\u00f3n, suplementaci\u00f3n, tratamiento m\u00e9dico.",
    color: "#1d75b8",
  },
  {
    src: "/assets/pasos/3.webp",
    number: "3",
    title: "Recuperaci\u00f3n Progresiva",
    description: "Empiezas a sentir cambios reales.",
    color: "#97CC43",
  },
];

const imageTransition = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1],
} as const;

function StepPanel({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <article
      className={`group relative grid min-w-0 grid-rows-[auto_auto] overflow-hidden md:row-span-2 md:grid-rows-subgrid`}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={step.src}
          alt={step.title}
          className={`w-full object-cover object-[0_20%] sm:h-52 md:object-center lg:h-full`}
          loading="lazy"
          initial={reduceMotion ? false : { opacity: 0.55, scale: 1.06 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -50% 0px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { ...imageTransition, delay: index * 0.16 }
          }
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ backgroundColor: step.color }}
          initial={reduceMotion ? false : { x: "0%" }}
          whileInView={reduceMotion ? { x: "100%" } : { x: "100%" }}
          viewport={{ once: true, margin: "0px 0px -50% 0px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { ...imageTransition, delay: index * 0.2 }
          }
        />
      </div>

      <div
        className="relative grid grid-rows-[auto_auto_auto_1fr] content-start bg-white md:px-0 md:pt-2 md:pb-0"
        style={{ "--panel-color": step.color } as CSSProperties}
      >
        <FadeIn delay={index * 0.125} amount={0.1}>
          <div className="flex items-start gap-2">
            <span className="relative z-10 bg-white text-(length:--step-7) leading-none font-black tracking-wide text-(--panel-color) uppercase">
              0{step.number}
            </span>
            <div className="flex h-full min-w-0 flex-col justify-between">
              <h3 className="relative text-(length:--step-1)/9 font-medium tracking-tighter">
                {step.title}
              </h3>
              <p className="max-w-64 text-base text-pretty text-neutral-500">
                {step.description}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}

export default function Steps() {
  return (
    <section className="max-w-desktop relative mx-auto w-full overflow-hidden pb-25">
      <FadeIn>
        <motion.h2 className="pb-25 text-left text-(length:--step-4) font-semibold tracking-tighter text-neutral-700 md:text-(length:--step-5)">
          As&iacute; empieza <span className="text-brand-blue">tu cambio</span>
        </motion.h2>
      </FadeIn>

      <div className="grid min-w-0 grid-cols-1 bg-white md:max-h-[65dvh] md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_auto] md:gap-x-6">
        {steps.map((step, i) => (
          <StepPanel key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
