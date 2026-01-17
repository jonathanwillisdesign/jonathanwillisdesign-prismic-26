import { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

import { colors, spacing } from "@/styles/theme.stylex";

type LinkProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const linkStyles = stylex.create({
  base: {
    color: colors.link,
    textDecoration: "none",
    transition: "color 0.2s ease, text-decoration 0.2s ease",
    ":hover": {
      color: colors.linkHover,
      textDecoration: "underline",
    },
    ":focus-visible": {
      outline: `2px solid ${colors.link}`,
      outlineOffset: spacing.xs,
      borderRadius: "2px",
    },
  },
});

function Link({ children, className, style, ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={className}
      style={style}
      {...stylex.props(linkStyles.base)}
    >
      {children}
    </a>
  );
}

export { Link };
