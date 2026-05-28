import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type RefObject, useRef } from "react";

type Signal = {
  text: string;
  description: string;
  image: string;
};

type MetabolicSignalScrollerProps = {
  signals: Signal[];
};

function SignalCard({
  signal,
  scrollerRef,
}: {
  signal: Signal;
  scrollerRef: RefObject<HTMLUListElement | null>;
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
      className="group relative z-0 w-[86vw] min-w-[86vw] snap-start sm:w-[34rem] sm:min-w-[34rem]"
    >
      <span
        className="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[0.4] bg-neutral-100 opacity-100 transition-all duration-350 ease-[cubic-bezier(0.9,0,0.1,1)] group-hover:scale-105"
        aria-hidden="true"
      />
      <div className="relative z-10 aspect-16/9 overflow-hidden transition-shadow duration-700 group-hover:shadow-xl/10">
        <motion.div className="w-ful h-full" style={{ x }}>
          <img
            src={signal.image}
            alt=""
            className="z-0 h-full w-full scale-110 object-cover object-center"
            loading="lazy"
          />
        </motion.div>
      </div>
      <p className="relative z-10 pt-3 pl-0 text-left text-(length:--step-1)/7 font-semibold tracking-tight text-balance text-neutral-600">
        {signal.text}
      </p>
      <p className="relative z-10 mt-2 max-w-lg text-left text-base text-pretty text-neutral-500">
        {signal.description}
      </p>
    </li>
  );
}

export default function MetabolicSignalScroller({
  signals,
}: MetabolicSignalScrollerProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  return (
    <ul
      ref={scrollerRef}
      className="hide-scroll flex gap-6 overflow-x-auto py-8 lg:pl-[max(1rem,calc((100vw-92rem)/2))]"
    >
      {signals.map((signal) => (
        <SignalCard
          key={`${signal.text}-${signal.image}`}
          signal={signal}
          scrollerRef={scrollerRef}
        />
      ))}
    </ul>
  );
}
