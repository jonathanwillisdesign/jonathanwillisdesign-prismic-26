"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import * as stylex from "@stylexjs/stylex";

import { Wrapper } from "@/components/utils/Wrapper";
import { linkStyles } from "@/components/utils/Link";
import { Text } from "@/components/utils/Text";
import { colors, spacing, animationStyles } from "@/styles/theme.stylex";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

const styles = stylex.create({
  root: {
    marginTop: spacing.XXXXL,
    marginBottom: spacing.XXXXL,
  },
  video: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  caption: {
    display: "grid",
    rowGap: spacing.xs,
    marginTop: spacing.sm,
    color: colors.foregroundSecondary,
  },
  captionLink: {
    color: colors.foreground,
    textDecoration: "underline",
    opacity: {
      default: 1,
      ":hover": 0.8,
    },
    transition: "opacity 0.2s ease",
  },
});

const captionComponents: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <Text.Caption tone="muted">{children}</Text.Caption>
  ),
  hyperlink: ({ node, children }) => {
    return (
      <PrismicNextLink field={node.data} {...stylex.props(styles.captionLink)}>
        {children}
      </PrismicNextLink>
    );
  },
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
};

/**
 * Component for "Video" Slices.
 */
const Video: FC<VideoProps> = ({ slice }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    once: true,
    margin: "-50px",
  });

  const embedFilled = isFilled.embed(slice.primary.embed_link);
  const embedHtml = slice.primary.embed_link?.html || "";
  const fileFilled = isFilled.link(slice.primary.video_file);
  const videoUrl = fileFilled ? slice.primary.video_file.url : "";

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
              {embedFilled && (
                <div
                  className="video-embed-wrapper"
                  dangerouslySetInnerHTML={{
                    __html: embedHtml,
                  }}
                />
              )}
              {fileFilled && (
                <video
                  {...stylex.props(styles.video)}
                  src={videoUrl || undefined}
                  controls
                  playsInline
                />
              )}
              {isFilled.richText(slice.primary.caption) && (
                <div {...stylex.props(styles.caption)}>
                  <PrismicRichText
                    field={slice.primary.caption}
                    components={captionComponents}
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

export default Video;
