"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Dialog } from "@base-ui/react/dialog";
import { PrismicNextLink } from "@prismicio/next";
import { colors, spacing, animationStyles } from "@/styles/theme.stylex";

const MOBILE_BREAKPOINT = "@media (max-width: 768px)";

const headerStyles = stylex.create({
  header: {
    width: "100%",
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `${spacing.md} ${spacing.lg}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "20px",
    fontWeight: 600,
    color: colors.foreground,
    textDecoration: "none",
    zIndex: 2,
  },
  nav: {
    display: "flex",
    gap: spacing.lg,
    alignItems: "center",
    [MOBILE_BREAKPOINT]: {
      display: "none",
    },
  },
  navLink: {
    color: colors.foregroundSecondary,
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s ease",
    ":hover": {
      color: colors.foreground,
    },
  },
  burgerButton: {
    display: "none",
    [MOBILE_BREAKPOINT]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      backgroundColor: colors.backgroundSecondary,
      border: "none",
      borderRadius: "999px",
      color: colors.foreground,
      cursor: "pointer",
      padding: spacing.sm,
      zIndex: 2,
      overflow: "visible",
      transition:
        "opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
      ":hover": {
        opacity: 0.7,
      },
    },
  },
  burgerIcon: {
    width: "24px",
    height: "24px",
    display: "block",
    overflow: "visible",
  },
  burgerCircle: {
    transformOrigin: "center",
    transformBox: "fill-box",
    transform: "scale(1)",
    opacity: 0.85,
    transition:
      "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  burgerCircleOpen: {
    transform: "scale(2.6)",
    opacity: 1,
  },
  dialogBackdrop: {
    display: "none",
    position: "fixed",
    inset: 0,
    zIndex: 80,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    [MOBILE_BREAKPOINT]: {
      display: "block",
    },
    opacity: 1,
    transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    ":is([data-starting-style])": {
      opacity: 0,
    },
    ":is([data-ending-style])": {
      opacity: 0,
    },
  },
  dialogViewport: {
    display: "none",
    position: "fixed",
    inset: 0,
    zIndex: 90,
    alignItems: "flex-start",
    justifyContent: "stretch",
    paddingTop: "72px",
    [MOBILE_BREAKPOINT]: {
      display: "flex",
    },
    pointerEvents: "none",
  },
  dialogPopup: {
    width: "100%",
    height: "calc(100dvh - 72px)",
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.border}`,
    padding: spacing.lg,
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    overflowY: "auto",
    transition:
      "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    transform: "translateY(0)",
    opacity: 1,
    pointerEvents: "auto",
    ":is([data-starting-style])": {
      transform: "translateY(-12px)",
      opacity: 0,
    },
    ":is([data-ending-style])": {
      transform: "translateY(-8px)",
      opacity: 0,
    },
  },
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  },
  mobileNavLink: {
    color: colors.foregroundSecondary,
    textDecoration: "none",
    fontSize: "16px",
    padding: `${spacing.sm} 0`,
    transition: "color 0.2s ease",
    ":hover": {
      color: colors.foreground,
    },
  },
});

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      {...stylex.props(
        headerStyles.header,
        animationStyles.fadeDown,
        animationStyles.fadeDownAnimated,
      )}
    >
      <div {...stylex.props(headerStyles.container)}>
        <PrismicNextLink
          href="/"
          {...stylex.props(
            headerStyles.logo,
            animationStyles.fadeIn,
            animationStyles.delay1,
            animationStyles.fadeInAnimated,
          )}
        >
          Jonathan Willis
        </PrismicNextLink>
        <nav
          {...stylex.props(
            headerStyles.nav,
            animationStyles.fadeIn,
            animationStyles.delay2,
            animationStyles.fadeInAnimated,
          )}
        >
          <PrismicNextLink href="/about" {...stylex.props(headerStyles.navLink)}>
            About
          </PrismicNextLink>
          <PrismicNextLink
            href="/contact"
            {...stylex.props(headerStyles.navLink)}
          >
            Contact
          </PrismicNextLink>
        </nav>
        <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <Dialog.Trigger
            {...stylex.props(headerStyles.burgerButton)}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              {...stylex.props(headerStyles.burgerIcon)}
            >
              <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                {...stylex.props(
                  headerStyles.burgerCircle,
                  isMenuOpen && headerStyles.burgerCircleOpen,
                )}
              />
            </svg>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Backdrop {...stylex.props(headerStyles.dialogBackdrop)} />
            <Dialog.Viewport {...stylex.props(headerStyles.dialogViewport)}>
              <Dialog.Popup {...stylex.props(headerStyles.dialogPopup)}>
                <nav {...stylex.props(headerStyles.mobileNav)}>
                  <PrismicNextLink
                    href="/about"
                    {...stylex.props(headerStyles.mobileNavLink)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </PrismicNextLink>
                  <PrismicNextLink
                    href="/contact"
                    {...stylex.props(headerStyles.mobileNavLink)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </PrismicNextLink>
                </nav>
              </Dialog.Popup>
            </Dialog.Viewport>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
