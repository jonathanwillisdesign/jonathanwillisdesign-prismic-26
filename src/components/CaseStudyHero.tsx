"use client";

import * as stylex from "@stylexjs/stylex";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";

import { Wrapper } from "@/components/slices/Wrapper";
import { linkStyles } from "@/components/slices/Link";
import { Text } from "@/components/slices/Text";
import { spacing, animationStyles } from "@/styles/theme.stylex";

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
    maxWidth: 1200,
    paddingInline: spacing.lg,
    marginInline: "auto",
    width: "100%",
    display: "grid",
    gap: spacing.md,
    marginTop: spacing["4xl"],
    marginBottom: spacing["4xl"],
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

export function CaseStudyHero({
  title,
  description,
  heroImage,
}: CaseStudyHeroProps) {
  const descriptionTextStyles = stylex.create({
    paragraph: {
      fontFamily:
        "'Geist Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      fontSize: 28,
      lineHeight: 1.2,
      color: "rgba(250, 250, 250, 1)",
      margin: 0,
    },
  });

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
      return <PrismicNextImage field={node} alt={(node.alt || "") as ""} />;
    },
  };

  return (
    <Wrapper.Root>
      <div {...stylex.props(styles.hero)}>
        <div
          {...stylex.props(
            styles.header,
            animationStyles.fadeUp,
            animationStyles.fadeUpAnimated,
          )}
        >
          {isFilled.keyText(title) && (
            <div
              {...stylex.props(
                animationStyles.fadeUp,
                animationStyles.delay1,
                animationStyles.fadeUpAnimated,
              )}
            >
              <Text.Heading as="h1">{title}</Text.Heading>
            </div>
          )}
          {isFilled.richText(description) && (
            <div
              {...stylex.props(
                styles.description,
                animationStyles.fadeUp,
                animationStyles.delay2,
                animationStyles.fadeUpAnimated,
              )}
            >
              <PrismicRichText
                field={description}
                components={richTextComponents}
              />
            </div>
          )}
        </div>
        {isFilled.image(heroImage) && (
          <div
            {...stylex.props(
              styles.heroImage,
              animationStyles.fadeInScale,
              animationStyles.delay3,
              animationStyles.fadeInScaleAnimated,
            )}
          >
            <Wrapper.Container fullWidth>
              <div {...stylex.props(styles.imageWrapper)}>
                <PrismicNextImage
                  field={heroImage}
                  alt={(heroImage.alt || title || "") as ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </Wrapper.Container>
          </div>
        )}
      </div>
    </Wrapper.Root>
  );
}
