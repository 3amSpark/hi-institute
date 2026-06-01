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
    <li ref={cardRef} className="group relative z-0 min-w-md snap-start">
      <span
        className={`${idx % 2 === 0 ? "bg-brand-green" : "bg-brand-blue"} absolute top-[calc(50%)] left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[0.4] opacity-100 transition-all duration-300 ease-[cubic-bezier(0.9,0,0.1,1)] group-hover:scale-x-105 group-hover:scale-y-104`}
        aria-hidden="true"
      />
      <div className="relative z-10 aspect-7/8 overflow-hidden transition-shadow duration-700 group-hover:shadow-xl/10">
        <motion.div className="w-ful h-full" style={{ x }}>
          <img
            src={signal.image}
            alt=""
            className="z-0 h-full w-full scale-130 object-cover object-center"
            loading="lazy"
          />
        </motion.div>
      </div>
      <p className="relative z-10 pt-3 pl-0 text-left text-(length:--step-1) leading-tight font-[550] tracking-tight text-balance text-neutral-600 transition-colors duration-350 group-hover:text-white">
        {signal.text}
      </p>
      <p className="relative z-10 mt-2 max-w-lg text-left text-base tracking-tight text-pretty text-neutral-600 transition-colors duration-300 group-hover:text-white">
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
      className="hide-scroll flex gap-6 overflow-x-auto py-8 pl-8"
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
  );
}
