"use client";

import Image from "next/image";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { colors } from "@/src/lib/colors";
import { useProducts } from "@/src/context/productContext";
import SectionTitle from "@/src/hooks/SectionTitle";

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
  const { categories, loading } = useProducts();
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
      <div className="mx-auto w-full bg-(--primary) px-4 pb-0 pt-6 lg:px-0 lg:pt-12">
        <div className="ml-auto w-full max-w-402">
          <div className="mr-auto mb-6 flex max-w-332 items-center justify-between lg:mb-10">
            <SectionTitle text="Categories" color={colors.background} />

            <div className="flex items-center gap-2">
              <button className="grid size-8 place-items-center rounded-lg bg-white/65 text-(--primary)">
                <FiChevronLeft className="text-[1rem]" />
              </button>
              <button className="grid size-8 place-items-center rounded-lg bg-(--bg) text-(--primary)">
                <FiChevronRight className="text-[1rem]" />
              </button>
            </div>
          </div>

          {loading ? (
            <CategorySkeleton />
          ) : (
            <div className="grid grid-cols-1 overflow-hidden rounded-tl-[2.25rem] md:grid-cols-2">
              {firstTwo?.map((item, index) => (
                <article
                  key={item.id}
                  className="relative flex flex-col justify-between"
                  style={{
                    backgroundColor: index === 0 ? "#B1AEAC" : "#AFAFAF",
                  }}
                >
                  <div className="relative h-90 w-full lg:h-140">
                    <Image
                      src={item.image || "/fallback.png"}
                      alt={item.name}
                      fill
                      className={`object-contain object-top ${index === 0 ? "-scale-x-100" : ""}`}
                    />
                  </div>

                  <div className="relative z-10 flex items-end justify-between px-9 pb-7">
                    <h3 className="font-[Rubik] text-3xl font-bold uppercase text-(--primary)">
                      {item.name.split(" ")[0]}
                      <br />
                      {item.name.split(" ").slice(1).join(" ")}
                    </h3>

                    <button className="grid size-11 place-items-center rounded-lg bg-(--primary) text-(--bg)">
                      <FiArrowUpRight className="text-[1.5rem]" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
