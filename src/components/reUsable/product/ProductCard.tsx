"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { colors } from "@/src/lib/colors";
import { Product } from "@/src/types/products";

interface Props {
  item: Product;
}

const ProductCard = ({ item }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${item.id}`);
  };

  

  return (
    <article className="flex flex-col h-full cursor-pointer">
      <div className="relative h-45 lg:h-80 w-full overflow-hidden rounded-2xl border-6 border-white bg-[#ECEEF0]">
        <span
          className="absolute -left-1 top-0 z-10 rounded-br-3xl px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: colors.secondary }}
        >
          New
        </span>

        <Image
          src={item.images?.[0] || "/fallback.png"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3
          className="mt-3 lg:text-xl font-bold uppercase"
          style={{ color: colors.primary }}
        >
          {item.title}
        </h3>

        <button
          onClick={handleClick}
          className="mt-auto cursor-pointer flex h-10 lg:h-12 w-full items-center justify-center rounded-lg text-xs lg:text-sm font-medium uppercase tracking-wide"
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
          }}
        >
          VIEW PRODUCT -
          <span className="ml-1" style={{ color: colors.tertiary }}>
            ${item.price}
          </span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
