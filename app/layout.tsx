import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PUNKIEZ",
  description: "Official PUNKIEZ",
  openGraph: {
    title: "PUNKIEZ",
    description: "Official PUNKIEZ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PUNKIEZ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PUNKIEZ",
    description: "Official PUNKIEZ",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen items-center justify-center p-4`}>
        {children}
      </body>
    </html>
  );
}
