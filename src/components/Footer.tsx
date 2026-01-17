"use client";

import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "@/styles/theme.stylex";

const footerStyles = stylex.create({
  footer: {
    width: "100%",
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `${spacing.xl} ${spacing.lg}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing.md,
  },
  text: {
    color: colors.foregroundMuted,
    fontSize: "14px",
    textAlign: "center",
  },
  links: {
    display: "flex",
    gap: spacing.lg,
    alignItems: "center",
  },
  link: {
    color: colors.foregroundMuted,
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s ease",
    ":hover": {
      color: colors.foreground,
    },
  },
});

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      {...stylex.props(footerStyles.footer)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div {...stylex.props(footerStyles.container)}>
        <motion.div
          {...stylex.props(footerStyles.links)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
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
        </motion.div>
        <motion.p
          {...stylex.props(footerStyles.text)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
        >
          © {currentYear} Jonathan Willis design. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
