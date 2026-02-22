"use client";

import { colors } from "@/src/lib/colors";
import Suggestion from "@/src/components/product/Suggestion";
import CartList from "@/src/components/reUsable/cart/CartList";
import CartOrderSummary from "@/src/components/reUsable/cart/CartOrderSummary";
import { useProducts } from "@/src/context/productContext";

const Cart = () => {
  const { cart, cartLoading, subtotal } =
    useProducts();

  const delivery = 6.99;
  const total = subtotal + delivery;

  return (
    <section
      className="px-4 flex flex-col gap-10 lg:gap-25 pt-24 lg:pt-28"
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--bg": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-332">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-(--primary) lg:text-3xl">
            Saving to celebrate
          </h1>

          <p className="mt-2 text-sm text-(--primary)/75">
            Enjoy up to 60% off — no code needed.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white/60 p-5 lg:p-8">
            <h2 className="text-2xl font-semibold text-(--primary)">
              Your Bag
            </h2>

            {cartLoading ? (
              <p className="mt-6">Loading cart...</p>
            ) : cart.length === 0 ? (
              <p className="mt-6 text-sm text-(--primary)">
                Your cart is empty.
              </p>
            ) : (
              <CartList
                items={cart}
              />
            )}
          </div>

          <CartOrderSummary
            itemCount={cart.length}
            subtotal={subtotal}
            delivery={delivery}
            total={total}
          />
        </div>
      </div>

      <Suggestion />
    </section>
  );
};

export default Cart;
