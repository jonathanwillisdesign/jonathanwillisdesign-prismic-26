import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import * as stylex from "@stylexjs/stylex";

import { Layout } from "@/components/slices/Layout";
import { Text } from "@/components/slices/Text";
import { colors } from "@/styles/theme.stylex";

const styles = stylex.create({
  richtext: {
    display: "grid",
    rowGap: 20,
    color: colors.foregroundSecondary,
  },
});

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children }) => <Text.Heading as="h1">{children}</Text.Heading>,
  heading2: ({ children }) => (
    <Text.Subheading as="h2">{children}</Text.Subheading>
  ),
  heading3: ({ children }) => (
    <Text.Subheading as="h3">{children}</Text.Subheading>
  ),
  paragraph: ({ children }) => <Text.Body>{children}</Text.Body>,
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText: FC<RichTextProps> = ({ slice }) => {
  return (
    <Layout.Root
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Layout.Container>
        <Layout.Body>
          {isFilled.richText(slice.primary.content) && (
            <div {...stylex.props(styles.richtext)}>
              <PrismicRichText
                field={slice.primary.content}
                components={components}
              />
            </div>
          )}
        </Layout.Body>
      </Layout.Container>
    </Layout.Root>
  );
};

export default RichText;
