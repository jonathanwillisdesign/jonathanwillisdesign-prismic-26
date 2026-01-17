import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";

import { CaseStudyHero } from "@/components/CaseStudyHero";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

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

  return (
    <>
      <CaseStudyHero
        title={caseStudy.data.title}
        description={caseStudy.data.description}
        heroImage={caseStudy.data.hero_image}
      />
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
