"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/slices/Wrapper";
import { Text } from "@/components/slices/Text";
import { colors, spacing } from "@/styles/theme.stylex";

/**
 * Props for `HomeHero`.
 */
export type HomeHeroProps = SliceComponentProps<Content.HomeHeroSlice>;

/**
 * Component for "HomeHero" Slices.
 */
const styles = stylex.create({
  root: {
    marginTop: spacing["4xl"],
    marginBottom: spacing["4xl"],
  },
  hero: {
    display: "grid",
    gap: spacing.xl,
  },
  header: {
    display: "grid",
    gap: spacing.md,
  },
  media: {
    width: 160,
    height: 160,
    borderRadius: 999,
    overflow: "hidden",
    position: "relative",
    aspectRatio: "1 / 1",
  },
  links: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  linkBase: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.sm,
    paddingBlock: 10,
    paddingInline: spacing.md,
    borderRadius: 999,
    border: `1px solid ${colors.border}`,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    color: colors.foreground,
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  linkPrimary: {
    backgroundColor: colors.foreground,
    color: colors.background,
    ":hover": {
      backgroundColor: colors.foregroundSecondary,
      borderColor: colors.foregroundSecondary,
      transform: "translateY(-1px)",
    },
  },
  linkSecondary: {
    backgroundColor: colors.backgroundSecondary,
    ":hover": {
      backgroundColor: colors.border,
      borderColor: colors.foregroundSecondary,
      transform: "translateY(-1px)",
    },
  },
});

const HomeHero: FC<HomeHeroProps> = ({ slice }) => {
  return (
    <div {...stylex.props(styles.root)}>
      <Wrapper.Root
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Wrapper.Container>
          <div {...stylex.props(styles.hero)}>
            <div {...stylex.props(styles.header)}>
              {isFilled.image(slice.primary.headshot) && (
                <motion.div
                  {...stylex.props(styles.media)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                >
                  <PrismicNextImage
                    field={slice.primary.headshot}
                    alt={(slice.primary.headshot.alt || "") as ""}
                    fill
                    sizes="160px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </motion.div>
              )}
              {isFilled.keyText(slice.primary.statement) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                  }}
                >
                  <Text.Heading as="h1">{slice.primary.statement}</Text.Heading>
                </motion.div>
              )}
            </div>
            {isFilled.repeatable(slice.primary.links) && (
              <motion.div
                {...stylex.props(styles.links)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3,
                }}
              >
                {slice.primary.links.map((link, index) => {
                  if (!isFilled.link(link)) {
                    return null;
                  }

                  const isPrimary = link.variant === "Primary";
                  return (
                    <PrismicNextLink
                      key={`${link.text ?? link.url ?? "link"}-${index}`}
                      field={link}
                      {...stylex.props(
                        styles.linkBase,
                        isPrimary ? styles.linkPrimary : styles.linkSecondary,
                      )}
                    >
                      {link.text ?? ""}
                    </PrismicNextLink>
                  );
                })}
              </motion.div>
            )}
          </div>
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default HomeHero;
