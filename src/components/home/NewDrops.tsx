"use client";

import { colors } from "@/src/lib/colors";
import { useProducts } from "@/src/context/productContext";
import ProductCardSkeleton from "../reUsable/product/ProductCardSkeleton.tsx";
import ProductCard from "../reUsable/product/ProductCard";
import SectionTitle from "@/src/hooks/SectionTitle";
import { PrimaryButton } from "@/src/hooks/PrimaryButton";

const NewDrops = () => {
  const { products, loading } = useProducts();

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
