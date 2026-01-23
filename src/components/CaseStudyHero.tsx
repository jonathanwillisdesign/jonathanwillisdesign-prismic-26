"use client";

import * as stylex from "@stylexjs/stylex";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";

import { AnimationWrapper } from "@/components/AnimationWrapper";
import { PrismicImage } from "@/components/PrismicImage";
import { Wrapper } from "@/components/utils/Wrapper";
import { linkStyles } from "@/components/utils/Link";
import { Text } from "@/components/utils/Text";
import {
  spacing,
  typography,
  colors,
  container,
} from "@/styles/theme.stylex";

type CaseStudyHeroProps = {
  title: string | null | undefined;
  description: any;
  heroImage: any;
};

const styles = stylex.create({
  hero: {
    display: "grid",
    rowGap: spacing.xl,
    columnGap: 0,
    marginBottom: 0,
  },
  header: {
    maxWidth: container.maxWidth,
    paddingInline: spacing.lg,
    marginInline: "auto",
    width: "100%",
    display: "grid",
    gap: spacing.md,
    marginTop: spacing.XXXXL,
    marginBottom: spacing.XXXXL,
  },
  description: {
    display: "grid",
    rowGap: spacing.md,
  },
  heroImage: {
    width: "100%",
    display: "grid",
  },
  imageWrapper: {
    width: "100%",
    position: "relative",
    aspectRatio: "16 / 9",
  },
});

const descriptionTextStyles = stylex.create({
  paragraph: {
    fontFamily:
      "'Geist Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: typography.fontSizeXXXL,
    lineHeight: typography.lineHeightTight,
    color: colors.foreground,
    margin: 0,
  },
});

export function CaseStudyHero({
  title,
  description,
  heroImage,
}: CaseStudyHeroProps) {

  const richTextComponents: JSXMapSerializer = {
    paragraph: ({ children }) => (
      <p {...stylex.props(descriptionTextStyles.paragraph)}>{children}</p>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    hyperlink: ({ node, children }) => {
      return (
        <PrismicNextLink field={node.data} {...stylex.props(linkStyles.base)}>
          {children}
        </PrismicNextLink>
      );
    },
    image: ({ node }) => {
      return <PrismicImage field={node} alt={(node.alt || "") as ""} />;
    },
  };

  return (
    <Wrapper.Root>
      <div {...stylex.props(styles.hero)}>
        <div {...stylex.props(styles.header)}>
          {isFilled.keyText(title) && (
            <AnimationWrapper delay={1} variant="fadeUp" scrollTrigger={false}>
              <Text.Heading as="h1">{title}</Text.Heading>
            </AnimationWrapper>
          )}
          {isFilled.richText(description) && (
            <AnimationWrapper
              delay={2}
              variant="fadeUp"
              scrollTrigger={false}
              style={styles.description}
            >
              <PrismicRichText
                field={description}
                components={richTextComponents}
              />
            </AnimationWrapper>
          )}
        </div>
        {isFilled.image(heroImage) && (
          <AnimationWrapper
            delay={3}
            variant="fadeInScale"
            scrollTrigger={false}
            style={styles.heroImage}
          >
            <Wrapper.Container fullWidth>
              <div {...stylex.props(styles.imageWrapper)}>
                <PrismicImage
                  field={heroImage}
                  alt={(heroImage.alt || title || "") as ""}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  fillParent
                  imageStyle={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </Wrapper.Container>
          </AnimationWrapper>
        )}
      </div>
    </Wrapper.Root>
  );
}
