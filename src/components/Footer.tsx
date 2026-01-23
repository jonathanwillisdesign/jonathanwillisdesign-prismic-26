"use client";

import * as stylex from "@stylexjs/stylex";
import {
  colors,
  spacing,
  animationStyles,
  typography,
  container,
  breakpoints,
} from "@/styles/theme.stylex";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const footerStyles = stylex.create({
  footer: {
    width: "100%",
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    marginTop: "auto",
  },
  container: {
    maxWidth: container.maxWidth,
    margin: "0 auto",
    padding: {
      default: `${spacing.xl} ${spacing.lg}`,
      [breakpoints.mobile]: `${spacing.lg} ${spacing.md}`,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.md,
  },
  text: {
    color: colors.foregroundMuted,
    fontSize: {
      default: typography.fontSizeSM,
      [breakpoints.mobile]: typography.fontSizeXS,
    },
    textAlign: "center",
  },
  links: {
    display: "flex",
    gap: {
      default: spacing.lg,
      [breakpoints.mobile]: spacing.md,
    },
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    color: {
      default: colors.foregroundMuted,
      ":hover": colors.foreground,
    },
    textDecoration: "none",
    fontSize: {
      default: typography.fontSizeSM,
      [breakpoints.mobile]: typography.fontSizeXS,
    },
    transition: "color 0.2s ease",
  },
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useScrollAnimation<HTMLElement>({
    once: true,
    margin: "-50px",
  });
  const linksRef = useScrollAnimation<HTMLDivElement>({
    once: true,
    margin: "-50px",
  });
  const textRef = useScrollAnimation<HTMLParagraphElement>({
    once: true,
    margin: "-50px",
  });

  return (
    <footer
      ref={footerRef.ref}
      {...stylex.props(
        footerStyles.footer,
        animationStyles.fadeIn,
        footerRef.isVisible && animationStyles.fadeInAnimated,
      )}
    >
      <div {...stylex.props(footerStyles.container)}>
        <div
          ref={linksRef.ref}
          {...stylex.props(
            footerStyles.links,
            animationStyles.fadeUp,
            animationStyles.delay1,
            linksRef.isVisible && animationStyles.fadeUpAnimated,
          )}
        >
          <a href="/" {...stylex.props(footerStyles.link)}>
            Home
          </a>
          <a href="/about" {...stylex.props(footerStyles.link)}>
            About
          </a>
          <a href="/contact" {...stylex.props(footerStyles.link)}>
            Contact
          </a>
        </div>
        <p
          ref={textRef.ref}
          {...stylex.props(
            footerStyles.text,
            animationStyles.fadeUp,
            animationStyles.delay2,
            textRef.isVisible && animationStyles.fadeUpAnimated,
          )}
        >
          © {currentYear} Jonathan Willis design. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
