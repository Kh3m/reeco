import { NichePage } from "@/components/landing/NichePage";
import { waterproofing, nicheMetadata } from "@/lib/niches";

export const metadata = nicheMetadata(waterproofing);

export default function Page() {
  return <NichePage niche={waterproofing} />;
}
