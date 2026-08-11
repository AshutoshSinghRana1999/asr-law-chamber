"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Easing,
} from "framer-motion";

const MOTION_EASE: Easing = [0.22, 1, 0.36, 1];

type FadeDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: FadeDirection;
  amount?: number;
  once?: boolean;
  className?: string;
}

function getInitialPosition(
  direction: FadeDirection,
  distance: number
) {
  switch (direction) {
    case "down":
      return {
        x: 0,
        y: -distance,
      };

    case "left":
      return {
        x: distance,
        y: 0,
      };

    case "right":
      return {
        x: -distance,
        y: 0,
      };

    case "none":
      return {
        x: 0,
        y: 0,
      };

    case "up":
    default:
      return {
        x: 0,
        y: distance,
      };
  }
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.75,
  distance = 28,
  direction = "up",
  amount = 0.2,
  once = true,
  className,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const initialPosition = getInitialPosition(
    direction,
    distance
  );

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              ...initialPosition,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: MOTION_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}