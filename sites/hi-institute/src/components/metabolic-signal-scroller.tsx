import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type RefObject, useEffect, useRef, useState } from "react";

type Signal = {
  text: string;
  description: string;
  image: string;
  href: string;
};

type MetabolicSignalScrollerProps = {
  signals: Signal[];
};

function SignalCard({
  signal,
  scrollerRef,
  idx,
}: {
  signal: Signal;
  scrollerRef: RefObject<HTMLUListElement | null>;
  idx: number;
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
    reduceMotion ? [0, 0] : [-100, 100],
  );

  return (
    <li
      ref={cardRef}
      className="relative min-w-sm snap-start focus-within:z-20 hover:z-20 md:min-w-lg lg:min-w-md"
    >
      <a
        href={signal.href}
        className="group relative z-0 block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-neutral-800"
      >
        <span
          className={`${idx % 2 === 0 ? "bg-brand-green" : "bg-brand-blue"} absolute top-[calc(50%)] left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[0.4] opacity-100 transition-all duration-300 ease-[cubic-bezier(0.9,0,0.1,1)] group-hover:scale-x-105 group-hover:scale-y-104 group-focus-visible:scale-x-105 group-focus-visible:scale-y-104`}
          aria-hidden="true"
        />
        <div className="relative z-10 aspect-7/8 overflow-hidden transition-shadow duration-700 group-hover:shadow-xl/10 group-focus-visible:shadow-xl/10">
          <motion.div className="h-full w-full" style={{ x }}>
            <img
              src={signal.image}
              alt=""
              className="z-0 h-full w-full scale-130 object-cover object-center"
              loading="lazy"
            />
          </motion.div>
        </div>
        <p className="relative z-10 max-w-none pt-3 pl-0 text-left text-(length:--step-2) leading-tight font-[550] tracking-tight text-balance transition-colors duration-350 group-hover:text-white group-focus-visible:text-white">
          {signal.text}
        </p>
        <p className="relative z-10 mt-2 max-w-[calc(100%-4rem)] pb-8 text-left text-base tracking-tight text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
          {signal.description}
        </p>
        <span
          className="absolute right-0 bottom-0 z-10 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </a>
    </li>
  );
}

export default function MetabolicSignalScroller({
  signals,
}: MetabolicSignalScrollerProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [hasMoreToScroll, setHasMoreToScroll] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateScrollState = () => {
      setHasMoreToScroll(
        scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth - 2,
      );
    };

    updateScrollState();
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [signals.length]);

  const scrollToNextSignal = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const currentLeft = scroller.scrollLeft;
    const leadingInset =
      Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
    const scrollerLeft = scroller.getBoundingClientRect().left;
    const nextSignal = Array.from(scroller.children).find((child) => {
      const childLeft =
        child.getBoundingClientRect().left - scrollerLeft + currentLeft;
      const snapLeft = childLeft - leadingInset;

      return snapLeft > currentLeft + 2;
    });

    if (!nextSignal) return;

    const nextLeft =
      nextSignal.getBoundingClientRect().left -
      scrollerLeft +
      currentLeft -
      leadingInset;

    scroller.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  return (
    <div className="group/scroller relative">
      <ul
        ref={scrollerRef}
        className="signal-scroller flex snap-x snap-mandatory scroll-mb-28 gap-4 overflow-x-auto scroll-smooth pt-4 pb-8 pl-10 sm:scroll-pl-8"
      >
        {signals.map((signal, idx) => (
          <SignalCard
            key={`${signal.text}-${signal.image}`}
            signal={signal}
            scrollerRef={scrollerRef}
            idx={idx}
          />
        ))}
      </ul>
      {hasMoreToScroll ? (
        <button
          type="button"
          className="absolute top-1/2 right-4 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800 text-white shadow-lg/20 transition-all duration-300 hover:scale-105 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
          aria-label="Ver siguiente senal"
          onClick={scrollToNextSignal}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
