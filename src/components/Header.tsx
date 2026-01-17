"use client";

import { useState } from "react";
import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "@/styles/theme.stylex";

const MOBILE_BREAKPOINT = "@media (max-width: 768px)";

const headerStyles = stylex.create({
  header: {
    width: "100%",
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    position: "relative",
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
      flexDirection: "column",
      gap: "4px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: spacing.sm,
      zIndex: 2,
      transition: "opacity 0.2s ease",
      ":hover": {
        opacity: 0.7,
      },
    },
  },
  burgerLine: {
    width: "24px",
    height: "2px",
    backgroundColor: colors.foreground,
    transition: "all 0.3s ease",
    transformOrigin: "center",
  },
  burgerLineOpen1: {
    transform: "rotate(45deg) translate(5px, 5px)",
  },
  burgerLineOpen2: {
    opacity: 0,
  },
  burgerLineOpen3: {
    transform: "rotate(-45deg) translate(7px, -6px)",
  },
  mobileMenu: {
    display: "none",
    [MOBILE_BREAKPOINT]: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: colors.background,
      borderTop: `1px solid ${colors.border}`,
      padding: spacing.lg,
      gap: spacing.md,
      zIndex: 1,
      transform: "translateY(-100%)",
      opacity: 0,
      visibility: "hidden",
      transition: "all 0.3s ease",
    },
  },
  mobileMenuOpen: {
    [MOBILE_BREAKPOINT]: {
      transform: "translateY(0)",
      opacity: 1,
      visibility: "visible",
    },
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      {...stylex.props(headerStyles.header)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div {...stylex.props(headerStyles.container)}>
        <motion.a
          href="/"
          {...stylex.props(headerStyles.logo)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
        >
          Jonathan Willis
        </motion.a>
        <motion.nav
          {...stylex.props(headerStyles.nav)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
        >
          <a href="/about" {...stylex.props(headerStyles.navLink)}>
            About
          </a>
          <a href="/contact" {...stylex.props(headerStyles.navLink)}>
            Contact
          </a>
        </motion.nav>
        <button
          {...stylex.props(headerStyles.burgerButton)}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            {...stylex.props(
              headerStyles.burgerLine,
              isMenuOpen && headerStyles.burgerLineOpen1,
            )}
          />
          <span
            {...stylex.props(
              headerStyles.burgerLine,
              isMenuOpen && headerStyles.burgerLineOpen2,
            )}
          />
          <span
            {...stylex.props(
              headerStyles.burgerLine,
              isMenuOpen && headerStyles.burgerLineOpen3,
            )}
          />
        </button>
      </div>
      <nav
        {...stylex.props(
          headerStyles.mobileMenu,
          isMenuOpen && headerStyles.mobileMenuOpen,
        )}
      >
        <a
          href="/about"
          {...stylex.props(headerStyles.mobileNavLink)}
          onClick={closeMenu}
        >
          About
        </a>
        <a
          href="/contact"
          {...stylex.props(headerStyles.mobileNavLink)}
          onClick={closeMenu}
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
