"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/slices/Wrapper";
import { Text } from "@/components/slices/Text";
import { colors, spacing, animationStyles } from "@/styles/theme.stylex";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const headshotRef = useScrollAnimation<HTMLDivElement>({ once: true });
  const statementRef = useScrollAnimation<HTMLDivElement>({ once: true });
  const linksRef = useScrollAnimation<HTMLDivElement>({ once: true });

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
                <div
                  ref={headshotRef.ref}
                  {...stylex.props(
                    styles.media,
                    animationStyles.fadeInScaleSmall,
                    animationStyles.delay1,
                    headshotRef.isVisible &&
                      animationStyles.fadeInScaleSmallAnimated,
                  )}
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
                </div>
              )}
              {isFilled.keyText(slice.primary.statement) && (
                <div
                  ref={statementRef.ref}
                  {...stylex.props(
                    animationStyles.fadeUp,
                    animationStyles.delay2,
                    statementRef.isVisible && animationStyles.fadeUpAnimated,
                  )}
                >
                  <Text.Heading as="h1">{slice.primary.statement}</Text.Heading>
                </div>
              )}
            </div>
            {isFilled.repeatable(slice.primary.links) && (
              <div
                ref={linksRef.ref}
                {...stylex.props(
                  styles.links,
                  animationStyles.fadeUp,
                  animationStyles.delay3,
                  linksRef.isVisible && animationStyles.fadeUpAnimated,
                )}
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
              </div>
            )}
          </div>
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default HomeHero;
