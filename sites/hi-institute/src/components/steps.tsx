import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    src: "/assets/pasos/1.webp",
    number: "1",
    title: "Evaluaci\u00f3n Completa",
    description: "Hormonas, metabolismo, estilo de vida",
    color: "#1d75b8",
  },
  {
    src: "/assets/pasos/2.webp",
    number: "2",
    title: "Plan Personalizado",
    description:
      "Alimentaci\u00f3n, suplementaci\u00f3n, tratamiento m\u00e9dico",
    color: "#009848",
  },
  {
    src: "/assets/pasos/3.webp",
    number: "3",
    title: "Recuperaci\u00f3n Progresiva",
    description: "Empiezas a sentir cambios reales",
    color: "#9ccd37",
  },
];

const fadeTransition = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1],
} as const;

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
    <div className="relative flex-1 overflow-hidden">
      <motion.img
        src={step.src}
        alt={step.title}
        className="h-full w-full object-cover"
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
        className="pointer-events-none absolute inset-0"
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
      <div className="pointer-events-none absolute inset-0 bg-black/10" />
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
        style={{ backgroundColor: step.color }}
      />

      {/* Step text overlay */}
      <motion.div
        className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-center px-4 text-center text-white"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
        viewport={{ once: true }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { ...fadeTransition, delay: index * 0.2 + 0.6 }
        }
      >
        <h3 className="text-(length:--step-2) font-semibold uppercase text-shadow-sm">
          {step.number}. {step.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-white/90 text-shadow-sm md:text-base lg:text-lg">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Steps() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Desktop: side by side images filling the section */}
      <div className="hidden md:flex" style={{ height: "80vh" }}>
        {steps.map((step, i) => (
          <StepPanel key={step.number} step={step} index={i} />
        ))}
      </div>

      {/* Mobile heading */}
      <motion.h2
        className="text-brand-blue bg-white px-6 py-8 text-center text-lg font-medium tracking-[0.3em] uppercase md:hidden"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduceMotion ? { duration: 0 } : fadeTransition}
      >
        As&iacute; empieza tu cambio
      </motion.h2>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col bg-white md:hidden">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <motion.img
              src={step.src}
              alt={step.title}
              className="h-full w-full object-cover"
              loading="lazy"
              initial={reduceMotion ? false : { opacity: 0.55, scale: 1.06 }}
              whileInView={
                reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={reduceMotion ? { duration: 0 } : imageTransition}
            />
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: step.color }}
              initial={reduceMotion ? false : { x: "0%" }}
              whileInView={reduceMotion ? { x: "100%" } : { x: "100%" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduceMotion ? { duration: 0 } : imageTransition}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/20" />
            <div
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
              style={{ backgroundColor: step.color }}
            />

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { ...fadeTransition, delay: 0.5 }
              }
            >
              <h3 className="text-(length:--step-2) font-semibold tracking-wide uppercase text-shadow-sm">
                {step.number}. {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-white/90 text-shadow-sm">
                {step.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Overlaid heading - top (desktop only, on mobile it's part of the flow) */}
      <motion.h2
        className="absolute top-8 right-0 left-0 z-10 hidden text-center text-xl font-medium tracking-[0.3em] text-white uppercase text-shadow-md md:block lg:top-12 lg:text-2xl"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={
          reduceMotion ? { duration: 0 } : { ...fadeTransition, delay: 0.4 }
        }
      >
        As&iacute; empieza tu cambio
      </motion.h2>

      {/* CTA - bottom overlay on desktop, inline on mobile */}
      <motion.div
        className="absolute right-0 bottom-8 left-0 z-10 hidden flex-col items-center gap-4 md:flex lg:bottom-12"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={
          reduceMotion ? { duration: 0 } : { ...fadeTransition, delay: 0.5 }
        }
      >
        <a
          href="/contacto"
          className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#31ADD0] via-[#8FC746] to-[#31ADD0] bg-size-[200%_100%] bg-position-[0%_50%] py-1.5 pr-4 pl-5 text-lg font-medium text-white shadow-lg shadow-[#31ADD0]/20 transition-[background-position,box-shadow] duration-500 ease-out hover:bg-position-[100%_50%] hover:shadow-[#8FC746]/30"
        >
          <span>AGENDA TU CITA</span>
          <svg
            className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
