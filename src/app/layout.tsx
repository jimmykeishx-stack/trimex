import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trimex Inc. | Feeding Africa and the World",
  description: "Building the digital infrastructure for African agriculture.",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
