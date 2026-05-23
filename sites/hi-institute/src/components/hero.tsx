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
    title: "text-neutral-600",
    body: "text-neutral-800",
    cta: "bg-neutral-600",
  },
  {
    title: "text-brand-blue",
    body: "text-neutral-800",
    cta: "bg-brand-blue",
  },
  {
    title: "text-brand-green",
    body: "text-neutral-800",
    cta: "bg-brand-green",
  },
] as const;

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
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
    setUserHasInteracted(true);
  };

  const showNextImage = () => {
    setActiveIndex((current) => (current + 1) % images.length);
    setUserHasInteracted(true);
  };

  return (
    <section className="relative isolate mt-18 min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-white">
      <motion.div
        className="flex min-h-[calc(100dvh-4.5rem)] w-full"
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
              className={`flex h-[calc(100dvh-4.5rem)] w-full shrink-0 flex-col-reverse lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${slideLayoutClass[imagePosition]}`}
            >
              <div className="hero-copy flex items-center px-4 pb-4 lg:px-16 lg:py-24 xl:px-24">
                <div
                  className={`flex max-w-xl flex-col gap-2 sm:gap-5 ${contentClass[align]}`}
                >
                  <FadeIn>
                    <h1
                      className={`text-(length:--step-5)/12 font-semibold tracking-tighter text-balance md:text-(length:--step-6)/16 ${slideTheme.title}`}
                    >
                      {slideTitle}.
                    </h1>
                  </FadeIn>

                  <FadeIn delay={0.125}>
                    {slideDescription ? (
                      <p
                        className={`max-w-lg text-(length:--step-0) leading-8 ${slideTheme.body}`}
                      >
                        {slideDescription}
                      </p>
                    ) : null}
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    {actions.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {actions.map((action) => (
                          <a
                            key={action.href}
                            href={action.href}
                            className={`group inline-flex w-fit items-center gap-2 rounded-full bg-size-[200%_100%] bg-position-[0%_50%] py-1.5 pr-4 pl-5 text-(length:--step--0) font-medium text-white transition-[background-position,box-shadow] duration-500 ease-out hover:bg-position-[100%_50%] ${slideTheme.cta}`}
                          >
                            <span>{action.label}</span>
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
                              <path d="M7 17 17 7"></path>
                              <path d="M8 7h9v9"></path>
                            </svg>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </FadeIn>
                </div>
              </div>

              <div className="hero-media relative flex-1 px-2 pt-2 pb-2 lg:min-h-[calc(100dvh-4.5rem)] lg:pt-0">
                <div className="h-full w-full overflow-hidden bg-neutral-950">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover object-right"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            aria-label="Show previous slide"
            onClick={showPreviousImage}
            className="absolute top-1/2 left-4 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white text-neutral-950 transition-colors md:left-6"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Show next slide"
            onClick={showNextImage}
            className="absolute top-1/2 right-4 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white text-neutral-950 transition-colors md:right-6"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      ) : null}
    </section>
  );
}
