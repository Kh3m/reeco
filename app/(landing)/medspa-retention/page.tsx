import { NichePage } from "@/components/landing/NichePage";
import { medspa, nicheMetadata } from "@/lib/niches";

export const metadata = nicheMetadata(medspa);

export default function Page() {
  return <NichePage niche={medspa} />;
}
