"use client";

import { type ReactNode } from "react";
import { motion, type MotionProps } from "motion/react";

type AnimationWrapperProps = {
  children: ReactNode;
  delay?: number;
  variant?: "fadeUp" | "fadeIn" | "fadeInScale";
} & Omit<MotionProps, "initial" | "animate" | "whileInView">;

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
};

export function AnimationWrapper({
  children,
  delay = 0,
  variant = "fadeUp",
  ...props
}: AnimationWrapperProps) {
  const animationVariant = variants[variant];

  return (
    <motion.div
      initial={animationVariant.initial}
      whileInView={animationVariant.animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
