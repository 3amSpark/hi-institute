import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import FadeIn from "./fade-in";

type HeroImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
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

const slideTransition = {
  type: "spring",
  restDelta: 0.001,
  damping: 34,
  stiffness: 170,
} as const;

export default function Hero({
  title,
  description,
  actions = [],
  images,
  align = "left",
  intervalMs = 7000,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const hasMultipleImages = images.length > 1;
  const displayedIndex =
    images.length > 0 ? Math.min(activeIndex, images.length - 1) : 0;
  const activeImage = images[displayedIndex];
  const activeTitle = activeImage?.title ?? title;
  const activeDescription = activeImage?.description ?? description;

  useEffect(() => {
    setActiveIndex((current) =>
      images.length > 0 ? Math.min(current, images.length - 1) : 0,
    );
  }, [images.length]);

  useEffect(() => {
    if (!hasMultipleImages || reduceMotion || userHasInteracted) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [
    hasMultipleImages,
    images.length,
    intervalMs,
    reduceMotion,
    userHasInteracted,
  ]);

  if (!activeImage) return null;

  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute z-10 h-full w-full bg-linear-to-tr from-black/50 via-transparent to-transparent mix-blend-overlay"></div>

        <motion.div
          className="flex h-full w-full"
          animate={{ x: `${displayedIndex * -100}%` }}
          transition={reduceMotion ? { duration: 0 } : slideTransition}
        >
          {images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto flex min-h-svh max-w-7xl items-center px-6 lg:px-10">
        <div className={`flex max-w-2xl flex-col ${contentClass[align]}`}>
          <FadeIn
            key={activeTitle}
            as="h1"
            className="font-sans text-(length:--step-1) leading-snug font-medium text-white uppercase text-shadow-md/5"
          >
            {activeTitle}
          </FadeIn>

          {activeDescription ? (
            <FadeIn
              key={activeDescription}
              as="p"
              className="mt-4 max-w-xl text-lg leading-8 text-white/80 text-shadow-md/5"
              delay={0.1}
            >
              {activeDescription}
            </FadeIn>
          ) : null}

          {actions.length > 0 ? (
            <FadeIn
              key={`actions-${displayedIndex}`}
              className="mt-8 flex flex-wrap gap-3"
              delay={0.2}
            >
              {actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-r from-[#31ADD0] via-[#8FC746] to-[#31ADD0] bg-size-[200%_100%] bg-position-[0%_50%] py-1.5 pr-4 pl-5 font-sans text-lg font-medium text-white shadow-lg shadow-[#31ADD0]/20 transition-[background-position,box-shadow] duration-500 ease-out hover:bg-position-[100%_50%] hover:shadow-[#8FC746]/30"
                >
                  <span>{action.label}</span>
                  <svg
                    className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7"></path>
                    <path d="M8 7h9v9"></path>
                  </svg>
                </a>
              ))}
            </FadeIn>
          ) : null}
        </div>
      </div>

      {hasMultipleImages ? (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === displayedIndex}
              onClick={() => {
                setActiveIndex(index);
                setUserHasInteracted(true);
              }}
              className={
                index === displayedIndex
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
