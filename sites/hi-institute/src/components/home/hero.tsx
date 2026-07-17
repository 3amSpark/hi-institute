import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type HeroImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
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

// CTA colors rotate per slide: black / green / blue. The green pill is too
// light for white text, so it uses a dark ink of the same hue instead.
const slideThemes = [
  {
    background: "bg-neutral-50",
    cta: "lg:[--depth-color:var(--color-neutral-900)] lg:text-white/90",
  },
  {
    background: "bg-neutral-50",
    cta: "lg:[--depth-color:var(--color-brand-green)] lg:text-[#31420b]",
  },
  {
    background: "bg-neutral-50",
    cta: "lg:[--depth-color:var(--color-brand-blue)] lg:text-white/90",
  },
] as const;

const slideRevealDuration = 0.5;

const slideTransition = {
  duration: slideRevealDuration,
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
    <section className="lg:mt-navbar relative isolate min-h-dvh overflow-hidden bg-white lg:min-h-[calc(100dvh-var(--spacing-navbar))]">
      <motion.div
        className="flex min-h-dvh w-full lg:min-h-[calc(100dvh-var(--spacing-navbar))]"
        animate={{ x: `${displayedIndex * -100}%` }}
        transition={reduceMotion ? { duration: 0 } : slideTransition}
      >
        {images.map((image, index) => {
          const slideTheme = slideThemes[index % slideThemes.length];
          const slideTitle = image.title ?? title;
          const slideDescription = image.description ?? description;
          const imagePosition = image.imagePosition ?? "right";
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <div
              key={image.src}
              className={`relative isolate flex h-dvh w-full shrink-0 lg:h-[calc(100dvh-var(--spacing-navbar))] ${slideTheme.background} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${slideLayoutClass[imagePosition]}`}
            >
              <div className="hero-copy pt-navbar relative z-20 flex h-full flex-1 items-end justify-start px-4 pb-12 lg:h-auto lg:flex-auto lg:items-center lg:px-14 lg:py-15">
                <div
                  className={`flex max-w-prose flex-col gap-4 sm:gap-5 lg:max-w-2xl ${contentClass[align]}`}
                >
                  <fade-in instant="" delay={slideRevealDuration}>
                    <Heading className="text-h2/[1.2] lg:text-h1/[1.08] font-[450] tracking-tighter text-balance text-white lg:text-neutral-900">
                      {slideTitle}
                    </Heading>
                  </fade-in>

                  <fade-in instant="" delay={slideRevealDuration + 0.15}>
                    {slideDescription ? (
                      <p className="text-p max-w-lg text-white/90 lg:text-neutral-600">
                        {slideDescription}
                      </p>
                    ) : null}
                  </fade-in>

                  <fade-in instant="" delay={slideRevealDuration + 0.35}>
                    {actions.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {actions.map((action) => (
                          <a
                            key={action.href}
                            href={action.href}
                            className={`group sm:text-p btn-depth inline-flex w-fit items-center gap-2 rounded-full [--depth-color:#fff] py-1.5 pr-5 pl-7 tracking-wide text-neutral-900 uppercase transition-[filter,box-shadow] duration-300 ease-out hover:brightness-105 ${slideTheme.cta}`}
                          >
                            <span>{action.label}</span>
                            <span
                              className="size-5.5 -rotate-45 bg-current [mask-image:url('/assets/icons/ui/arrow-right.svg')] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] transition-transform duration-300 ease-out group-hover:rotate-0"
                              aria-hidden="true"
                            />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </fade-in>
                </div>
              </div>

              <div className="hero-media absolute inset-0 z-0 flex h-full shrink-0 lg:relative lg:flex-1 lg:pt-0">
                <div className="relative grid h-full w-full place-items-center overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-black/40 via-black/25 to-black/10 lg:hidden" />
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes={image.sizes}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
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
