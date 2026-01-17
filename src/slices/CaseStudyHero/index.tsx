import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Wrapper } from "@/components/slices/Wrapper";

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
    <Wrapper.Root
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Wrapper.Container />
    </Wrapper.Root>
  );
};

export default CaseStudyHero;
