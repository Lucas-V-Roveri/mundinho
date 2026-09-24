import type { Metadata } from "next";
import { BackstageView } from "@/components/pages/backstage-view";
export const metadata: Metadata = { title: "Bastidores" };
export default function BackstagePage() { return <BackstageView />; }
