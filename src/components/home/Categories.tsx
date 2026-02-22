"use client";
import {  FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { colors } from "@/src/lib/colors";
import { useProducts } from "@/src/context/productContext";
import SectionTitle from "@/src/hooks/SectionTitle";
import CategoryCard from "../reUsable/product/CategoryCard";

const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 animate-pulse md:grid-cols-2">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-90 rounded-tl-[2.25rem] bg-gray-300 lg:h-140"
        />
      ))}
    </div>
  );
};

const Categories = () => {
  const { categories, loading, error, empty } = useProducts();
  const firstTwo = categories?.slice(0, 2);

  return (
    <section
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--tertiary": colors.tertiary,
          "--bg": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full bg-(--primary) px-4 pb-6 pt-6 lg:px-0 lg:pb-0 lg:pt-12">
        <div className="ml-auto w-full max-w-402">
          <div className="mr-auto mb-6 flex max-w-332 items-center justify-between lg:mb-10">
            <SectionTitle text="Categories" color={colors.background} />
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous categories"
                className="grid size-8 place-items-center rounded-lg bg-white/65 text-(--primary)"
              >
                <FiChevronLeft className="text-[1rem]" />
              </button>
              <button
                aria-label="Next categories"
                className="grid size-8 place-items-center rounded-lg bg-(--bg) text-(--primary)"
              >
                <FiChevronRight className="text-[1rem]" />
              </button>
            </div>
          </div>

          {loading ? (
            <CategorySkeleton />
          ) : error ? (
            <div className="flex h-90 items-center justify-center rounded-tl-[2.25rem] bg-gray-200 lg:h-140">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          ) : empty || !firstTwo || firstTwo.length === 0 ? (
            <div className="flex h-90 items-center justify-center rounded-tl-[2.25rem] bg-gray-200 lg:h-140">
              <p className="text-sm font-medium text-gray-600">
                {empty || "No categories available."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 overflow-hidden rounded-tl-[2.25rem] md:grid-cols-2">
              {firstTwo?.map((item, index) => {
                return (
                  <CategoryCard
                    key={item.id ?? `${item.name}-${index}`}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
