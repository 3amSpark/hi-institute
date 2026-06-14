import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Fragment, useRef } from "react";
import type { MotionValue } from "framer-motion";

type Props = {
  text: string;
};

type RevealLetterProps = {
  letter: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

function RevealLetter({
  letter,
  index,
  total,
  progress,
  reduceMotion,
}: RevealLetterProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useSpring(useTransform(progress, [start, end], [0.1, 1]), {
    stiffness: 160,
    damping: 28,
    mass: 1,
  });

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity: reduceMotion ? 1 : opacity }}
    >
      {letter}
    </motion.span>
  );
}

export default function ScrollRevealHeading({
  text,
}: Props) {
  const targetRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const totalLetters = Array.from(text.replaceAll(" ", "")).length;
  let letterIndex = 0;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 40%"],
  });

  return (
    <h2 ref={targetRef} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((letter, index) => {
                const currentIndex = letterIndex;
                letterIndex += 1;

                return (
                  <RevealLetter
                    key={`${letter}-${index}`}
                    letter={letter}
                    index={currentIndex}
                    total={totalLetters}
                    progress={scrollYProgress}
                    reduceMotion={reduceMotion === true}
                  />
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </h2>
  );
}
