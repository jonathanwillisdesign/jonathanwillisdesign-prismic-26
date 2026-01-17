"use client";

import { FC, useState } from "react";
import { Content, isFilled, type LinkField } from "@prismicio/client";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/slices/Wrapper";
import {
  spacing,
  colors,
  typography,
  borderRadius,
} from "@/styles/theme.stylex";
import { Text } from "@/components/slices/Text";

/**
 * Props for `FeaturedWork`.
 */
export type FeaturedWorkProps = SliceComponentProps<Content.FeaturedWorkSlice>;

const richTextStyles = stylex.create({
  list: {
    paddingInlineStart: "1.1em",
    margin: 0,
    display: "grid",
    rowGap: spacing.xs,
  },
  listItem: {
    listStylePosition: "outside",
  },
});

const richTextComponents: JSXMapSerializer = {
  list: ({ children }) => (
    <ul {...stylex.props(richTextStyles.list)}>{children}</ul>
  ),
  oList: ({ children }) => (
    <ol {...stylex.props(richTextStyles.list)}>{children}</ol>
  ),
  listItem: ({ children }) => (
    <li {...stylex.props(richTextStyles.listItem)}>
      <Text.Body as="span" style={{ fontSize: 16 }}>
        {children}
      </Text.Body>
    </li>
  ),
};

/**
 * Component for "FeaturedWork" Slices.
 */
const styles = stylex.create({
  root: {
    marginTop: spacing["4xl"],
    marginBottom: spacing["4xl"],
  },
  itemsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: spacing.xl,
    rowGap: spacing["2xl"],
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      rowGap: spacing.xl,
    },
  },
  itemWrapper: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: spacing.md,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
    paddingBottom: "40px",
  },
  textColumn: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.subheadingSize,
    fontWeight: 500,
    margin: 0,
    color: colors.foreground,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  description: {
    fontSize: 16,
    lineHeight: typography.bodyLineHeight,
    color: colors.foregroundSecondary,
    margin: 0,
    maxWidth: "90%",
  },
  imageColumn: {
    position: "relative",
    width: "100%",
    height: "360px",
    overflow: "hidden",
  },
  imageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.5s ease",
  },
  imageWrapperHover: {
    transform: "scale(1.05)",
  },
  titleContainer: {
    marginTop: spacing.md,
  },
});

type CardItemProps = {
  index: number;
  caseStudy: any;
  title: string | null | undefined;
  description: any;
  heroImage: any;
};

const CardItem: FC<CardItemProps> = ({
  index,
  caseStudy,
  title,
  description,
  heroImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={caseStudy.id ?? `${title}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
    >
      <PrismicNextLink
        field={caseStudy as LinkField}
        {...stylex.props(styles.link)}
      >
        <div
          {...stylex.props(styles.itemWrapper)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isFilled.image(heroImage) && (
            <div {...stylex.props(styles.imageColumn)}>
              <div
                {...stylex.props(
                  styles.imageWrapper,
                  isHovered && styles.imageWrapperHover,
                )}
              >
                <PrismicNextImage
                  field={heroImage}
                  alt={(heroImage.alt || title || "") as ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          )}
          <div {...stylex.props(styles.textColumn)}>
            {isFilled.keyText(title) && (
              <h2 {...stylex.props(styles.title)}>{title}</h2>
            )}
            {isFilled.richText(description) && (
              <div {...stylex.props(styles.description)}>
                <PrismicRichText
                  field={description}
                  components={richTextComponents}
                />
              </div>
            )}
          </div>
        </div>
      </PrismicNextLink>
    </motion.div>
  );
};

const FeaturedWork: FC<FeaturedWorkProps> = ({ slice }) => {
  if (!isFilled.group(slice.primary.case_studies)) {
    return null;
  }

  const validCaseStudies = slice.primary.case_studies
    .map((item) => {
      const caseStudy = item.case_study;
      if (!isFilled.contentRelationship(caseStudy)) {
        return null;
      }
      return caseStudy;
    })
    .filter(
      (caseStudy): caseStudy is NonNullable<typeof caseStudy> =>
        caseStudy !== null,
    );

  if (validCaseStudies.length === 0) {
    return null;
  }

  return (
    <div {...stylex.props(styles.root)}>
      <Wrapper.Root
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Wrapper.Container>
          <Wrapper.Body>
            <div {...stylex.props(styles.itemsContainer)}>
              {validCaseStudies.map((caseStudy, index) => {
                // Access data from the filled content relationship
                // After isFilled.contentRelationship check, data is guaranteed to exist
                const caseStudyAny = caseStudy as any;

                // The data property exists on a filled content relationship
                const caseStudyData = caseStudyAny.data;

                // Extract fields - these match the model.json fields array
                const title = caseStudyData?.title;
                const description = caseStudyData?.description;
                const heroImage = caseStudyData?.hero_image;

                return (
                  <CardItem
                    key={caseStudyAny.id ?? `${title ?? "case-study"}-${index}`}
                    index={index}
                    caseStudy={caseStudyAny}
                    title={title}
                    description={description}
                    heroImage={heroImage}
                  />
                );
              })}
            </div>
          </Wrapper.Body>
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default FeaturedWork;
