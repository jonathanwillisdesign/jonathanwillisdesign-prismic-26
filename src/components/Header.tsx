"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Dialog } from "@base-ui/react/dialog";
import { List, X } from "@phosphor-icons/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled, type LinkField } from "@prismicio/client";
import { colors, spacing } from "@/styles/theme.stylex";

const MOBILE_BREAKPOINT = "@media (max-width: 768px)";

const headerStyles = stylex.create({
  header: {
    width: "100%",
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    position: "sticky",
    top: 0,
    zIndex: 100,
    // Keep sticky header on its own layer to avoid repaint flicker on navigation/scroll.
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
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
      border: "none",
      borderRadius: "0px",
      backgroundColor: "transparent",
      color: colors.foreground,
      cursor: "pointer",
      padding: spacing.sm,
      zIndex: 2,
      overflow: "visible",
      transition: "opacity 0.2s ease",
      outline: "none",
      boxShadow: "none",
      WebkitTapHighlightColor: "transparent",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      ":hover": {
        opacity: 0.7,
      },
      ":focus": {
        outline: "none",
      },
      ":focus-visible": {
        outline: "none",
        boxShadow: "none",
      },
    },
  },
  icon: {
    width: "24px",
    height: "24px",
    display: "block",
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
