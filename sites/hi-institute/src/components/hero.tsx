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
  left: "lg:[&_.hero-copy]:order-2 lg:[&_.hero-media]:order-1",
  right: "",
};

const slideThemes = [
  {
    background: "bg-gray-100",
    text: "text-neutral-700",
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
  const canShowPreviousImage = displayedIndex > 0;
  const canShowNextImage = displayedIndex < images.length - 1;

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

  const showPreviousImage = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
    setUserHasInteracted(true);
  };

  const showNextImage = () => {
    setActiveIndex((current) => Math.min(current + 1, images.length - 1));
    setUserHasInteracted(true);
  };

  return (
    <section className="relative isolate mt-19 min-h-[calc(100dvh-4.75rem)] overflow-hidden bg-white">
      <motion.div
        className="flex min-h-[calc(100dvh-4.75rem)] w-full"
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
              className={`flex h-[calc(100dvh-4.75rem)] w-full shrink-0 flex-col-reverse lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${slideTheme.background} ${slideLayoutClass[imagePosition]}`}
            >
              <div className="hero-copy flex shrink-0 items-end justify-start px-3 pt-2 pb-4 lg:h-auto lg:flex-auto lg:px-14 lg:py-15 lg:pt-0">
                <div
                  className={`flex flex-col gap-2 sm:gap-5 lg:max-w-xl ${contentClass[align]}`}
                >
                  <FadeIn instant={true}>
                    <h1
                      className={`text-(length:--step-5)/12 font-medium tracking-tighter text-balance md:text-(length:--step-6)/16 ${slideTheme.text}`}
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
                            className="group inline-flex w-fit items-center gap-2 rounded-full bg-neutral-700 bg-size-[200%_100%] bg-position-[0%_50%] py-1.5 pr-3 pl-5 text-(length:--step--0) font-medium text-white transition-[background-position,box-shadow] duration-500 ease-out hover:bg-position-[100%_50%]"
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

              <div className="hero-media relative flex flex-1 lg:min-h-[calc(100dvh-4.75rem)] lg:flex-1 lg:pt-0">
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
        <>
          {canShowPreviousImage ? (
            <button
              type="button"
              aria-label="Show previous slide"
              onClick={showPreviousImage}
              className="absolute top-1/2 left-4 z-20 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-neutral-700 transition-colors md:left-6"
            >
              <span
                className="size-5 rotate-180 bg-current [mask-image:url('/assets/icons/chevron-right.svg')] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]"
                aria-hidden="true"
              />
            </button>
          ) : null}
          {canShowNextImage ? (
            <button
              type="button"
              aria-label="Show next slide"
              onClick={showNextImage}
              className="absolute top-1/2 right-4 z-20 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-neutral-700 transition-colors md:right-6"
            >
              <span
                className="size-5.5 bg-current [mask-image:url('/assets/icons/chevron-right.svg')] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]"
                aria-hidden="true"
              />
            </button>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
