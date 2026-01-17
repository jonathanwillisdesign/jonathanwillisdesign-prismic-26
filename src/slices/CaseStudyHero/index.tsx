import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Layout } from "@/components/slices/Layout";

/**
 * Props for `CaseStudyHero`.
 */
export type CaseStudyHeroProps =
  SliceComponentProps<Content.CaseStudyHeroSlice>;

/**
 * Component for "CaseStudyHero" Slices.
 */
const CaseStudyHero: FC<CaseStudyHeroProps> = ({ slice }) => {
  return (
    <Layout.Root
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Layout.Container />
    </Layout.Root>
  );
};

export default CaseStudyHero;
