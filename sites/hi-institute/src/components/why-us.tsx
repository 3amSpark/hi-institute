import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import FadeIn from "./fade-in";

const reasons = [
  {
    title: "El origen lo cambia todo",
    description:
      "Tratamos el sistema completo, no solo lo visible. Mientras otros se enfocan en controlar azúcar, peso o síntomas, aquí vamos al origen: metabolismo, hormonas e inflamación.",
  },
  {
    title: "Cada cuerpo necesita una respuesta distinta",
    description:
      "Tu historia importa. Por eso evaluamos antes de intervenir y diseñamos un plan personalizado, con seguimiento continuo y ajustes según cómo responde tu cuerpo.",
  },
  {
    title: "Buscamos resultados que se mantengan",
    description:
      "Bajar de peso, regular hormonas o mejorar tu salud no debería ser temporal. Nuestro enfoque está diseñado para sostener cambios reales porque trabajamos sobre la causa.",
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
    <section className="relative min-h-svh overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src="/hi-test-2.png"
          alt="Personas representando cuidado integral en HI Institute"
          className="h-full w-full -scale-x-100 object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="grid min-h-svh grid-rows-[1.5fr_1fr]">
        <div className="flex items-center justify-center px-6 pt-19">
          <FadeIn
            as="h2"
            className="text-center text-(length:--step-6) leading-tight font-[550] tracking-tighter text-balance text-white"
          >
            ¿Por qué HI Institute es una clínica diferente?
          </FadeIn>
        </div>

        <motion.div
          className="why-us-reasons grid grid-cols-1 grid-rows-[auto_1fr] px-6 pb-10 md:grid-cols-3 md:px-10"
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.65 }}
        >
          {reasons.map((reason) => (
            <motion.article
              key={reason.title}
              className="why-us-reason grid grid-rows-subgrid gap-4 p-4 text-white md:row-span-2"
              variants={reduceMotion ? undefined : cardVariants}
            >
              <h3 className="text-(length:--step-3) leading-tight font-medium tracking-tighter text-balance">
                {reason.title}
              </h3>
              <p className="max-w-[55ch] text-(length:--step-0)/7 opacity-85">
                {reason.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
