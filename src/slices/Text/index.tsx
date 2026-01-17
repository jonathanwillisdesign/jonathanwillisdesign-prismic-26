import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { Layout } from "@/components/slices/Layout";
import { Text } from "@/components/slices/Text";
import { colors, spacing } from "@/styles/theme.stylex";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const styles = stylex.create({
  richText: {
    display: "grid",
    rowGap: spacing.md,
    color: colors.foregroundSecondary,
  },
  link: {
    color: colors.accent,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  defaultMargin: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  marginNone: {
    marginTop: 0,
    marginBottom: 0,
  },
  marginAbove: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  marginBelow: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  marginBoth: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return (
      <PrismicNextLink field={node.data} {...stylex.props(styles.link)}>
        {children}
      </PrismicNextLink>
    );
  },
  paragraph: ({ children }) => <Text.Body>{children}</Text.Body>,
  list: ({ children }) => <ul>{children}</ul>,
  listItem: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
};

const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  const marginValue = slice.primary.margin || "None";
  const marginKey = marginValue.toLowerCase() as "none" | "above" | "below" | "both";
  
  const marginStyles = {
    none: styles.marginNone,
    above: styles.marginAbove,
    below: styles.marginBelow,
    both: styles.marginBoth,
  };

  return (
    <Layout.Root
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      {...stylex.props(marginStyles[marginKey] || styles.defaultMargin)}
    >
      <Layout.Container>
        <Layout.Body>
          {isFilled.keyText(slice.primary.title) && (
            <Text.Subheading as="h2">{slice.primary.title}</Text.Subheading>
          )}
          {isFilled.richText(slice.primary.detail) && (
            <div {...stylex.props(styles.richText)}>
              <PrismicRichText
                field={slice.primary.detail}
                components={components}
              />
            </div>
          )}
        </Layout.Body>
      </Layout.Container>
    </Layout.Root>
  );
};

export default TextBlock;
