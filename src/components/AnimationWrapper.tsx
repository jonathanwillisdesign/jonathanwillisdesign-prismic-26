"use client";

import { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { animationStyles } from "@/styles/theme.stylex";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimationWrapperProps = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
  variant?: "fadeUp" | "fadeIn" | "fadeInScale" | "fadeInScaleSmall";
  scrollTrigger?: boolean;
  className?: string;
  style?: stylex.StyleXStyles;
};

const variantStyles = {
  fadeUp: animationStyles.fadeUp,
  fadeUpAnimated: animationStyles.fadeUpAnimated,
  fadeIn: animationStyles.fadeIn,
  fadeInAnimated: animationStyles.fadeInAnimated,
  fadeInScale: animationStyles.fadeInScale,
  fadeInScaleAnimated: animationStyles.fadeInScaleAnimated,
  fadeInScaleSmall: animationStyles.fadeInScaleSmall,
  fadeInScaleSmallAnimated: animationStyles.fadeInScaleSmallAnimated,
};

const delayStyles = {
  0: null,
  1: animationStyles.delay1,
  2: animationStyles.delay2,
  3: animationStyles.delay3,
};

export function AnimationWrapper({
  children,
  delay = 0,
  variant = "fadeUp",
  scrollTrigger = true,
  className,
  style,
}: AnimationWrapperProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    once: true,
    margin: "-50px",
  });

  const baseStyle = variantStyles[variant];
  const animatedStyle =
    variantStyles[`${variant}Animated` as keyof typeof variantStyles];
  const delayStyle = delayStyles[delay];

  return (
    <div
      ref={scrollTrigger ? ref : undefined}
      {...stylex.props(
        baseStyle,
        delayStyle,
        scrollTrigger && isVisible && animatedStyle,
        !scrollTrigger && animatedStyle, // If not scroll-triggered, animate immediately
        style,
      )}
      className={className}
    >
      {children}
    </div>
  );
}
