import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yu-Heng Lai",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
