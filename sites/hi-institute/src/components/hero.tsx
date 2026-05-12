import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type HeroImage = {
  src: string;
  alt: string;
};

type HeroAction = {
  href: string;
  label: string;
};

type HeroProps = {
  title: string;
  description?: string;
  actions?: HeroAction[];
  images: HeroImage[];
  align?: "left" | "right" | "center";
  intervalMs?: number;
};

const contentClass = {
  left: "items-start text-left mr-auto",
  right: "items-start text-left ml-auto",
  center: "items-center text-center mx-auto",
};

export default function Hero({
  title,
  description,
  actions = [],
  images,
  align = "left",
  intervalMs = 5000,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeImage = images[activeIndex];

  useEffect(() => {
    if (images.length < 2 || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [images.length, intervalMs, reduceMotion]);

  if (!activeImage) return null;

  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="flex h-full w-full"
          animate={reduceMotion ? { x: 0 } : { x: `${activeIndex * -100}%` }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        >
          {images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
      </div>

      <div className="mx-auto flex min-h-svh max-w-7xl items-center px-6 lg:px-10">
        <div className={`flex max-w-2xl flex-col ${contentClass[align]}`}>
          <motion.h1
            className="font-sans text-5xl leading-[0.95] font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              className="mt-6 max-w-xl text-lg leading-8 text-white/80"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              {description}
            </motion.p>
          ) : null}

          {actions.length > 0 ? (
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              {actions.map((action, index) => (
                <a
                  key={action.href}
                  href={action.href}
                  className={
                    index === 0
                      ? "rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-85"
                      : "rounded-full border border-white/50 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                  }
                >
                  {action.label}
                </a>
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="absolute right-6 bottom-6 flex gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm lg:right-10">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={
                index === activeIndex
                  ? "h-2 w-6 rounded-full bg-white transition-all"
                  : "h-2 w-2 rounded-full bg-white/50 transition-all hover:bg-white"
              }
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
