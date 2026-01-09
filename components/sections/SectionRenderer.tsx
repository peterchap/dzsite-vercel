// components/sections/SectionRenderer.tsx
import React from "react";

import { HeroSplitCta } from "@/components/sections/blocks/HeroSplitCta";
import SimpleText from "@/components/sections/blocks/SimpleText";
import BenefitCards from "@/components/sections/blocks/BenefitCards";
import SignalGroups from "@/components/sections/blocks/SignalGroups";
import GlobalCoverage from "@/components/sections/blocks/GlobalCoverage";
import PrimaryUseCase from "@/components/sections/blocks/PrimaryUseCase";
import SecondaryUseCases from "@/components/sections/blocks/SecondaryUseCases";
import ProductSplit from "@/components/sections/blocks/ProductSplit";
import PrivacyCompliance from "@/components/sections/blocks/PrivacyCompliance";
import { FinalCta } from "@/components/sections/blocks/FinalCta";
import AttackChainDiagram from "@/components/sections/blocks/AttackChainDiagram";
import { JsonExample } from "@/components/sections/blocks/JsonExample";
import { FaqList } from "@/components/sections/blocks/FaqList";
import { FeatureGrid } from "@/components/sections/blocks/FeatureGrid";
import { HowItWorksSteps } from "@/components/sections/blocks/HowItWorksSteps";
import { UseCaseCards } from "@/components/sections/blocks/UseCaseCards";
import { TwoProductSplit } from "@/components/sections/blocks/TwoProductSplit";
import StatsGrid from "@/components/sections/blocks/StatsGrid";
import FeatureList from "@/components/sections/blocks/FeatureList";
import IntegrationMethods from "@/components/sections/blocks/IntegrationMethods";
import FeatureHighlight from "@/components/sections/blocks/FeatureHighlight";
import DomainLookup from "@/components/sections/blocks/DomainLookup";
import PricingOverview from "@/components/sections/blocks/PricingOverview";
import CtaBanner from "@/components/sections/blocks/CtaBanner";
import DataSources from "@/components/sections/blocks/DataSources";
import UseCaseGrid from "@/components/sections/blocks/UseCaseGrid";
import FalsePositiveReduction from "@/components/sections/blocks/FalsePositiveReduction";
import DataDictionary from "@/components/sections/blocks/DataDictionary";
import DocumentList from "@/components/sections/blocks/DocumentList";
import { MediaFeature } from "@/components/sections/blocks/MediaFeature";
import { AnchorLinks } from "@/components/sections/blocks/AnchorLinks";
import { PillarRouter } from "@/components/sections/blocks/PillarRouter";
import { TrustEvidence } from "@/components/sections/blocks/TrustEvidence";
import TwoColumnFeature from "@/components/sections/blocks/TwoColumnFeature";
import IconList from "@/components/sections/blocks/IconList";
import ThreeColumnDetailed from "@/components/sections/blocks/ThreeColumnDetailed";
import ContactSection from "@/components/sections/blocks/ContactSection";

type Section = {
  _type: string;
  _key?: string;
  [key: string]: any;
};

export default function SectionRenderer({ sections }: { sections?: Section[] }) {
  if (!sections?.length) return null;

  // Debug once
  console.log("SECTIONS", sections.map((s) => s._type));

  return (
    <>
      {sections.map((section, index) => {
        const key = section._key ?? `${section._type}-${index}`;
        const isDark = index % 2 === 0;
        const anchorId = (section.anchor as string | undefined) ?? (section._key ? `s-${section._key}` : undefined);

        switch (section._type) {
          case "section.mediaFeature":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <MediaFeature {...section} isDark={isDark} />
              </div>
            );

          case "section.pillarRouter":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <PillarRouter {...section} isDark={isDark} />
              </div>
            );

          case "section.trustEvidence":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <TrustEvidence {...section} isDark={isDark} />
              </div>
            );

          case "section.twoColumnFeature":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <TwoColumnFeature
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof TwoColumnFeature>)}
                />
              </div>
            );

          case "section.iconList":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <IconList
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof IconList>)}
                />
              </div>
            );

          case "section.threeColumnDetailed":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <ThreeColumnDetailed
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof ThreeColumnDetailed>)}
                />
              </div>
            );

          case "section.contact":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <ContactSection
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof ContactSection>)}
                />
              </div>
            );

          case "section.heroSplitCta":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <HeroSplitCta
                  {...(section as unknown as React.ComponentProps<typeof HeroSplitCta>)}
                />
              </div>
            );

          case "section.simpleText":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <SimpleText
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof SimpleText>)}
                />
              </div>
            );

          case "section.attackChainDiagram":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <AttackChainDiagram isDark={isDark} {...section} />
              </div>
            );


          case "section.benefitCards":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <BenefitCards
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof BenefitCards>)}
                />
              </div>
            );

          case "section.signalGroups":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <SignalGroups
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof SignalGroups>)}
                />
              </div>
            );

          case "section.globalCoverage":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <GlobalCoverage
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof GlobalCoverage>)}
                />
              </div>
            );

          case "section.jsonExample":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <JsonExample
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof JsonExample>)}
                />
              </div>
            );

          case "section.primaryUseCase":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <PrimaryUseCase
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof PrimaryUseCase>)}
                />
              </div>
            );

          case "section.secondaryUseCases":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <SecondaryUseCases
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof SecondaryUseCases>)}
                />
              </div>
            );

          case "section.productSplit":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <ProductSplit
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof ProductSplit>)}
                />
              </div>
            );

          case "section.privacyCompliance":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <PrivacyCompliance
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof PrivacyCompliance>)}
                />
              </div>
            );

          case "section.finalCta":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <FinalCta
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof FinalCta>)}
                />
              </div>
            );

          case "section.faqList":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <FaqList
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof FaqList>)}
                />
              </div>
            );

          case "section.featureGrid":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <FeatureGrid
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof FeatureGrid>)}
                />
              </div>
            );

          case "section.anchorLinks":
            return (
              <div id={anchorId} key={key}>
                <AnchorLinks
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof AnchorLinks>)}
                />
              </div>
            );

          case "section.howItWorksSteps":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <HowItWorksSteps
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof HowItWorksSteps>)}
                />
              </div>
            );

          case "section.useCaseCards":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <UseCaseCards
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof UseCaseCards>)}
                />
              </div>
            );

          case "section.twoProductSplit":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <TwoProductSplit
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof TwoProductSplit>)}
                />
              </div>
            );

          case "section.statsGrid":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <StatsGrid
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof StatsGrid>)}
                />
              </div>
            );

          case "section.featureList":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <FeatureList
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof FeatureList>)}
                />
              </div>
            );

          case "section.integrationMethods":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <IntegrationMethods
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof IntegrationMethods>)}
                />
              </div>
            );

          case "section.featureHighlight":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <FeatureHighlight
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof FeatureHighlight>)}
                />
              </div>
            );

          case "section.domainLookup":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <DomainLookup
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof DomainLookup>)}
                />
              </div>
            );

          case "section.pricingOverview":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <PricingOverview
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof PricingOverview>)}
                />
              </div>
            );

          case "section.ctaBanner":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <CtaBanner
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof CtaBanner>)}
                />
              </div>
            );

          case "section.dataSources":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <DataSources
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof DataSources>)}
                />
              </div>
            );

          case "section.useCaseGrid":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <UseCaseGrid
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof UseCaseGrid>)}
                />
              </div>
            );

          case "section.falsePositiveReduction":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <FalsePositiveReduction
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof FalsePositiveReduction>)}
                />
              </div>
            );

          case "section.dataDictionary":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <DataDictionary
                  isDark={isDark}
                  {...(section as unknown as React.ComponentProps<typeof DataDictionary>)}
                />
              </div>
            );

          case "section.documentList":
            return (
              <div id={anchorId} key={key} className="scroll-mt-24">
                <DocumentList
                  {...(section as unknown as React.ComponentProps<typeof DocumentList>)}
                />
              </div>
            );

          default:
            return (
              <div
                key={key}
                style={{
                  padding: 24,
                  border: "1px dashed #ccc",
                  borderRadius: 12,
                  margin: "16px 0",
                }}
              >
                <strong>Missing block:</strong> {section._type}
              </div>
            );
        }
      })}
    </>
  );
}
export { SectionRenderer };