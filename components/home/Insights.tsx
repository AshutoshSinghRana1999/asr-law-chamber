import InsightsClient from "@/components/home/InsightsClient";
import { getAllInsights } from "@/lib/mdx";

export default function Insights() {
  const insights = getAllInsights();

  return <InsightsClient insights={insights} />;
}