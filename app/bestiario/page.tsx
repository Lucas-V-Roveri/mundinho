import type { Metadata } from "next";
import { BestiaryView } from "@/components/pages/bestiary-view";

export const metadata: Metadata = { title: "Bestiário" };

export default function BestiaryPage() {
  return <BestiaryView />;
}
