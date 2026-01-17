"use client";

import { type FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/slices/Wrapper";
import { linkStyles } from "@/components/slices/Link";
import { Text } from "@/components/slices/Text";
import { colors, spacing, animationStyles } from "@/styles/theme.stylex";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const styles = stylex.create({
  richtext: {
    display: "grid",
    rowGap: 20,
    color: colors.foregroundSecondary,
  },
  root: {
    marginTop: spacing["4xl"],
    marginBottom: spacing["4xl"],
  },
  list: {
    paddingInlineStart: "1.1em",
    margin: 0,
    display: "grid",
    rowGap: spacing.sm,
  },
  listItem: {
    listStylePosition: "outside",
  },
});

const components: JSXMapSerializer = {
  list: ({ children }) => <ul {...stylex.props(styles.list)}>{children}</ul>,
  oList: ({ children }) => <ol {...stylex.props(styles.list)}>{children}</ol>,
  listItem: ({ children }) => (
    <li {...stylex.props(styles.listItem)}>
      <Text.Body as="span">{children}</Text.Body>
    </li>
  ),
  hyperlink: ({ node, children }) => {
    return (
      <PrismicNextLink field={node.data} {...stylex.props(linkStyles.base)}>
        {children}
      </PrismicNextLink>
    );
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
  image: ({ node }) => {
    return <PrismicNextImage field={node} alt={(node.alt || "") as ""} />;
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText: FC<RichTextProps> = ({ slice }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    once: true,
    margin: "-50px",
  });

  return (
    <div {...stylex.props(styles.root)}>
      <Wrapper.Root
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Wrapper.Container>
          <div
            ref={ref}
            {...stylex.props(
              animationStyles.fadeUp,
              isVisible && animationStyles.fadeUpAnimated,
            )}
          >
            <Wrapper.Body>
              {isFilled.richText(slice.primary.content) && (
                <div {...stylex.props(styles.richtext)}>
                  <PrismicRichText
                    field={slice.primary.content}
                    components={components}
                  />
                </div>
              )}
            </Wrapper.Body>
          </div>
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default RichText;
