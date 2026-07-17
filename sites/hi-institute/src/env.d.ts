/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "fade-in": HTMLAttributes<HTMLElement> & {
        delay?: number | string;
        "mobile-delay"?: number | string;
      };
    }
  }
}
