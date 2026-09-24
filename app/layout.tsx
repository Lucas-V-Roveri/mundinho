import type { Metadata, Viewport } from "next";
import { Inter, Press_Start_2P, VT323 } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { AppProviders } from "@/components/app-providers";
import { AppShell } from "@/components/shell/app-shell";
import "./globals.css";
import "./mundinho.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-press-start-2p", display: "swap" });
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323", display: "swap" });

export const metadata: Metadata = { title: { default: "Mundinho · pra sempre", template: "%s · Mundinho" }, description: "Wiki e diário do foreverworld de gr1d e benamu.", manifest: "/manifest.webmanifest", icons: { icon: "/favicon.svg" } };
export const viewport: Viewport = { themeColor: "#5d402f", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${inter.variable} ${pressStart.variable} ${vt323.variable} font-sans`}><ToastProvider><AppProviders><AppShell>{children}</AppShell></AppProviders></ToastProvider></body></html>;
}
