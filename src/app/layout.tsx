import type { Metadata } from "next";
import { Oldenburg } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const oldenburg = Oldenburg({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Smile to enter",
  description:
    "After thinking about what project to do, I got excited about using AI for something fun. So, I made a website where people have to smile to get in. Site with AI It's something I've wanted to do for a while, and I'm happy with how it turned out!",
  applicationName: "Smile to enter",
  authors: [
    { url: "https://zakharov-artem.vercel.app/", name: "Zakharov Artem" },
  ],
  generator: "Next.js",
  keywords: "nextjs, ai, faceapi",
  openGraph: {
    type: "website",
    url: "https://smile-to-enter.vercel.app/",
    title: "Smile to enter",
    description: "Website where people have to smile to get in",
    siteName: "Smile to enter",
    images: [
      {
        url: "https://smile-to-enter.vercel.app/imgs/banner.jpg",
      },
    ],
  },
  twitter: {
    title: "Smile to enter",
    description: "Website where people have to smile to get in",
    card: "summary_large_image",
    site: "@Smile_to_enter",
    creator: "@zakharov",
    images: "https://smile-to-enter.vercel.app/imgs/banner.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oldenburg.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
