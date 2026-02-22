"use client";

import { colors } from "@/src/lib/colors";
import { useProducts } from "@/src/context/productContext";
import ProductCard from "../reUsable/product/ProductCard";
import SectionTitle from "@/src/hooks/SectionTitle";
import { PrimaryButton } from "@/src/hooks/PrimaryButton";
import ProductCardSkeleton from "../reUsable/product/ProductCardSkeleton.tsx";

const NewDrops = () => {
  const { products, loading, error, emptyMessage } = useProducts();
  const visibleProducts = products?.slice(0, 4) || [];
  const isEmpty = !loading && !error && visibleProducts.length === 0;

  return (
    <section
      className="w-full lg:px-0 px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto w-full max-w-330">
        <div className="mb-6 flex items-end justify-between">
          <SectionTitle
            text={` DON'T MISS OUT
            NEW DROPS`}
            color={colors.primary}
          />

          <PrimaryButton text="SHOP NEW DROPS" />
        </div>

        {loading && (
          <div className="grid gap-3 lg:gap-4 grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className="text-lg font-medium"
              style={{ color: colors.primary }}
            >
              Something went wrong.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Unable to load new drops.
            </p>
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className="text-lg font-medium"
              style={{ color: colors.primary }}
            >
              {emptyMessage || "No new drops available."}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Please check back later.
            </p>
          </div>
        )}

        {!loading && !error && !isEmpty && (
          <div className="grid gap-3 lg:gap-4 grid-cols-2 xl:grid-cols-4">
            {visibleProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewDrops;
