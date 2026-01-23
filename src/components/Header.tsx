"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Dialog } from "@base-ui/react/dialog";
import { List, X } from "@phosphor-icons/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled, type LinkField } from "@prismicio/client";
import {
  colors,
  spacing,
  typography,
  zIndex,
  container,
  borderRadius,
  breakpoints,
} from "@/styles/theme.stylex";

const headerStyles = stylex.create({
  header: {
    width: "100%",
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    position: "sticky",
    top: 0,
    zIndex: zIndex["100"],
    // Keep sticky header on its own layer to avoid repaint flicker on navigation/scroll.
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
  },
  container: {
    maxWidth: container.maxWidth,
    margin: "0 auto",
    padding: `${spacing.md} ${spacing.lg}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: {
      default: typography.fontSizeXL,
      [breakpoints.mobile]: typography.fontSizeM,
    },
    fontWeight: 600,
    color: colors.foreground,
    textDecoration: "none",
    zIndex: zIndex["2"],
  },
  nav: {
    display: {
      default: "flex",
      [breakpoints.mobile]: "none",
    },
    gap: spacing.lg,
    alignItems: "center",
  },
  navLink: {
    color: {
      default: colors.foregroundSecondary,
      ":hover": colors.foreground,
    },
    textDecoration: "none",
    fontSize: {
      default: typography.fontSizeSM,
      [breakpoints.mobile]: typography.fontSizeXS,
    },
    transition: "color 0.2s ease",
  },
  burgerButton: {
    display: {
      default: "none",
      [breakpoints.mobile]: "flex",
    },
    alignItems: "center",
    justifyContent: "center",
    width: {
      default: "2.5rem",
      [breakpoints.mobile]: "2.5rem",
    },
    height: {
      default: "2.5rem",
      [breakpoints.mobile]: "2.5rem",
    },
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: borderRadius.none,
    backgroundColor: "transparent",
    color: colors.foreground,
    cursor: "pointer",
    padding: spacing.sm,
    zIndex: zIndex["2"],
    overflow: "visible",
    opacity: {
      default: 1,
      ":hover": 0.7,
    },
    transition: "opacity 0.2s ease",
    outline: {
      default: "none",
      ":focus": "none",
      ":focus-visible": "none",
    },
    boxShadow: {
      default: "none",
      ":focus": "none",
      ":focus-visible": "none",
    },
    WebkitTapHighlightColor: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  },
  icon: {
    width: "1.5rem",
    height: "1.5rem",
    display: "block",
  },
  dialogBackdrop: {
    display: {
      default: "none",
      [breakpoints.mobile]: "block",
    },
    position: "fixed",
    inset: 0,
    zIndex: zIndex["50"],
    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
    display: {
      default: "none",
      [breakpoints.mobile]: "flex",
    },
    position: "fixed",
    inset: 0,
    zIndex: zIndex["50"],
    alignItems: "flex-start",
    justifyContent: "stretch",
    paddingTop: {
      default: "4.5rem",
      [breakpoints.mobile]: "4.5rem",
    },
    pointerEvents: "none",
  },
  dialogPopup: {
    width: "100%",
    height: "calc(100dvh - 4.5rem)",
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
    color: {
      default: colors.foregroundSecondary,
      ":hover": colors.foreground,
    },
    textDecoration: "none",
    fontSize: typography.fontSizeSM,
    padding: `${spacing.sm} 0`,
    transition: "color 0.2s ease",
  },
});

type HeaderProps = {
  name: string;
  links: LinkField[];
};

export default function Header({ name, links }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header {...stylex.props(headerStyles.header)}>
      <div {...stylex.props(headerStyles.container)}>
        <PrismicNextLink
          href="/"
          {...stylex.props(headerStyles.logo)}
          onClick={() => setIsMenuOpen(false)}
        >
          {name}
        </PrismicNextLink>
        {links && links.length > 0 && (
          <nav {...stylex.props(headerStyles.nav)}>
            {links.map((link, index) => {
              if (!isFilled.link(link)) {
                return null;
              }
              return (
                <PrismicNextLink
                  key={`${link.text ?? link.url ?? "link"}-${index}`}
                  field={link}
                  {...stylex.props(headerStyles.navLink)}
                >
                  {link.text ?? ""}
                </PrismicNextLink>
              );
            })}
          </nav>
        )}
        {links && links.length > 0 && (
          <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <Dialog.Trigger
              {...stylex.props(headerStyles.burgerButton)}
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" {...stylex.props(headerStyles.icon)} />
              ) : (
                <List aria-hidden="true" {...stylex.props(headerStyles.icon)} />
              )}
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop {...stylex.props(headerStyles.dialogBackdrop)} />
              <Dialog.Viewport {...stylex.props(headerStyles.dialogViewport)}>
                <Dialog.Popup {...stylex.props(headerStyles.dialogPopup)}>
                  <nav {...stylex.props(headerStyles.mobileNav)}>
                    {links.map((link, index) => {
                      if (!isFilled.link(link)) {
                        return null;
                      }
                      return (
                        <PrismicNextLink
                          key={`${link.text ?? link.url ?? "link"}-${index}`}
                          field={link}
                          {...stylex.props(headerStyles.mobileNavLink)}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.text ?? ""}
                        </PrismicNextLink>
                      );
                    })}
                  </nav>
                </Dialog.Popup>
              </Dialog.Viewport>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>
    </header>
  );
}
