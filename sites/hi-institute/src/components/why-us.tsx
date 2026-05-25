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

const cardClassNames = [
  "bg-neutral-500 text-white",
  "bg-brand-green text-white",
  "bg-brand-blue text-white",
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
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function WhyUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="m-2 overflow-hidden bg-white text-white">
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="relative overflow-hidden md:min-h-[760px] md:basis-3/5">
          <img
            src="/assets/why-us.webp"
            alt="Personas representando cuidado integral en HI Institute"
            className="h-full w-full -scale-x-100 object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/5 to-black/45" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <FadeIn
              as="h2"
              className="max-w-4xl text-center text-(length:--step-6)/18 font-semibold tracking-tighter text-white"
            >
              ¿Por qué HI Institute es una clínica diferente?
            </FadeIn>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 grid-rows-3 gap-2 md:basis-2/5"
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.65 }}
        >
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              className={`${cardClassNames[index]} flex flex-col gap-4 p-6 md:p-7`}
              variants={reduceMotion ? undefined : cardVariants}
            >
              <h3 className="text-(length:--step-3)/10 font-semibold tracking-tighter text-balance">
                {reason.title}
              </h3>
              <p className="text-(length:--step-0)/7 opacity-85">
                {reason.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
