"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/slices/Wrapper";
import { spacing, animationStyles } from "@/styles/theme.stylex";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  stacked: {
    display: "grid",
    gap: spacing.lg,
    gridTemplateColumns: "1fr 1fr",
    width: "100%",
    maxWidth: "100%",
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
  const variation = slice.variation as string;
  const isSideBySide = variation === "sideBySide";
  const isStacked = variation === "stacked";
  const image1Ref = useScrollAnimation({ once: true, margin: "-50px" });
  const image2Ref = useScrollAnimation({ once: true, margin: "-50px" });
  const singleImageRef = useScrollAnimation({ once: true, margin: "-50px" });

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
                <div
                  ref={image1Ref.ref}
                  {...stylex.props(
                    styles.item,
                    animationStyles.fadeInScale,
                    animationStyles.delay1,
                    image1Ref.isVisible && animationStyles.fadeInScaleAnimated,
                  )}
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
                </div>
              )}
              {"image_2" in slice.primary &&
                isFilled.image(
                  (slice.primary as any).image_2
                ) && (
                  <div
                    ref={image2Ref.ref}
                    {...stylex.props(
                      styles.item,
                      animationStyles.fadeInScale,
                      animationStyles.delay2,
                      image2Ref.isVisible && animationStyles.fadeInScaleAnimated,
                    )}
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
                  </div>
                )}
            </div>
          ) : isStacked ? (
            <div {...stylex.props(styles.stacked)}>
              {isFilled.image(slice.primary.image) && (
                <div
                  ref={image1Ref.ref}
                  {...stylex.props(
                    styles.item,
                    animationStyles.fadeInScale,
                    animationStyles.delay1,
                    image1Ref.isVisible && animationStyles.fadeInScaleAnimated,
                  )}
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
                </div>
              )}
              {"image_2" in slice.primary &&
                isFilled.image(
                  (slice.primary as any).image_2
                ) && (
                  <div
                    ref={image2Ref.ref}
                    {...stylex.props(
                      styles.item,
                      animationStyles.fadeInScale,
                      animationStyles.delay2,
                      image2Ref.isVisible && animationStyles.fadeInScaleAnimated,
                    )}
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
                  </div>
                )}
            </div>
          ) : (
            isFilled.image(slice.primary.image) && (
              <div
                ref={singleImageRef.ref}
                {...stylex.props(
                  styles.single,
                  animationStyles.fadeInScale,
                  singleImageRef.isVisible && animationStyles.fadeInScaleAnimated,
                )}
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
              </div>
            )
          )}
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default ImageBlock;
