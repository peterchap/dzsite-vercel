import MarketingLayout from "./(marketing)/layout";
import HomePage, { generateMetadata as generateMarketingMetadata } from "./(marketing)/page";

export const generateMetadata = generateMarketingMetadata;

export default async function CombinedPage() {
  return (
    <MarketingLayout>
      <HomePage />
    </MarketingLayout>
  );
}
