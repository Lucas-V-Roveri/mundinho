import type { Metadata } from "next";
import { ModsView } from "@/components/pages/mods-view";
export const metadata: Metadata = { title: "Mods" };
export default function ModsPage() { return <ModsView />; }
