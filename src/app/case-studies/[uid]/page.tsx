import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as stylex from "@stylexjs/stylex";

import { Layout } from "@/components/slices/Layout";
import { Text } from "@/components/slices/Text";
import { colors, typography, spacing } from "@/styles/theme.stylex";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

const styles = stylex.create({
  hero: {
    display: "grid",
    rowGap: spacing.xl,
    columnGap: 0,
    marginBottom: 0,
  },
  header: {
    maxWidth: 1200,
    paddingInline: spacing.lg,
    marginInline: "auto",
    width: "100%",
    display: "grid",
    gap: spacing.md,
    marginTop: spacing["4xl"],
    marginBottom: spacing["4xl"],
  },
  description: {
    display: "grid",
    rowGap: spacing.md,
  },
  heroImage: {
    width: "100%",
    display: "grid",
  },
  imageWrapper: {
    width: "100%",
    position: "relative",
    aspectRatio: "16 / 9",
  },
});

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid } = await params;
  const client = createClient();
  const caseStudy = await client
    .getByUID("case_study", uid)
    .catch(() => notFound());

  const descriptionTextStyles = stylex.create({
    paragraph: {
      fontFamily:
        "'Geist Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      fontSize: 28,
      lineHeight: 1.2,
      color: "rgba(250, 250, 250, 1)",
      margin: 0,
    },
  });

  const richTextComponents = {
    paragraph: ({ children }) => (
      <p {...stylex.props(descriptionTextStyles.paragraph)}>{children}</p>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  };

  return (
    <>
      <Layout.Root>
        <div {...stylex.props(styles.hero)}>
          <div {...stylex.props(styles.header)}>
            {isFilled.keyText(caseStudy.data.title) && (
              <Text.Heading as="h1">{caseStudy.data.title}</Text.Heading>
            )}
            {isFilled.richText(caseStudy.data.description) && (
              <div {...stylex.props(styles.description)}>
                <PrismicRichText
                  field={caseStudy.data.description}
                  components={richTextComponents}
                />
              </div>
            )}
          </div>
          {isFilled.image(caseStudy.data.hero_image) && (
            <div {...stylex.props(styles.heroImage)}>
              <Layout.Container fullWidth>
                <div {...stylex.props(styles.imageWrapper)}>
                  <PrismicNextImage
                    field={caseStudy.data.hero_image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    fallbackAlt=""
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </Layout.Container>
            </div>
          )}
        </div>
      </Layout.Root>
      {/* <SliceZone> renders the case study's slices. */}
      <SliceZone slices={caseStudy.data.slices} components={components} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const caseStudy = await client
    .getByUID("case_study", uid)
    .catch(() => notFound());

  return {
    title: caseStudy.data.meta_title ?? caseStudy.data.title ?? undefined,
    description: caseStudy.data.meta_description ?? undefined,
    openGraph: {
      title: caseStudy.data.meta_title ?? caseStudy.data.title ?? undefined,
      images: caseStudy.data.meta_image?.url
        ? [{ url: caseStudy.data.meta_image.url }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();

  // Get all case studies from Prismic.
  const caseStudies = await client.getAllByType("case_study");

  return caseStudies.map((caseStudy) => ({ uid: caseStudy.uid }));
}
