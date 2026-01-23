"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { PrismicImage } from "@/components/PrismicImage";
import { Wrapper } from "@/components/utils/Wrapper";
import { linkStyles } from "@/components/utils/Link";
import { Text } from "@/components/utils/Text";
import { colors, spacing, animationStyles } from "@/styles/theme.stylex";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const styles = stylex.create({
  root: {
    marginTop: spacing.XXXXL,
    marginBottom: spacing.XXXXL,
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
    return <PrismicImage field={node} alt={(node.alt || "") as ""} />;
  },
};

const TextBlock: FC<TextBlockProps> = ({ slice }) => {
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
          </div>
        </Wrapper.Container>
      </Wrapper.Root>
    </div>
  );
};

export default TextBlock;
