"use client";

import { FC, useMemo } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";

import { PrismicImage } from "@/components/PrismicImage";
import { spacing } from "@/styles/theme.stylex";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const styles = stylex.create({
  root: {
    width: "100%",
    marginTop: spacing["4xl"],
    marginBottom: spacing["4xl"],
    overflow: "hidden",
  },
  carousel: {
    display: "flex",
    width: "fit-content",
  },
  imageItem: {
    flexShrink: 0,
    width: "300px",
    aspectRatio: "1 / 1",
    marginRight: spacing.md,
    overflow: "hidden",
    "@media (max-width: 768px)": {
      width: "250px",
    },
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
});

const Carousel: FC<CarouselProps> = ({ slice }) => {
  const images = useMemo(() => {
    if (!isFilled.group(slice.primary.images)) {
      return [];
    }

    return slice.primary.images
      .map((item) => item.image)
      .filter((image): image is NonNullable<typeof image> =>
        isFilled.image(image),
      );
  }, [slice.primary.images]);

  if (images.length === 0) {
    return null;
  }

  // Calculate duplication count based on number of images
  // Fewer images need more duplicates to feel endless
  const duplicationCount =
    images.length === 1
      ? 5 // 1 image: duplicate 5 times (6 total sets)
      : images.length >= 2 && images.length <= 3
        ? 3 // 2-3 images: duplicate 3 times (4 total sets)
        : 2; // 4+ images: duplicate 2 times (3 total sets)

  // Create duplicated array for seamless infinite loop
  const duplicatedImages = Array(duplicationCount + 1)
    .fill(null)
    .flatMap(() => images);

  // Calculate the width of one set of images
  // Each image is 300px + 16px margin (spacing.md) on desktop
  // On mobile, 250px + 16px margin
  const imageWidthDesktop = 300 + 16; // width + margin

  // Calculate translate distance: move by one full set of images
  const translateDistance = images.length * imageWidthDesktop;

  return (
    <div {...stylex.props(styles.root)}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <motion.div
          {...stylex.props(styles.carousel)}
          animate={{
            x: -translateDistance,
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.url || ""}-${index}`}
              {...stylex.props(styles.imageItem)}
            >
              <div {...stylex.props(styles.imageWrapper)}>
                <PrismicImage
                  field={image}
                  alt={(image.alt || "") as ""}
                  fillParent
                  imgixParams={{ fit: "crop" }}
                  imageStyle={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Carousel;
