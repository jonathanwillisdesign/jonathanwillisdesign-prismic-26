"use client";

import { PrismicNextImage } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";
import {
  type ComponentProps,
  type CSSProperties,
  useMemo,
  useState,
} from "react";

// Keep this a fixed dark gray so images always have a stable backing
// (even in light theme) while loading.
const IMAGE_PLACEHOLDER_COLOR = "#1a1a1a";

type PrismicNextImageBaseProps = ComponentProps<typeof PrismicNextImage>;

export type PrismicImageProps = Omit<PrismicNextImageBaseProps, "fill"> & {
  /**
   * If true, the wrapper will fill the parent's height/width (useful when the
   * parent already defines sizing, e.g. fixed height or aspect-ratio wrapper).
   */
  fillParent?: boolean;
  /**
   * Optional CSS aspect-ratio override for the wrapper (e.g. `"16 / 9"`).
   * If omitted and the Prismic image field includes dimensions, those are used.
   */
  aspectRatio?: string;
  /**
   * Optional styles applied to the wrapper div (not the img).
   */
  wrapperStyle?: CSSProperties;
  /**
   * Optional styles applied to the underlying image element.
   */
  imageStyle?: CSSProperties;
};

const styles = stylex.create({
  wrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
  fillParent: {
    height: "100%",
  },
  image: {
    opacity: 0,
    transition: {
      default: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  imageLoaded: {
    opacity: 1,
  },
  placeholder: {
    position: "absolute",
    inset: 0,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
    opacity: 1,
    transition: {
      default: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      "@media (prefers-reduced-motion: reduce)": "none",
    },
  },
  placeholderHidden: {
    opacity: 0,
  },
});

export function PrismicImage({
  fillParent = false,
  aspectRatio,
  wrapperStyle,
  imageStyle,
  onLoad,
  ...props
}: PrismicImageProps) {
  const fieldAny = (props as any).field;
  const propAlt = (props as any).alt;
  const fieldAlt = fieldAny?.alt;


  const [isLoaded, setIsLoaded] = useState(false);

  const computedAspectRatio = useMemo(() => {
    if (aspectRatio) return aspectRatio;

    const w = fieldAny?.dimensions?.width;
    const h = fieldAny?.dimensions?.height;
    if (typeof w === "number" && typeof h === "number" && w > 0 && h > 0) {
      return `${w} / ${h}`;
    }

    return undefined;
  }, [aspectRatio, props]);

  const stylexImageProps = stylex.props(
    styles.image,
    isLoaded && styles.imageLoaded,
  );
  const originalClassName = (props as any).className as string | undefined;
  const originalStyle = (props as any).style as CSSProperties | undefined;
  const nextImageProps = {
    ...(props as PrismicNextImageBaseProps),
  } as PrismicNextImageBaseProps;
  const nextAlt = (nextImageProps as any).alt;
  const shouldStripAlt = typeof nextAlt === "string" && nextAlt.length > 0;

  if (shouldStripAlt) {
    (nextImageProps as { alt?: string }).alt = "";
  }


  return (
    <div
      {...stylex.props(styles.wrapper, fillParent && styles.fillParent)}
      style={{
        ...(computedAspectRatio ? { aspectRatio: computedAspectRatio } : null),
        ...wrapperStyle,
      }}
    >
      <div
        aria-hidden="true"
        {...stylex.props(
          styles.placeholder,
          isLoaded && styles.placeholderHidden,
        )}
      />
      <PrismicNextImage
        {...nextImageProps}
        fill
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        className={
          originalClassName
            ? `${stylexImageProps.className} ${originalClassName}`
            : stylexImageProps.className
        }
        style={{ ...(originalStyle ?? null), ...(imageStyle ?? null) }}
      />
    </div>
  );
}
