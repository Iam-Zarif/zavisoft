"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { colors } from "@/src/lib/colors";
import Suggestion from "@/src/components/product/Suggestion";
import { Product } from "@/src/types/products";

const sizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];
const productColors = ["#2F3A4D", "#7E8E7E"];

const ProductDetailPage = ({ product }: { product: Product }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const images = product.images?.length ? product.images : ["/fallback.png"];

  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(0);
  }, [product.id]);

  const parsedDescription = useMemo(() => {
    const desc = (product.description || "").trim();
    if (!desc) return { firstLine: "", bullets: [] as string[] };

    const parts = desc
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const [firstLine = "", ...bullets] = parts;
    return { firstLine, bullets };
  }, [product.description]);

  return (
    <section
      className="px-4 pt-24 flex flex-col gap-10 lg:gap-25 lg:pt-28 lg:pb-0"
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--tertiary": colors.tertiary,
          "--bg": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-330">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="lg:hidden">
              <div className="relative h-80 overflow-hidden rounded-4xl bg-[#d8dbdf]">
                <Image
                  src={images[activeImage] || images[0]}
                  alt={product.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                {images.slice(0, 4).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-2.5 rounded-full ${
                      activeImage === i
                        ? "w-5 bg-(--secondary)"
                        : "w-2.5 bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-18 overflow-hidden rounded-xl bg-[#d8dbdf] ${
                      activeImage === index ? "ring-2 ring-(--secondary)" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title}-${index}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-3 lg:gap-5">
              {images.map((image, index) => {
                const roundedClasses = [
                  "rounded-tl-4xl",
                  "rounded-tr-4xl",
                  "rounded-bl-4xl",
                  "rounded-br-4xl",
                ];

                return (
                  <div
                    key={index}
                    className={`relative min-h-80 lg:min-h-140 overflow-hidden bg-[#d8dbdf] ${
                      roundedClasses[index] || ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={product.title}
                      fill
                      sizes="50vw"
                      className="cursor-pointer object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="bg-(--bg) py-3">
            <span className="inline-flex h-8 cursor-pointer items-center rounded-xl bg-(--secondary) px-3 text-xs font-medium text-white">
              {product.category?.name}
            </span>

            <h1 className="mt-3 text-(--primary) lg:text-3xl font-semibold uppercase leading-tight">
              {product.title}
            </h1>

            <p className="mt-2 text-2xl font-semibold text-(--secondary)">
              ${product.price}
            </p>

            <div className="mt-5">
              <p className="text-sm font-semibold uppercase text-(--primary)">
                Color
              </p>
              <div className="mt-2 flex items-center gap-3">
                {productColors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(index)}
                    className={`grid size-8 place-items-center rounded-full border-2 ${
                      selectedColor === index
                        ? "border-(--primary)"
                        : "border-transparent"
                    }`}
                  >
                    <span
                      className="size-5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase text-(--primary)">
                  Size
                </p>
                <p className="text-sm font-semibold uppercase text-(--primary)/80 underline">
                  Size Chart
                </p>
              </div>

              <div className="mt-2 grid grid-cols-8 gap-2">
                {sizes.map((size, i) => (
                  <button
                    key={size}
                    className={`h-9 cursor-pointer rounded-md text-sm font-medium ${
                      i === 0
                        ? "bg-(--primary) text-(--bg)"
                        : "bg-white text-(--primary)"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="h-10 flex-1 cursor-pointer rounded-md bg-(--primary) text-sm font-medium uppercase text-(--bg)">
                Add to cart
              </button>

              <button className="grid size-10 cursor-pointer place-items-center rounded-md bg-(--primary) text-(--bg)">
                <FiHeart className="text-base" />
              </button>
            </div>

            <button className="mt-2 h-10 w-full cursor-pointer rounded-md bg-(--secondary) text-sm font-medium uppercase text-white">
              Buy it now
            </button>

            <div className="mt-5">
              <h2 className="font-semibold uppercase text-(--primary)">
                About the product
              </h2>
              <p className="text-(--primary)/70">{product.category?.name}</p>

              <div className="mt-4 space-y-3 flex flex-col gap-3 text-(--primary)/70">
                {parsedDescription.firstLine && (
                  <p className="leading-relaxed">
                    {parsedDescription.firstLine}
                  </p>
                )}

                {parsedDescription.bullets.length > 0 && (
                  <ul className="list-disc space-y-2 pl-4">
                    {parsedDescription.bullets.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Suggestion />
    </section>
  );
};

export default ProductDetailPage;
