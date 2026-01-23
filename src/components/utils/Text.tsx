import { type ComponentPropsWithoutRef, type ElementType } from "react";
import * as stylex from "@stylexjs/stylex";

import { colors, typography, breakpoints } from "@/styles/theme.stylex";

type TextProps<T extends ElementType> = {
  as?: T;
  tone?: "default" | "muted";
  children: ComponentPropsWithoutRef<T>["children"];
} & Omit<ComponentPropsWithoutRef<T>, "as" | "color" | "children">;

type BaseTextProps<T extends ElementType> = TextProps<T> & {
  stylexStyles?: stylex.StyleXStyles;
};

const styles = stylex.create({
  base: {
    fontFamily:
      "'Geist Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: colors.foreground,
    margin: 0,
  },
  muted: {
    color: colors.foregroundMuted,
  },
  eyebrow: {
    fontSize: typography.fontSizeXS,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: {
      default: typography.fontSizeXXXXL,
      [breakpoints.mobile]: typography.fontSizeXXXL,
    },
    lineHeight: typography.lineHeightTight,
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  subheading: {
    fontSize: {
      default: typography.fontSizeXXXL,
      [breakpoints.mobile]: typography.fontSizeXXL,
    },
    lineHeight: typography.lineHeightNormal,
    fontWeight: 600,
  },
  body: {
    fontSize: {
      default: typography.fontSizeLG,
      [breakpoints.mobile]: typography.fontSizeM,
    },
    lineHeight: typography.lineHeightNormal,
  },
  caption: {
    fontSize: typography.fontSizeSM,
    lineHeight: typography.lineHeightNormal,
  },
});

function BaseText<T extends ElementType = "p">({
  as,
  tone = "default",
  children,
  stylexStyles,
  ...props
}: BaseTextProps<T>) {
  const Component = (as ?? "p") as ElementType;
  return (
    <Component
      {...props}
      {...stylex.props(
        styles.base,
        tone === "muted" && styles.muted,
        stylexStyles,
      )}
    >
      {children}
    </Component>
  );
}

function Eyebrow<T extends ElementType = "p">(props: TextProps<T>) {
  return <BaseText {...props} stylexStyles={styles.eyebrow} />;
}

function Heading<T extends ElementType = "h2">(props: TextProps<T>) {
  return <BaseText {...props} stylexStyles={styles.heading} />;
}

function Subheading<T extends ElementType = "h3">(props: TextProps<T>) {
  return <BaseText {...props} stylexStyles={styles.subheading} />;
}

function Body<T extends ElementType = "p">(props: TextProps<T>) {
  return <BaseText {...props} stylexStyles={styles.body} />;
}

function Caption<T extends ElementType = "p">(props: TextProps<T>) {
  return <BaseText {...props} stylexStyles={styles.caption} />;
}

export const Text = {
  Eyebrow,
  Heading,
  Subheading,
  Body,
  Caption,
};
