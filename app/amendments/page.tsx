import type { Metadata } from "next";
import { AmendmentsView } from "@/components/pages/amendments-view";
export const metadata: Metadata = { title: "Amendments" };
export default function AmendmentsPage() { return <AmendmentsView />; }
