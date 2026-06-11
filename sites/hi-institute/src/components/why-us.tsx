import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import FadeIn from "./fade-in";

const reasons = [
  {
    number: "01",
    title: "El origen lo cambia todo",
    description:
      "Tratamos el sistema completo, no solo lo visible. Mientras otros se enfocan en controlar azúcar, peso o síntomas, aquí vamos al origen: metabolismo, hormonas e inflamación.",
    className: "bg-gray-100 ",
  },
  {
    number: "02",
    title: "Cada cuerpo necesita una respuesta distinta",
    description:
      "Tu historia importa. Por eso evaluamos antes de intervenir y diseñamos un plan personalizado, con seguimiento continuo y ajustes según cómo responde tu cuerpo.",
    className: "bg-gray-100 ",
  },
  {
    number: "03",
    title: "Buscamos resultados que se mantengan",
    description:
      "Bajar de peso, regular hormonas o mejorar tu salud no debería ser temporal. Nuestro enfoque está diseñado para sostener cambios reales porque trabajamos sobre la causa.",
    className: "bg-gray-100 ",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function WhyUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-blue overflow-hidden">
      <div className="px-4 py-14 text-center sm:px-6 md:px-10 md:py-20 lg:py-32">
        <FadeIn
          as="h2"
          className="mx-auto max-w-2xl text-(length:--step-4)/[1.02] font-[450] tracking-tighter text-pretty text-white md:text-(length:--step-5)/[0.98]"
        >
          ¿Por qué Hi Institute es tu mejor opción?
        </FadeIn>
      </div>

      <motion.div
        className="grid md:grid-cols-3"
        variants={reduceMotion ? undefined : containerVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {reasons.map((reason) => (
          <motion.article
            key={reason.title}
            className={`${reason.className} flex min-h-[22rem] flex-col justify-between border-r border-gray-200 p-5 last:border-b-0 sm:min-h-[27rem] sm:p-7 md:min-h-[34rem] lg:p-10`}
            variants={reduceMotion ? undefined : cardVariants}
          >
            <span className="text-sm font-bold tracking-[0.14em] tabular-nums">
              {reason.number}
            </span>
            <div>
              <h3 className="max-w-[15ch] text-(length:--step-3)/[1.02] font-medium tracking-tighter text-balance">
                {reason.title}
              </h3>
              <p className="mt-6 max-w-[48ch] text-base leading-relaxed opacity-85 md:text-(length:--step-0)/7">
                {reason.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
