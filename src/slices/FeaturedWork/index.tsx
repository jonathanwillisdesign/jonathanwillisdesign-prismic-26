"use client";

import { FC } from "react";
import { Content, isFilled, type LinkField } from "@prismicio/client";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { AnimationWrapper } from "@/components/AnimationWrapper";
import { PrismicImage } from "@/components/PrismicImage";
import { Wrapper } from "@/components/utils/Wrapper";
import { Card } from "@/components/Card";
import {
  spacing,
  animationStyles,
  breakpoints,
} from "@/styles/theme.stylex";
import { Text } from "@/components/utils/Text";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
      <Text.Body as="span">{children}</Text.Body>
    </li>
  ),
};

/**
 * Component for "FeaturedWork" Slices.
 */
const styles = stylex.create({
  root: {
    marginTop: spacing.XXXXL,
    marginBottom: spacing.XXXXL,
  },
  itemsContainer: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.mobile]: "1fr",
    },
    gap: spacing.xl,
    rowGap: {
      default: spacing.XXL,
      [breakpoints.mobile]: spacing.xl,
    },
  },
  cardWrapper: {
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
    paddingBottom: "2.5rem", // BASE_UNIT * 10 = 40px
  },
  imageOuter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  descriptionOverride: {
    maxWidth: "90%",
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
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    once: true,
    margin: "-50px",
  });

  const delayStyle =
    index === 0
      ? null
      : index === 1
        ? animationStyles.delay1
        : index === 2
          ? animationStyles.delay2
          : animationStyles.delay3;

  return (
    <div
      key={caseStudy.id ?? `${title}-${index}`}
      ref={ref}
      {...stylex.props(
        animationStyles.fadeUp,
        delayStyle,
        isVisible && animationStyles.fadeUpAnimated,
      )}
    >
      <PrismicNextLink
        field={caseStudy as LinkField}
        {...stylex.props(styles.link)}
      >
        <Card.Root {...stylex.props(styles.cardWrapper)}>
          {isFilled.image(heroImage) && (
            <Card.Media>
              <AnimationWrapper
                variant="fadeInScale"
                scrollTrigger
                style={styles.imageOuter}
              >
                <Card.MediaContent>
                  <PrismicImage
                    field={heroImage}
                    alt={(heroImage.alt || title || "") as ""}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    fillParent
                    imageStyle={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </Card.MediaContent>
              </AnimationWrapper>
            </Card.Media>
          )}
          <Card.Body>
            {isFilled.keyText(title) && <Card.Title>{title}</Card.Title>}
            {isFilled.richText(description) && (
              <div {...stylex.props(styles.descriptionOverride)}>
                <PrismicRichText
                  field={description}
                  components={richTextComponents}
                />
              </div>
            )}
          </Card.Body>
        </Card.Root>
      </PrismicNextLink>
    </div>
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
