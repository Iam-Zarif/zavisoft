import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/shared/Navbar";
import { colors } from "@/src/lib/colors";
import Footer from "@/src/shared/Footer";
import Cta from "@/src/components/home/Cta";
import ProductWrapper from "@/src/providers/ProductWrapper";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteTitle = "KICKS";
const siteDescription =
  "KICKS – Premium sneaker marketplace with curated collections and latest drops.";
const siteUrl = "https://zavisoft-smoky.vercel.app";
const siteImage = `${siteUrl}/og-image.png`; 

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  applicationName: siteTitle,
  generator: "Next.js",
  keywords: ["KICKS", "sneakers", "streetwear", "shoes", "online store"],
  authors: [{ name: "KICKS", url: siteUrl }],
  colorScheme: "light",
  creator: "KICKS",
  publisher: "KICKS",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@kicks_official", 
    images: [siteImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} antialiased`}
        style={{ backgroundColor: colors.background }}
      >
        <ProductWrapper>
          <Navbar />
          {children}
          <Cta />
          <Footer />
        </ProductWrapper>
      </body>
    </html>
  );
}
