import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { Layout } from "@/components/slices/Layout";
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
  const isSideBySide = slice.variation === "sideBySide";
  const marginValue = slice.primary.margin || "None";
  const marginKey = marginValue.toLowerCase() as "none" | "above" | "below" | "both";
  
  const marginStyles = {
    none: styles.marginNone,
    above: styles.marginAbove,
    below: styles.marginBelow,
    both: styles.marginBoth,
  };

  return (
    <Layout.Root
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      {...stylex.props(marginStyles[marginKey] || styles.defaultMargin)}
    >
      <Layout.Container>
        {isSideBySide ? (
          <div {...stylex.props(styles.sideBySide)}>
            {isFilled.image(slice.primary.image) && (
              <div {...stylex.props(styles.item)}>
                <PrismicNextImage
                  field={slice.primary.image}
                  fallbackAlt=""
                />
              </div>
            )}
            {isFilled.image(slice.primary.image_2) && (
              <div {...stylex.props(styles.item)}>
                <PrismicNextImage
                  field={slice.primary.image_2}
                  fallbackAlt=""
                />
              </div>
            )}
          </div>
        ) : (
          isFilled.image(slice.primary.image) && (
            <div {...stylex.props(styles.single)}>
              <PrismicNextImage
                field={slice.primary.image}
                fallbackAlt=""
              />
            </div>
          )
        )}
      </Layout.Container>
    </Layout.Root>
  );
};

export default ImageBlock;
