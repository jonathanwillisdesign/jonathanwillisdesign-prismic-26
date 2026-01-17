"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { motion } from "motion/react";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/slices/Wrapper";
import { linkStyles } from "@/components/slices/Link";
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
  root: {
    marginTop: spacing["4xl"],
    marginBottom: spacing["4xl"],
  },
  richText: {
    display: "grid",
    rowGap: spacing.md,
    color: colors.foregroundSecondary,
  },
  list: {
    paddingInlineStart: "1.1em",
    margin: 0,
    display: "grid",
    rowGap: spacing.xs,
  },
  listItem: {
    listStylePosition: "outside",
  },
});

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return (
      <PrismicNextLink field={node.data} {...stylex.props(linkStyles.base)}>
        {children}
      </PrismicNextLink>
    );
  },
  paragraph: ({ children }) => <Text.Body>{children}</Text.Body>,
  list: ({ children }) => <ul {...stylex.props(styles.list)}>{children}</ul>,
  oList: ({ children }) => <ol {...stylex.props(styles.list)}>{children}</ol>,
  listItem: ({ children }) => (
    <li {...stylex.props(styles.listItem)}>
      <Text.Body as="span">{children}</Text.Body>
    </li>
  ),
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  image: ({ node }) => {
    return <PrismicNextImage field={node} alt={(node.alt || "") as ""} />;
  },
};

const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <div {...stylex.props(styles.root)}>
      <Wrapper.Root
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Wrapper.Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Wrapper.Body>
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
            </Wrapper.Body>
          </motion.div>
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default TextBlock;
