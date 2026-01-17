import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import * as stylex from "@stylexjs/stylex";

import { Card } from "@/components/slices/Card";
import { Layout } from "@/components/slices/Layout";
import { spacing } from "@/styles/theme.stylex";


/**
 * Props for `FeaturedWork`.
 */
export type FeaturedWorkProps = SliceComponentProps<Content.FeaturedWorkSlice>;

/**
 * Component for "FeaturedWork" Slices.
 */
const styles = stylex.create({
  grid: {
    display: "grid",
    gap: spacing.lg,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  link: {
    textDecoration: "none",
  },
  root: {
    marginTop: spacing.xl,
  },
});

const FeaturedWork: FC<FeaturedWorkProps> = ({ slice }) => {
  return (
    <Layout.Root
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      {...stylex.props(styles.root)}
    >
      <Layout.Container>
        <Layout.Body>
          {isFilled.group(slice.primary.case_studies) && (
            <div {...stylex.props(styles.grid)}>
              {slice.primary.case_studies.map((item, index) => {
                const caseStudy = item.case_study;
                if (!isFilled.contentRelationship(caseStudy)) {
                  return null;
                }

                const metaTitle = caseStudy.data?.meta_title ?? "";
                const metaDescription = caseStudy.data?.meta_description ?? "";
                const metaImage = caseStudy.data?.meta_image;

                return (
                  <PrismicNextLink
                    key={caseStudy.id ?? `${metaTitle}-${index}`}
                    field={caseStudy}
                    {...stylex.props(styles.link)}
                  >
                    <Card.Root>
                      {isFilled.image(metaImage) && (
                        <Card.Media>
                          <PrismicNextImage
                            field={metaImage}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fallbackAlt={metaTitle || "Case study image"}
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </Card.Media>
                      )}
                      <Card.Body>
                        {metaTitle && <Card.Title>{metaTitle}</Card.Title>}
                        {metaDescription && (
                          <Card.Description>{metaDescription}</Card.Description>
                        )}
                      </Card.Body>
                    </Card.Root>
                  </PrismicNextLink>
                );
              })}
            </div>
          )}
        </Layout.Body>
      </Layout.Container>
    </Layout.Root>
  );
};

export default FeaturedWork;
