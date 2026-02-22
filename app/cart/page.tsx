"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { colors } from "@/src/lib/colors";
import Suggestion from "@/src/components/product/Suggestion";
import { CartItem } from "@/src/types/products";
import CartList from "@/src/components/reUsable/CartList";


const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/cart.json");
        await new Promise((res) => setTimeout(res, 500));
        setCartItems(data);
      } catch (error) {
        console.error("Cart fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, type: "inc" | "dec") => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const delivery = 6.99;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

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

          <p className="mt-2 text-sm text-(--primary)/75 lg:text-base">
            Enjoy up to 60% off thousands of styles — no code needed.
          </p>

          <p className="mt-2 text-sm font-medium underline text-(--primary) lg:text-base">
            Join us <span className="no-underline">or</span> Sign-in
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white/60 p-5 lg:p-8">
            <h2 className="text-2xl font-semibold text-(--primary) lg:text-4xl">
              Your Bag
            </h2>

            <p className="mt-1 text-sm text-(--primary)/70 lg:text-base">
              Items in your bag — not reserved.
            </p>

            {loading ? (
              <div className="mt-8 space-y-6 animate-pulse">
                {[1].map((item) => (
                  <div
                    key={item}
                    className="grid gap-6 sm:grid-cols-[160px_1fr]"
                  >
                    <div className="h-40 w-full rounded-xl bg-gray-300 sm:h-44" />

                    <div className="space-y-4">
                      <div className="h-6 w-3/4 rounded bg-gray-300" />
                      <div className="h-4 w-full rounded bg-gray-300" />
                      <div className="h-4 w-1/2 rounded bg-gray-300" />

                      <div className="flex gap-4">
                        <div className="h-6 w-20 rounded bg-gray-300" />
                        <div className="h-6 w-20 rounded bg-gray-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : cartItems.length === 0 ? (
              <p className="mt-6 text-sm text-(--primary)">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <CartList
                key={item.id}
                  items={[item]}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))
            )}
          </div>

          <aside>
            <h2 className="text-2xl font-semibold text-(--primary) lg:text-4xl">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3 text-sm text-(--primary)">
              <div className="flex justify-between">
                <span>{cartItems.length} ITEM</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span>-</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-lg font-semibold text-(--primary)">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="mt-6 h-12 w-full rounded-lg bg-(--primary) text-sm font-medium uppercase tracking-wide text-white hover:opacity-90">
              Checkout
            </button>

            <button className="mt-4 text-sm font-medium underline text-(--primary)">
              Use a promo code
            </button>
          </aside>
        </div>
      </div>

      <Suggestion />
    </section>
  );
};

export default Cart;
