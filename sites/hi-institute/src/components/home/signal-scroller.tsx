import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import FadeIn from "../fade-in";

type Signal = {
  text: string;
  description: string;
  image: string;
  href: string;
};

type SignalScrollerProps = {
  signals: Signal[];
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-5 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SignalCard({
  signal,
  scrollerRef,
  index,
}: {
  signal: Signal;
  scrollerRef: RefObject<HTMLUListElement | null>;
  index: number;
}) {
  const cardRef = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollXProgress } = useScroll({
    container: scrollerRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollXProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-24, 24],
  );

  return (
    <li
      ref={cardRef}
      data-signal-card
      className="w-[82vw] max-w-sm shrink-0 md:w-[22rem] lg:w-[30rem] lg:max-w-none"
    >
      <a
        href={signal.href}
        className="group flex h-full flex-col bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 hover:shadow-md/5 focus-visible:-translate-y-0.5 focus-visible:shadow-md/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
      >
        <div className="aspect-4/3 overflow-hidden">
          <motion.div className="h-full w-full" style={{ x }}>
            <img
              src={signal.image}
              alt=""
              className="h-full w-full scale-110 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-115 group-focus-visible:scale-115"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="flex min-h-64 flex-1 flex-col p-5 sm:p-6">
          <span className="text-xs font-medium tracking-[0.14em] text-neutral-500 uppercase tabular-nums">
            Señal {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-(length:--step-2) leading-tight font-medium tracking-tighter text-balance text-neutral-900">
            {signal.text}
          </h3>
          <p className="max-w-[40ch] pt-3 pb-4 leading-relaxed text-pretty text-neutral-600">
            {signal.description}
          </p>
          <span
            className="mt-auto flex items-center justify-between border-t border-neutral-200 pt-5 text-sm font-medium text-neutral-800"
            aria-hidden="true"
          >
            Conoce más
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
              <Arrow direction="right" />
            </span>
          </span>
        </div>
      </a>
    </li>
  );
}

export default function SignalScroller({ signals }: SignalScrollerProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-signal-card]"),
    );
    if (cards.length === 0) return;

    const leadingInset =
      Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
    const scrollerLeft = scroller.getBoundingClientRect().left;
    const currentLeft = scroller.scrollLeft;
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const isAtStart = currentLeft <= 2;
    const isAtEnd = currentLeft >= maxScrollLeft - 2;
    const nearestIndex = isAtStart
      ? 0
      : isAtEnd
        ? cards.length - 1
        : cards.reduce(
            (nearest, child, index) => {
              const childLeft =
                child.getBoundingClientRect().left - scrollerLeft + currentLeft;
              const distance = Math.abs(childLeft - leadingInset - currentLeft);

              return distance < nearest.distance
                ? { index, distance }
                : nearest;
            },
            { index: 0, distance: Number.POSITIVE_INFINITY },
          ).index;

    setCurrentIndex(nearestIndex);
    setHasPrevious(!isAtStart);
    setHasNext(!isAtEnd);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateScrollState();
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [signals.length, updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    const firstCard =
      scroller?.querySelector<HTMLElement>("[data-signal-card]");
    if (!scroller || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 0;
    scroller.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mx-auto flex flex-col items-start gap-6 px-4 pt-12 pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:px-10 md:pt-20 md:pb-12">
        <FadeIn className="max-w-3xl">
          <h2 className="text-(length:--step-4)/[1.05] font-medium tracking-tighter text-balance">
            ¿Te ha pasado alguna vez?
          </h2>
          <p className="mt-4 max-w-xl text-(length:--step-0)/7 tracking-tight text-neutral-700">
            Si reconoces alguno, no lo dejes pasar.{" "}
            <span className="block font-semibold text-neutral-900">
              Tiene explicación y solución.
            </span>
          </p>
        </FadeIn>

        <span
          className="shrink-0 self-end pb-1 text-sm font-medium text-neutral-600 tabular-nums"
          aria-live="polite"
        >
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(signals.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative">
        <ul
          ref={scrollerRef}
          className="signal-scroller flex gap-4 overflow-x-auto scroll-smooth px-4 pt-2 pb-14 md:gap-6 md:px-10 md:pb-20"
        >
          {signals.map((signal, index) => (
            <SignalCard
              key={`${signal.text}-${signal.image}`}
              signal={signal}
              scrollerRef={scrollerRef}
              index={index}
            />
          ))}
        </ul>

        {hasPrevious ? (
          <button
            type="button"
            className="absolute top-[32%] left-4 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-neutral-900 shadow-sm/10 backdrop-blur-sm transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 md:left-10 md:size-12"
            aria-label="Ver señal anterior"
            onClick={() => scrollByCard(-1)}
          >
            <Arrow direction="left" />
          </button>
        ) : null}

        {hasNext ? (
          <button
            type="button"
            className="absolute top-[32%] right-4 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-neutral-900 shadow-sm/10 backdrop-blur-sm transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 md:right-10 md:size-12"
            aria-label="Ver siguiente señal"
            onClick={() => scrollByCard(1)}
          >
            <Arrow direction="right" />
          </button>
        ) : null}
      </div>
    </>
  );
}
