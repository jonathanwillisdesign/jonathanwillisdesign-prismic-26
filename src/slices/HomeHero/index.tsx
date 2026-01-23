"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { PrismicImage } from "@/components/PrismicImage";
import { Wrapper } from "@/components/utils/Wrapper";
import { Text } from "@/components/utils/Text";
import {
  colors,
  spacing,
  animationStyles,
  typography,
  dimensions,
  borderRadius,
} from "@/styles/theme.stylex";
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
    marginTop: spacing.XXXXL,
    marginBottom: spacing.XXXXL,
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
    width: dimensions.avatar,
    height: dimensions.avatar,
    borderRadius: borderRadius.full,
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
    paddingBlock: "0.625rem", // BASE_UNIT * 2.5 = 10px
    paddingInline: spacing.md,
    borderRadius: borderRadius.full,
    border: `1px solid ${colors.border}`,
    textDecoration: "none",
    fontSize: typography.fontSizeSM,
    fontWeight: 600,
    color: colors.foreground,
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  linkPrimary: {
    backgroundColor: {
      default: colors.foreground,
      ":hover": colors.foregroundSecondary,
    },
    color: colors.background,
    borderColor: {
      default: colors.border,
      ":hover": colors.foregroundSecondary,
    },
    transform: {
      default: "none",
      ":hover": "translateY(-1px)",
    },
  },
  linkSecondary: {
    backgroundColor: {
      default: colors.backgroundSecondary,
      ":hover": colors.border,
    },
    borderColor: {
      default: colors.border,
      ":hover": colors.foregroundSecondary,
    },
    transform: {
      default: "none",
      ":hover": "translateY(-1px)",
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
                  <PrismicImage
                    field={slice.primary.headshot}
                    alt={(slice.primary.headshot.alt || "") as ""}
                    sizes={dimensions.avatar}
                    fillParent
                    imageStyle={{
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
