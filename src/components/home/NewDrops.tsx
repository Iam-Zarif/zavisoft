"use client";

import { colors } from "@/src/lib/colors";
import { useProducts } from "@/src/context/productContext";
import ProductCardSkeleton from "../reUsable/product/ProductCardSkeleton.tsx";
import ProductCard from "../reUsable/product/ProductCard";

const NewDrops = () => {
  const { products, loading } = useProducts();

  return (
    <section
      className="w-full px-4 lg:py-10"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto w-full max-w-330">
        <div className="mb-6 flex items-end justify-between">
          <h2
            className="text-2xl lg:text-6xl font-semibold uppercase tracking-[-0.02em]"
            style={{ color: colors.primary }}
          >
            DON&apos;T MISS OUT
            <br />
            NEW DROPS
          </h2>

          <button
            className="h-10 lg:h-12 rounded-lg px-4 lg:px-6 text-xs lg:text-sm font-medium uppercase tracking-wide text-white"
            style={{ backgroundColor: colors.secondary }}
          >
            SHOP NEW DROPS
          </button>
        </div>

        <div className="grid gap-3 lg:gap-4 grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products
                .slice(0, 4)
                .map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
};

export default NewDrops;
