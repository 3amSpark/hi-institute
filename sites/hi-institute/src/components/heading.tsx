import type { ReactNode } from "react";
import FadeIn from "./fade-in";

type HeadingSize = "-2" | "-1" | "0" | "1" | "2" | "3" | "4" | "5";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
  delay?: number;
};

const sizeClassName: Record<HeadingSize, string> = {
  "-2": "text-(length:--step--2)",
  "-1": "text-(length:--step--1)",
  "0": "text-(length:--step-0)",
  "1": "text-(length:--step-1)",
  "2": "text-(length:--step-2)",
  "3": "text-(length:--step-3)",
  "4": "text-(length:--step-4)",
  "5": "text-(length:--step-5)",
};

export default function Heading({
  as = "h2",
  size = "1",
  children,
  className = "",
  delay,
}: HeadingProps) {
  return (
    <FadeIn
      as={as}
      delay={delay}
      className={`font-sans leading-tight font-medium ${sizeClassName[size]} ${className}`}
    >
      {children}
    </FadeIn>
  );
}
