import {
  AnimatePresence,
  LayoutGroup,
  motion,
  spring,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";
import FadeIn from "../fade-in";

const steps = [
  {
    src: "/assets/images/home/steps/evaluation.jpg",
    number: "01",
    title: "Evaluacion completa",
    eyebrow: "Primero entendemos",
    summary: "Hormonas, metabolismo, historia clinica y estilo de vida.",
    detail:
      "Reunimos datos claros para identificar que esta frenando tu progreso y que necesita atencion real.",
  },
  {
    src: "/assets/images/home/steps/personalized-plan.jpg",
    number: "02",
    title: "Plan personalizado",
    eyebrow: "Despues disenamos",
    summary: "Nutricion, suplementacion y tratamiento medico segun tu caso.",
    detail:
      "Tu plan se construye alrededor de tus resultados, tus sintomas y lo que puedes sostener en tu vida diaria.",
  },
  {
    src: "/assets/images/home/steps/progress.jpg",
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
    <section className="relative w-full overflow-hidden bg-gray-50 lg:grid lg:min-h-[80svh] lg:place-items-center">
      <div className="grid w-full lg:h-full lg:grid-cols-[1fr_1fr] lg:gap-4">
        {/* Left column */}
        <div className="flex flex-col justify-center px-4 pt-12 pb-10 sm:px-6 lg:px-0 lg:py-0">
          <FadeIn className="lg:pt-8 lg:pl-10">
            <p className="text-p">Nuestro proceso</p>
            <h2 className="text-h2 mb-8 text-left font-[550] tracking-tighter text-balance text-neutral-800">
              Asi empieza tu cambio
            </h2>
          </FadeIn>

          <LayoutGroup>
            <div className="lg:ml-4 lg:border-0">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div key={step.number} layout="position">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group w-full cursor-pointer px-4 py-5 text-left transition-colors duration-300 sm:px-5 lg:p-6 ${isActive ? "bg-gray-100" : "hover:bg-gray-200/50"}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex w-full items-start justify-between gap-5">
                          <span
                            className={`text-h5 block leading-tight font-medium tracking-tight transition-colors duration-300 ${
                              isActive
                                ? "text-neutral-900"
                                : "text-neutral-400/80 group-hover:text-neutral-700"
                            }`}
                          >
                            {step.title}
                          </span>
                          <span
                            className={`text-p shrink-0 font-bold uppercase tabular-nums transition-colors duration-300`}
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
                              <p className="text-p mt-3 max-w-prose pr-6 leading-relaxed text-pretty text-neutral-700 lg:mt-0 lg:pr-0">
                                {step.summary}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Right column */}
        <div className="relative aspect-4/3 min-w-0 overflow-hidden sm:aspect-16/10 lg:aspect-auto lg:h-full">
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
