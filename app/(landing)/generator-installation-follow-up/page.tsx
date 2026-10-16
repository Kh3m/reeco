import { NichePage } from "@/components/landing/NichePage";
import { generator, nicheMetadata } from "@/lib/niches";

export const metadata = nicheMetadata(generator);

export default function Page() {
  return <NichePage niche={generator} />;
}
