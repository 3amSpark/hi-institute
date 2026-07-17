import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type FounderImageRevealProps = {
  image: {
    src: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
  };
};

export default function FounderImageReveal({
  image,
}: FounderImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-5%", "5%"],
  );

  return (
    <div ref={ref} className="relative h-svh overflow-hidden">
      <motion.img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.sizes}
        width={image.width}
        height={image.height}
        alt="Dr. Herbert Maradiaga"
        className="absolute -top-[10%] inset-x-0 h-[120%] w-full object-cover object-center"
        loading="lazy"
        style={{ y: imageY }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20" />

      <h2
        className="text-massive absolute inset-x-4 top-1/2 -translate-y-1/2 text-center font-semibold tracking-widest text-balance text-white uppercase md:top-1/2"
      >
        Feel Better Than Ever
      </h2>
    </div>
  );
}
