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
    <footer {...stylex.props(footerStyles.footer)}>
      <div {...stylex.props(footerStyles.container)}>
        <div {...stylex.props(footerStyles.links)}>
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
        <p {...stylex.props(footerStyles.text)}>
          © {currentYear} Jonathan Willis design. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
