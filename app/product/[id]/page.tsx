import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product } from "@/src/types/products";
import ProductDetailPage from "./ProductDetailPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;
  return res.json();
}

function toAbsoluteUrl(pathOrUrl: string) {
  try {
    return new URL(pathOrUrl, SITE_URL).toString();
  } catch {
    return `${SITE_URL}/fallback.png`;
  }
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      metadataBase: new URL(SITE_URL),
      title: "Product not found",
      description: "This product does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.title} | KICKS`;
  const description =
    product.description?.replace(/\s+/g, " ").trim().slice(0, 160) ||
    "Product details";
  const image = toAbsoluteUrl(product.images?.[0] || "/fallback.png");
  const canonical = `/product/${product.id}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical },
    keywords: [
      product.title,
      product.category?.name || "Shoes",
      "KICKS",
      "Sneakers",
      "Running shoes",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "KICKS",
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "og:price:amount": String(product.price),
      "og:price:currency": "USD",
      "product:price:amount": String(product.price),
      "product:price:currency": "USD",
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const productUrl = `${SITE_URL}/product/${product.id}`;
  const image = toAbsoluteUrl(product.images?.[0] || "/fallback.png");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [image],
    description: product.description,
    category: product.category?.name,
    brand: { "@type": "Brand", name: "KICKS" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: String(product.price),
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailPage product={product} />
    </>
  );
}
