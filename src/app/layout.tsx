import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

const title = "Yu-Heng Lai";
const description =
  "Yu-Heng Lai — EE + Physics undergraduate at National Taiwan University working on generative modeling and machine learning for spatiotemporal and scientific data.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lukelaitw.github.io"),
  title,
  description,
  openGraph: { type: "website", url: "/", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
