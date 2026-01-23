import { type ReactNode } from "react";
import type React from "react";
import * as stylex from "@stylexjs/stylex";

import { colors, spacing, container, breakpoints } from "@/styles/theme.stylex";

type RootProps = {
  children?: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

type ContainerProps = {
  children?: ReactNode;
  fullWidth?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

type SectionProps = {
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const styles = stylex.create({
  root: {
    paddingBlock: 0,
    width: "100%",
    backgroundColor: "transparent",
    color: colors.foreground,
  },
  container: {
    width: "100%",
    maxWidth: container.maxWidth,
    paddingInline: {
      default: spacing.lg,
      [breakpoints.mobile]: spacing.md,
    },
    marginInline: "auto",
  },
  containerFullWidth: {
    maxWidth: "100%",
    paddingInline: 0,
  },
  header: {
    display: "grid",
    rowGap: spacing.md,
    marginBottom: spacing.xl,
  },
  body: {
    display: "grid",
    rowGap: spacing.lg,
  },
});

function Root({ children, ...props }: RootProps) {
  return (
    <section {...props} {...stylex.props(styles.root)}>
      {children}
    </section>
  );
}

function Container({ children, fullWidth, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.container,
        fullWidth && styles.containerFullWidth,
      )}
    >
      {children}
    </div>
  );
}

function Header({ children, ...props }: SectionProps) {
  return (
    <div {...props} {...stylex.props(styles.header)}>
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

export const Wrapper = {
  Root,
  Container,
  Header,
  Body,
};
