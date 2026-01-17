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
  root: {
    marginTop: spacing["2xl"],
    marginBottom: spacing["2xl"],
  },
  single: {
    display: "grid",
    width: "100%",
    maxWidth: "100%",
    height: "600px",
    maxHeight: "600px",
    overflow: "hidden",
    position: "relative",
  },
  sideBySide: {
    display: "grid",
    gap: spacing.lg,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  item: {
    display: "grid",
    width: "100%",
    maxWidth: "100%",
    height: "600px",
    maxHeight: "600px",
    overflow: "hidden",
    position: "relative",
  },
  imageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  const isSideBySide = (slice.variation as string) === "sideBySide";

  return (
    <div {...stylex.props(styles.root)}>
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
                  <div {...stylex.props(styles.imageWrapper)}>
                    <PrismicNextImage
                      field={slice.primary.image}
                      alt={(slice.primary.image.alt || "") as ""}
                      imgixParams={{ fit: "crop" }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
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
                    <div {...stylex.props(styles.imageWrapper)}>
                      <PrismicNextImage
                        field={(slice.primary as any).image_2}
                        alt={(((slice.primary as any).image_2?.alt || "") as "")}
                        imgixParams={{ fit: "crop" }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
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
                <div {...stylex.props(styles.imageWrapper)}>
                  <PrismicNextImage
                    field={slice.primary.image}
                    alt={(slice.primary.image.alt || "") as ""}
                    imgixParams={{ fit: "crop" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </motion.div>
            )
          )}
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default ImageBlock;
