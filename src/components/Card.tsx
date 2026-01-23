import { type ReactNode } from "react";
import type React from "react";
import * as stylex from "@stylexjs/stylex";

import {
  colors,
  spacing,
  borderRadius,
  typography,
  dimensions,
  breakpoints,
} from "@/styles/theme.stylex";

type RootProps = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type SectionProps = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type TitleProps = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    borderRadius: borderRadius.none,
    border: "none",
    backgroundColor: "transparent",
    overflow: "hidden",
    gap: spacing.md,
  },
  media: {
    display: "block",
    position: "relative",
    width: "100%",
    height: dimensions.cardHeight,
    borderRadius: borderRadius.none,
    overflow: "hidden",
  },
  mediaContent: {
    position: "absolute",
    inset: 0,
    transition: "transform 0.5s ease",
    transform: {
      default: "scale(1)",
      [stylex.when.ancestor(":hover")]: "scale(1.05)",
    },
  },
  mediaWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
  },
  title: {
    fontSize: {
      default: typography.fontSizeLG,
      [breakpoints.mobile]: typography.fontSizeLG,
    },
    fontWeight: 700,
    margin: 0,
    color: colors.foreground,
    lineHeight: typography.lineHeightNormal,
    letterSpacing: "-0.01em",
  },
  meta: {
    fontSize: typography.fontSizeM,
    color: colors.foregroundMuted,
  },
  description: {
    fontSize: typography.fontSizeM,
    lineHeight: typography.lineHeightNormal,
    color: colors.foregroundSecondary,
    margin: 0,
  },
});

function Root({ children, ...props }: RootProps) {
  return (
    <div {...props} {...stylex.props(stylex.defaultMarker(), styles.root)}>
      {children}
    </div>
  );
}

function Media({ children, ...props }: SectionProps) {
  return (
    <div {...props} {...stylex.props(styles.media)}>
      {children}
    </div>
  );
}

function MediaContent({ children, ...props }: SectionProps) {
  return (
    <div {...props} {...stylex.props(styles.mediaContent)}>
      {children}
    </div>
  );
}

function Body({ children, ...props }: SectionProps) {
  return (
    <div {...props} {...stylex.props(styles.body)}>
      {children}
    </div>
  );
}

function Title({ children, ...props }: TitleProps) {
  return (
    <h3 {...props} {...stylex.props(styles.title)}>
      {children}
    </h3>
  );
}

function Meta({ children, ...props }: SectionProps) {
  return (
    <div {...props} {...stylex.props(styles.meta)}>
      {children}
    </div>
  );
}

function Description({ children, ...props }: SectionProps) {
  return (
    <p {...props} {...stylex.props(styles.description)}>
      {children}
    </p>
  );
}

export const Card = {
  Root,
  Media,
  MediaContent,
  Body,
  Title,
  Meta,
  Description,
};
