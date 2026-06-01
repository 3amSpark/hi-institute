import {
  AnimatePresence,
  LayoutGroup,
  motion,
  spring,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";
import FadeIn from "./fade-in";

const steps = [
  {
    src: "hi-test.png",
    number: "01",
    title: "Evaluacion completa",
    eyebrow: "Primero entendemos",
    summary: "Hormonas, metabolismo, historia clinica y estilo de vida.",
    detail:
      "Reunimos datos claros para identificar que esta frenando tu progreso y que necesita atencion real.",
  },
  {
    src: "feel-better-than-ever.png",
    number: "02",
    title: "Plan personalizado",
    eyebrow: "Despues disenamos",
    summary: "Nutricion, suplementacion y tratamiento medico segun tu caso.",
    detail:
      "Tu plan se construye alrededor de tus resultados, tus sintomas y lo que puedes sostener en tu vida diaria.",
  },
  {
    src: "/assets/hero/couple.png",
    number: "03",
    title: "Cambio progresivo",
    eyebrow: "Luego ajustamos",
    summary: "Seguimiento cercano para convertir avances en cambios reales.",
    detail:
      "Medimos respuesta, afinamos el tratamiento y acompanamos tu recuperacion con decisiones basadas en evidencia.",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Steps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeStep = steps[activeIndex];

  return (
    <section className="relative grid h-[80svh] w-full place-items-center overflow-hidden bg-neutral-50">
      <div className="grid h-full w-full gap-4 lg:grid-cols-[1fr_1.5fr]">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <FadeIn className="pt-8 pl-24">
            <p className="mb-2 text-(length:--step--1) font-[550] text-neutral-600">
              Nuestro proceso
            </p>
            <h2 className="mb-8 text-left text-(length:--step-4) font-[550] tracking-tighter text-balance text-neutral-700 md:text-(length:--step-5)/[1.05]">
              Asi empieza tu cambio
            </h2>
          </FadeIn>

          <LayoutGroup>
            <div className="pl-20">
              {/*<div className="h-px bg-neutral-200" />*/}
              {steps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div key={step.number} layout="position">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group w-full cursor-pointer p-6 text-left ${isActive && "bg-neutral-100"}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex w-full items-center justify-between">
                          <span
                            className={`block text-(length:--step-1) font-[550] tracking-tight transition-colors duration-300 ${
                              isActive
                                ? "text-neutral-700"
                                : "text-neutral-500 group-hover:text-neutral-700"
                            }`}
                          >
                            {step.title}
                          </span>
                          <span
                            className={`mt-0.5 shrink-0 text-[11px] font-bold uppercase tabular-nums transition-colors duration-300`}
                          >
                            {step.number}
                          </span>
                        </div>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key="content"
                              initial={
                                reduceMotion
                                  ? false
                                  : {
                                      opacity: 0,
                                      height: 0,
                                      filter: "blur(5px)",
                                    }
                              }
                              animate={{
                                opacity: 1,
                                height: "auto",
                                filter: "blur(0px)",
                              }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.26,
                                type: "spring",
                                restDelta: 0.001,
                                damping: 30,
                                mass: 1,
                                stiffness: 220,
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <p className="max-w-sm text-sm/6 text-pretty text-neutral-700">
                                {step.summary}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                    {/*<div className="h-px bg-neutral-200" />*/}
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Right column */}
        <div className="relative h-full min-w-0 overflow-hidden">
          {/* Cross-fade image — no mode="wait", absolute stack */}
          <AnimatePresence mode="sync">
            <motion.img
              key={activeStep.src}
              src={activeStep.src}
              alt={activeStep.title}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.27,
                type: "spring",
                mass: 1,
                restDelta: 0.001,
                damping: 30,

                stiffness: 220,
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
