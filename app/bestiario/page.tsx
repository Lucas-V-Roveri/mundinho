import type { Metadata } from "next";
import { BestiaryPreferencesBootstrap } from "@/components/bestiary/bestiary-preferences-bootstrap";
import { BestiaryView } from "@/components/pages/bestiary-view";

export const metadata: Metadata = { title: "Bestiário" };

export default function BestiaryPage() {
  return (
    <>
      <BestiaryPreferencesBootstrap />
      <BestiaryView />
    </>
  );
}
