"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/slices/Wrapper";
import { spacing } from "@/styles/theme.stylex";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const styles = stylex.create({
  single: {
    display: "grid",
    borderRadius: 16,
    overflow: "hidden",
  },
  sideBySide: {
    display: "grid",
    gap: spacing.lg,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  item: {
    display: "grid",
    borderRadius: 16,
    overflow: "hidden",
  },
  defaultMargin: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  marginNone: {
    marginTop: 0,
    marginBottom: 0,
  },
  marginAbove: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  marginBelow: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  marginBoth: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});

const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  const isSideBySide = (slice.variation as string) === "sideBySide";
  const marginValue = slice.primary.margin || "None";
  const marginKey = marginValue.toLowerCase() as
    | "none"
    | "above"
    | "below"
    | "both";

  const marginStyles = {
    none: styles.marginNone,
    above: styles.marginAbove,
    below: styles.marginBelow,
    both: styles.marginBoth,
  };

  return (
    <div {...stylex.props(marginStyles[marginKey] || styles.defaultMargin)}>
      <Wrapper.Root
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Wrapper.Container>
          {isSideBySide ? (
            <div {...stylex.props(styles.sideBySide)}>
              {isFilled.image(slice.primary.image) && (
                <motion.div
                  {...stylex.props(styles.item)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                >
                  <PrismicNextImage
                    field={slice.primary.image}
                    alt={(slice.primary.image.alt || "") as ""}
                  />
                </motion.div>
              )}
              {"image_2" in slice.primary &&
                isFilled.image(
                  (slice.primary as any).image_2
                ) && (
                  <motion.div
                    {...stylex.props(styles.item)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2,
                    }}
                  >
                    <PrismicNextImage
                      field={(slice.primary as any).image_2}
                      alt={(((slice.primary as any).image_2?.alt || "") as "")}
                    />
                  </motion.div>
                )}
            </div>
          ) : (
            isFilled.image(slice.primary.image) && (
              <motion.div
                {...stylex.props(styles.single)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <PrismicNextImage
                  field={slice.primary.image}
                  alt={(slice.primary.image.alt || "") as ""}
                />
              </motion.div>
            )
          )}
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default ImageBlock;
