import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { Layout } from "@/components/slices/Layout";
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
  },
  linkPrimary: {
    backgroundColor: colors.foreground,
    color: colors.background,
  },
  linkSecondary: {
    backgroundColor: colors.backgroundSecondary,
  },
});

const HomeHero: FC<HomeHeroProps> = ({ slice }) => {
  return (
    <Layout.Root
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      {...stylex.props(styles.root)}
    >
      <Layout.Container>
        <div {...stylex.props(styles.hero)}>
          <div {...stylex.props(styles.header)}>
            {isFilled.image(slice.primary.headshot) && (
              <div {...stylex.props(styles.media)}>
                <PrismicNextImage
                  field={slice.primary.headshot}
                  fill
                  sizes="160px"
                  fallbackAlt=""
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            )}
            {isFilled.keyText(slice.primary.statement) && (
              <Text.Heading as="h1">{slice.primary.statement}</Text.Heading>
            )}
          </div>
          {isFilled.repeatable(slice.primary.links) && (
            <div {...stylex.props(styles.links)}>
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
            </div>
          )}
        </div>
      </Layout.Container>
    </Layout.Root>
  );
};

export default HomeHero;
