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
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function WhyUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 px-6 py-20 text-white md:min-h-[760px] md:py-24 lg:px-10">
      <img
        src="/assets/why-us.webp"
        alt="Personas representando cuidado integral en HI Institute"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_14%,rgba(49,173,208,0.68),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(156,205,55,0.72),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.52))]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <FadeIn
          as="h2"
          className="max-w-3xl text-center text-(length:--step-5)/14 font-semibold tracking-tight text-white"
        >
          ¿Por qué HI Institute es una clínica diferente?
        </FadeIn>

        <motion.div
          className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-5 md:mt-24 md:grid-cols-3 md:gap-6"
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.35 }}
        >
          {reasons.map((reason) => (
            <motion.article
              key={reason.title}
              className="grid grid-rows-[auto_1fr] gap-7 rounded-xl bg-white/95 p-8 text-neutral-700 shadow-xl shadow-black/10 md:row-span-2 md:grid-rows-subgrid"
              variants={reduceMotion ? undefined : cardVariants}
            >
              <h3 className="text-brand-blue text-(length:--step-1)/7 font-medium">
                {reason.title}
              </h3>
              <p className="text-(length:--step-0)/8">{reason.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
