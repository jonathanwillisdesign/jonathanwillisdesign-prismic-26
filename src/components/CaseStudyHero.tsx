"use client";

import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";

import { Wrapper } from "@/components/slices/Wrapper";
import { linkStyles } from "@/components/slices/Link";
import { Text } from "@/components/slices/Text";
import { spacing } from "@/styles/theme.stylex";

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
        <motion.div
          {...stylex.props(styles.header)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {isFilled.keyText(title) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
            >
              <Text.Heading as="h1">{title}</Text.Heading>
            </motion.div>
          )}
          {isFilled.richText(description) && (
            <motion.div
              {...stylex.props(styles.description)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              <PrismicRichText
                field={description}
                components={richTextComponents}
              />
            </motion.div>
          )}
        </motion.div>
        {isFilled.image(heroImage) && (
          <motion.div
            {...stylex.props(styles.heroImage)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }}
          >
            <Wrapper.Container fullWidth>
              <div {...stylex.props(styles.imageWrapper)}>
                <PrismicNextImage
                  field={heroImage}
                  alt={heroImage.alt ?? title ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </Wrapper.Container>
          </motion.div>
        )}
      </div>
    </Wrapper.Root>
  );
}
