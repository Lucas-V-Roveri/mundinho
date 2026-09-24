import type { Metadata } from "next";
import { Inter, Press_Start_2P, VT323 } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mundinho · pra sempre",
  description: "Wiki e diário do foreverworld de gr1d e benamu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${pressStart.variable} ${vt323.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
