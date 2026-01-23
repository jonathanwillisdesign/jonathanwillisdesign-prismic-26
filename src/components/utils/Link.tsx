import { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

import { colors, spacing, borderRadius } from "@/styles/theme.stylex";

type LinkProps = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const linkStyles = stylex.create({
  base: {
    color: {
      default: colors.link,
      ":hover": colors.linkHover,
    },
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    transition: "color 0.2s ease, text-decoration 0.2s ease",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.link}`,
    },
    outlineOffset: {
      default: 0,
      ":focus-visible": spacing.xs,
    },
    borderRadius: {
      default: 0,
      ":focus-visible": borderRadius.sm,
    },
  },
});

function Link({ children, ...props }: LinkProps) {
  return (
    <a {...props} {...stylex.props(linkStyles.base)}>
      {children}
    </a>
  );
}

export { Link };
