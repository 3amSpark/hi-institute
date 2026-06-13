import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import FadeIn from "./fade-in";

type HeroImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  imagePosition?: "left" | "right";
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
  left: "items-start text-left",
  right: "items-start text-left lg:ml-auto",
  center: "items-center text-center lg:mx-auto",
};

const slideLayoutClass = {
  // left: "lg:[&_.hero-copy]:order-2 lg:[&_.hero-media]:order-1",
  left: "",
  right: "",
};

const slideThemes = [
  {
    background: "bg-gray-100",
    text: "text-neutral-900",
  },
  {
    background: "bg-brand-blue",
    text: "text-white",
  },
  {
    background: "bg-brand-green",
    text: "text-white",
  },
] as const;

const slideTransition = {
  type: "spring",
  restDelta: 0.001,
  damping: 30,
  mass: 1,
  stiffness: 220,
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

  useEffect(() => {
    setActiveIndex((current) =>
      images.length > 0 ? Math.min(current, images.length - 1) : 0,
    );
  }, [hasMultipleImages, images.length]);

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

  if (images.length === 0) return null;

  const showImage = (index: number) => {
    setActiveIndex(index);
    setUserHasInteracted(true);
  };

  return (
    <section className="mt-navbar relative isolate min-h-[calc(100dvh-var(--spacing-navbar))] overflow-hidden bg-white">
      <motion.div
        className="flex min-h-[calc(100dvh-var(--spacing-navbar))] w-full"
        animate={{ x: `${displayedIndex * -100}%` }}
        transition={reduceMotion ? { duration: 0 } : slideTransition}
      >
        {images.map((image, index) => {
          const slideTheme = slideThemes[index % slideThemes.length];
          const slideTitle = image.title ?? title;
          const slideDescription = image.description ?? description;
          const imagePosition = image.imagePosition ?? "right";

          return (
            <div
              key={image.src}
              className={`flex h-[calc(100dvh-var(--spacing-navbar))] w-full shrink-0 flex-col-reverse lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${slideTheme.background} ${slideLayoutClass[imagePosition]}`}
            >
              <div className="hero-copy flex flex-1 items-center justify-start px-4 py-5 lg:h-auto lg:flex-auto lg:items-end lg:px-14 lg:py-15 lg:pt-0">
                <div
                  className={`flex max-w-prose flex-col gap-4 sm:gap-5 lg:max-w-xl ${contentClass[align]}`}
                >
                  <FadeIn instant={true}>
                    <h1
                      className={`text-(length:--step-5) leading-[1em] font-medium tracking-tighter text-balance md:text-(length:--step-6) ${slideTheme.text}`}
                    >
                      {slideTitle}
                    </h1>
                  </FadeIn>

                  <FadeIn delay={0.2} instant={true}>
                    {slideDescription ? (
                      <p
                        className={`max-w-lg text-(length:--step-0) leading-8 ${slideTheme.text}`}
                      >
                        {slideDescription}
                      </p>
                    ) : null}
                  </FadeIn>

                  <FadeIn delay={0.35} instant={true}>
                    {actions.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {actions.map((action) => (
                          <a
                            key={action.href}
                            href={action.href}
                            className="group inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 bg-size-[200%_100%] bg-position-[0%_50%] py-1.5 pr-3 pl-5 text-(length:--step--0) font-medium text-white transition-[background-position,box-shadow] duration-500 ease-out hover:bg-position-[100%_50%]"
                          >
                            <span>{action.label}</span>
                            <span
                              className="size-5.5 -rotate-45 bg-current [mask-image:url('/assets/icons/arrow-right.svg')] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] transition-transform duration-300 ease-out group-hover:rotate-0"
                              aria-hidden="true"
                            />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </FadeIn>
                </div>
              </div>

              <div className="hero-media relative flex h-[min(100vw,62dvh)] shrink-0 lg:min-h-[calc(100dvh-var(--spacing-navbar))] lg:flex-1 lg:pt-0">
                <div className="relative grid h-full w-full place-items-center overflow-hidden">
                  {/*<div className="from-brand-green/70 to-brand-blue absolute inset-0 z-20 size-full bg-linear-to-tl via-transparent via-70% mix-blend-color" />*/}
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="z-0 h-full w-full object-cover object-center grayscale-20"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {hasMultipleImages ? (
        <div
          className="absolute right-0 bottom-0 left-0 z-20 grid"
          style={{
            gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`,
          }}
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === displayedIndex ? "true" : undefined}
              onClick={() => showImage(index)}
              className="group flex h-2 cursor-pointer items-end"
            >
              <span
                className={`block h-1.5 w-full transition-[height,background-color] duration-300 ${
                  index === displayedIndex
                    ? "h-1.5 bg-neutral-900/50"
                    : "bg-neutral-900/20 group-hover:bg-neutral-900/60"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
