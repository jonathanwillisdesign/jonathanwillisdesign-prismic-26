import { type ReactNode } from "react";
import type React from "react";
import * as stylex from "@stylexjs/stylex";

import { colors, spacing, borderRadius } from "@/styles/theme.stylex";

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
    display: "block",
    padding: 0,
    borderRadius: borderRadius.none,
    border: "none",
    backgroundColor: "transparent",
    overflow: "hidden",
    filter: "grayscale(100%)",
    transition: "filter 0.3s ease",
  },
  media: {
    display: "block",
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    minHeight: 200,
    borderRadius: borderRadius.none,
    overflow: "hidden",
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
    display: "grid",
    gap: spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
    color: colors.foreground,
  },
  meta: {
    fontSize: 14,
    color: colors.foregroundMuted,
  },
  description: {
    fontSize: 16,
    lineHeight: 1.6,
    color: colors.foregroundSecondary,
    margin: 0,
  },
});

function Root({ children, ...props }: RootProps) {
  return (
    <div {...props} {...stylex.props(styles.root)}>
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
  Body,
  Title,
  Meta,
  Description,
};
