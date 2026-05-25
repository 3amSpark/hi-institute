import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import FadeIn from "./fade-in";

const steps = [
  {
    src: "/assets/pasos/1.webp",
    number: "1",
    title: "Evaluaci\u00f3n Completa",
    description: "Hormonas, metabolismo, estilo de vida",
    color: "black",
  },
  {
    src: "/assets/pasos/2.webp",
    number: "2",
    title: "Plan Personalizado",
    description:
      "Alimentaci\u00f3n, suplementaci\u00f3n, tratamiento m\u00e9dico",
    color: "#1d75b8",
  },
  {
    src: "/assets/pasos/3.webp",
    number: "3",
    title: "Recuperaci\u00f3n Progresiva",
    description: "Empiezas a sentir cambios reales",
    color: "#9ccd37",
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
  const isLastStep = index === steps.length - 1;

  return (
    <article className="group relative grid grid-rows-[auto_auto] overflow-visible md:row-span-2 md:grid-rows-subgrid">
      <div className="relative overflow-hidden">
        <motion.img
          src={step.src}
          alt={step.title}
          className={`w-full object-cover object-[0_20%] sm:h-52 md:object-center lg:h-full`}
          loading="lazy"
          initial={reduceMotion ? false : { opacity: 0.55, scale: 1.06 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
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
          viewport={{ once: true, amount: 0.55 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { ...imageTransition, delay: index * 0.2 }
          }
        />
      </div>

      <div className="h-fit text-left">
        <div
          className="relative grid h-full grid-rows-[auto_auto_auto_1fr] content-start bg-white py-3 md:px-0 md:pt-2 md:pb-0"
          style={{ "--step-panel-color": step.color } as CSSProperties}
        >
          <span className="text-(length:--step--1)/5 font-semibold tracking-widest text-neutral-500 uppercase">
            Paso {step.number}
          </span>
          <h3 className="relative w-fit text-(length:--step-2)/7 font-semibold tracking-tight md:text-(length:--step-2)/10">
            {step.title}
          </h3>

          <p className="text-sm leading-relaxed md:text-(length:--step-0)">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Steps() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="max-w-desktop relative mx-auto overflow-hidden">
      <FadeIn>
        <motion.h2 className="bg-linear-to-br bg-clip-text px-4 pb-15 text-center text-(length:--step-4) font-semibold tracking-tighter text-neutral-600 md:text-(length:--step-5)">
          As&iacute; empieza tu <span className="text-brand-blue">cambio:</span>
        </motion.h2>
      </FadeIn>

      <div className="grid grid-cols-1 bg-white md:max-h-[70dvh] md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_auto] md:gap-x-2">
        {steps.map((step, i) => (
          <StepPanel key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
