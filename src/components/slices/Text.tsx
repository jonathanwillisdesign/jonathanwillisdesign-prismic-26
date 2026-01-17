import { type ComponentPropsWithoutRef, type ElementType } from "react";
import * as stylex from "@stylexjs/stylex";

import { colors, typography } from "@/styles/theme.stylex";

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
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  heading: {
    fontSize: "40px",
    lineHeight: 1.1,
    fontWeight: 600,
    letterSpacing: "-0.02em",
  },
  subheading: {
    fontSize: typography.subheadingSize,
    lineHeight: 1.3,
    fontWeight: 600,
  },
  body: {
    fontSize: 18,
    lineHeight: typography.bodyLineHeight,
  },
  caption: {
    fontSize: 14,
    lineHeight: 1.5,
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
