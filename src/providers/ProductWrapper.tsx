"use client";

import { ProductProvider } from "@/src/context/productContext";

export default function ProductWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductProvider>{children}</ProductProvider>;
}
