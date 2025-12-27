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

        switch (section._type) {
          case "section.heroSplitCta":
            return (
              <HeroSplitCta
                key={key}
                {...(section as unknown as React.ComponentProps<typeof HeroSplitCta>)}
              />
            );

          case "section.simpleText":
            return (
              <SimpleText
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof SimpleText>)}
              />
            );

          case "section.attackChainDiagram":
            return <AttackChainDiagram key={key} isDark={isDark} {...section} />;


          case "section.benefitCards":
            return (
              <BenefitCards
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof BenefitCards>)}
              />
            );

          case "section.signalGroups":
            return (
              <SignalGroups
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof SignalGroups>)}
              />
            );

          case "section.globalCoverage":
            return (
              <GlobalCoverage
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof GlobalCoverage>)}
              />
            );

          case "section.jsonExample":
            return (
              <JsonExample
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof JsonExample>)}
              />
            );

          case "section.primaryUseCase":
            return (
              <PrimaryUseCase
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof PrimaryUseCase>)}
              />
            );

          case "section.secondaryUseCases":
            return (
              <SecondaryUseCases
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof SecondaryUseCases>)}
              />
            );

          case "section.productSplit":
            return (
              <ProductSplit
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof ProductSplit>)}
              />
            );

          case "section.privacyCompliance":
            return (
              <PrivacyCompliance
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof PrivacyCompliance>)}
              />
            );

          case "section.finalCta":
            return (
              <FinalCta
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof FinalCta>)}
              />
            );

          case "section.faqList":
            return (
              <FaqList
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof FaqList>)}
              />
            );

          case "section.featureGrid":
            return (
              <FeatureGrid
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof FeatureGrid>)}
              />
            );

          case "section.howItWorksSteps":
            return (
              <HowItWorksSteps
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof HowItWorksSteps>)}
              />
            );

          case "section.useCaseCards":
            return (
              <UseCaseCards
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof UseCaseCards>)}
              />
            );

          case "section.twoProductSplit":
            return (
              <TwoProductSplit
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof TwoProductSplit>)}
              />
            );

          case "section.statsGrid":
            return (
              <StatsGrid
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof StatsGrid>)}
              />
            );

          case "section.featureList":
            return (
              <FeatureList
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof FeatureList>)}
              />
            );

          case "section.integrationMethods":
            return (
              <IntegrationMethods
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof IntegrationMethods>)}
              />
            );

          case "section.featureHighlight":
            return (
              <FeatureHighlight
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof FeatureHighlight>)}
              />
            );

          case "section.domainLookup":
            return (
              <DomainLookup
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof DomainLookup>)}
              />
            );

          case "section.pricingOverview":
            return (
              <PricingOverview
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof PricingOverview>)}
              />
            );

          case "section.ctaBanner":
            return (
              <CtaBanner
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof CtaBanner>)}
              />
            );

          case "section.dataSources":
            return (
              <DataSources
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof DataSources>)}
              />
            );

          case "section.useCaseGrid":
            return (
              <UseCaseGrid
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof UseCaseGrid>)}
              />
            );

          case "section.falsePositiveReduction":
            return (
              <FalsePositiveReduction
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof FalsePositiveReduction>)}
              />
            );

          case "section.dataDictionary":
            return (
              <DataDictionary
                key={key}
                isDark={isDark}
                {...(section as unknown as React.ComponentProps<typeof DataDictionary>)}
              />
            );

          case "section.documentList":
            return (
              <DocumentList
                key={key}
                {...(section as unknown as React.ComponentProps<typeof DocumentList>)}
              />
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