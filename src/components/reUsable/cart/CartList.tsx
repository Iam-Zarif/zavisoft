"use client";

import Image from "next/image";
import { FiChevronDown, FiHeart, FiTrash2 } from "react-icons/fi";
import { CartItem } from "@/src/types/products";

interface Props {
  items: CartItem[];
}

const CartList = ({ items }: Props) => {
  if (items.length === 0) {
    return <p className="mt-6 text-sm text-(--primary)">Your cart is empty.</p>;
  }

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="mt-8 grid gap-6 sm:grid-cols-[160px_1fr]">
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[#ECEEF0] sm:h-44">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain p-3"
            />
          </div>

          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold uppercase text-(--primary) lg:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-(--primary)/85">
                  {item.description}
                </p>

                <p className="text-sm text-(--primary)/85">{item.color}</p>
              </div>

              <p className="text-lg font-semibold text-(--secondary) lg:text-2xl">
                ${item.price}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-(--primary)">
              <button className="flex items-center gap-1">
                Size {item.size}
                <FiChevronDown />
              </button>

              <button
                className="flex items-center gap-1 cursor-pointer"
              >
                Quantity {item.quantity}
                <FiChevronDown />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4 text-(--primary)">
              <FiHeart className="cursor-pointer text-xl" />

              <FiTrash2
                className="cursor-pointer text-xl"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartList;
