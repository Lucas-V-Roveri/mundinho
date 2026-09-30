import type { Metadata } from "next";
import { MinecraftProgressImport } from "@/components/bestiary/minecraft-progress-import";
import { BestiaryPreferencesBootstrap } from "@/components/bestiary/bestiary-preferences-bootstrap";
import { BestiaryView } from "@/components/pages/bestiary-view";

export const metadata: Metadata = { title: "Bestiário" };

export default function BestiaryPage() {
  return (
    <>
      <BestiaryPreferencesBootstrap />
      <MinecraftProgressImport />
      <BestiaryView />
    </>
  );
}
