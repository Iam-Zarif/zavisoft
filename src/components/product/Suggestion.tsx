"use client";

import useEmblaCarousel from "embla-carousel-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { colors } from "@/src/lib/colors";
import ProductCard from "../reUsable/product/ProductCard";
import { useProducts } from "@/src/context/productContext";

const Suggestion = () => {
  const { products, loading } = useProducts();

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="w-full py-10 lg:pt-30 lg:pb-14 bg-(--bg)"
      style={
        {
          "--bg": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-330">
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="text-2xl font-semibold lg:text-5xl"
            style={{ color: colors.primary }}
          >
            You may also like
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="grid size-10 cursor-pointer place-items-center rounded-lg transition disabled:cursor-not-allowed"
              style={{
                backgroundColor: canScrollPrev ? colors.primary : "#8D8D8D",
                color: "white",
              }}
            >
              <FiChevronLeft />
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="grid size-10 cursor-pointer place-items-center rounded-lg transition disabled:cursor-not-allowed"
              style={{
                backgroundColor: canScrollNext ? colors.primary : "#8D8D8D",
                color: "white",
              }}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {(loading ? [] : products.slice(0, 8)).map((item) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: selectedIndex === i ? 40 : 30,
                backgroundColor:
                  selectedIndex === i ? colors.secondary : "#A9A9A9",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Suggestion;
