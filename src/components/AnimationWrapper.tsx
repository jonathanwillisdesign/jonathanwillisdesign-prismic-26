"use client";

import { type ReactNode, useEffect, useState } from "react";
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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    once: true,
    margin: "-50px",
  });

  const baseStyle = variantStyles[variant];
  const animatedStyle =
    variantStyles[`${variant}Animated` as keyof typeof variantStyles];
  const delayStyle = delayStyles[delay];

  const stylexProps = stylex.props(
    baseStyle,
    delayStyle,
    scrollTrigger && isVisible && animatedStyle,
    !scrollTrigger && hasMounted && animatedStyle, // animate after mount (no observer)
    style,
  );

  return (
    <div
      ref={scrollTrigger ? ref : undefined}
      {...stylexProps}
      className={
        className
          ? `${stylexProps.className ?? ""} ${className}`
          : stylexProps.className
      }
    >
      {children}
    </div>
  );
}
