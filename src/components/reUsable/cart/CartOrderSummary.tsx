"use client";

interface Props {
  itemCount: number;
  subtotal: number;
  delivery: number;
  total: number;
}

const CartOrderSummary = ({ itemCount, subtotal, delivery, total }: Props) => {
  return (
    <aside>
      <h2 className="text-2xl font-semibold text-(--primary) lg:text-4xl">
        Order Summary
      </h2>

      <div className="mt-6 space-y-3 text-sm text-(--primary)">
        <div className="flex justify-between">
          <span>{itemCount} ITEM</span>
          <span>${(subtotal ?? 0).toFixed(2)}</span>{" "}
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(delivery ?? 0).toFixed(2)}</span>{" "}
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

      <button className="mt-6 cursor-pointer h-12 w-full rounded-lg bg-(--primary) text-sm font-medium uppercase tracking-wide text-white hover:opacity-90">
        Checkout
      </button>

      <button className="mt-4 cursor-pointer text-sm font-medium underline text-(--primary)">
        Use a promo code
      </button>
    </aside>
  );
};

export default CartOrderSummary;
