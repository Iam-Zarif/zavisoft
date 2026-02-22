"use client";

import useEmblaCarousel from "embla-carousel-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { colors } from "@/src/lib/colors";
import ProductCard from "../reUsable/product/ProductCard";
import { useProducts } from "@/src/context/productContext";

const Suggestion = () => {
  const { products, loading } = useProducts();
  const visibleProducts = loading ? [] : products.slice(0, 8);

  const groupedProducts = useMemo(() => {
    const groups: (typeof visibleProducts)[] = [];
    for (let i = 0; i < visibleProducts.length; i += 4) {
      groups.push(visibleProducts.slice(i, i + 4));
    }
    return groups;
  }, [visibleProducts]);

  const [isMobile, setIsMobile] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mobileRef, mobileApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [desktopRef, desktopApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const activeApi = isMobile ? mobileApi : desktopApi;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const onSelect = useCallback(() => {
    if (!activeApi) return;
    setSelectedIndex(activeApi.selectedScrollSnap());
    setCanScrollPrev(activeApi.canScrollPrev());
    setCanScrollNext(activeApi.canScrollNext());
  }, [activeApi]);

  useEffect(() => {
    if (!activeApi) return;
    onSelect();
    activeApi.on("select", onSelect);
    activeApi.on("reInit", onSelect);
    return () => {
      activeApi.off("select", onSelect);
      activeApi.off("reInit", onSelect);
    };
  }, [activeApi, onSelect]);

  const dotCount = isMobile
    ? groupedProducts.length
    : (desktopApi?.scrollSnapList().length ?? 0);

  return (
    <section
      className="w-full bg-(--bg)"
      style={{ "--bg": colors.background } as React.CSSProperties}
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
              onClick={() => activeApi?.scrollPrev()}
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
              onClick={() => activeApi?.scrollNext()}
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

        {/* ================= LOADER ================= */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="relative h-45 lg:h-80 w-full rounded-2xl bg-gray-300" />
                <div className="h-6 w-3/4 rounded bg-gray-300" />
                <div className="h-10 w-full rounded-lg bg-gray-300" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="lg:hidden overflow-hidden" ref={mobileRef}>
              <div className="flex">
                {groupedProducts.map((group, index) => (
                  <div key={index} className="min-w-0 flex-[0_0_100%]">
                    <div className="grid grid-cols-2 gap-2">
                      {group.map((item) => (
                        <ProductCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block overflow-hidden" ref={desktopRef}>
              <div className="flex -mx-2">
                {visibleProducts.map((item) => (
                  <div key={item.id} className="min-w-0 flex-[0_0_25%] px-2">
                    <ProductCard item={item} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              {Array.from({ length: dotCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => activeApi?.scrollTo(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: selectedIndex === i ? 40 : 24,
                    backgroundColor:
                      selectedIndex === i ? colors.secondary : "#A9A9A9",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Suggestion;
