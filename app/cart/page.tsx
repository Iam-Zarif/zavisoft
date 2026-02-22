import Image from "next/image";
import { FiChevronDown, FiHeart, FiTrash2 } from "react-icons/fi";
import { colors } from "@/src/lib/colors";
import Suggestion from "@/src/components/product/Suggestion";

const Cart = () => {
  return (
    <section
      className="px-4 py-8 lg:py-28"
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
          <h1 className="font-[Rubik] text-xl font-semibold text-(--primary) lg:text-3xl">
            Saving to celebrate
          </h1>

          <p className="mt-2 text-sm text-(--primary)/75 lg:text-base">
            Enjoy up to 60% off thousands of styles during the End of Year sale
            - while supplies last. No code needed.
          </p>

          <p className="mt-2 text-sm font-medium text-(--primary) underline lg:text-base">
            Join us <span className="no-underline">or</span> Sign-in
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white/60 p-5 lg:p-8">
            <h2 className="text-2xl font-semibold text-(--primary) lg:text-4xl">
              Your Bag
            </h2>

            <p className="mt-1 text-sm text-(--primary)/70 lg:text-base">
              Items in your bag not reserved — check out now to make them yours.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-[160px_1fr]">
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[#d5d7db] sm:h-44">
                <Image
                  src="/newDrops/shoe1.png"
                  alt="Dropset trainer shoes"
                  fill
                  className="object-contain p-3"
                />
              </div>

              {/* Details */}
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold uppercase text-(--primary) lg:text-2xl">
                      Dropset Trainer Shoes
                    </h3>

                    <p className="mt-1 text-sm text-(--primary)/85 lg:text-base">
                      Men&apos;s Road Running Shoes
                    </p>

                    <p className="text-sm text-(--primary)/85 lg:text-base">
                      Enamel Blue / University White
                    </p>
                  </div>

                  <p className="text-lg font-semibold text-(--secondary) lg:text-2xl">
                    $130.00
                  </p>
                </div>

                {/* Size + Quantity */}
                <div className="mt-4 flex flex-wrap gap-6 text-sm text-(--primary) lg:text-base">
                  <button className="flex items-center gap-1">
                    Size 10 <FiChevronDown className="text-sm" />
                  </button>

                  <button className="flex items-center gap-1">
                    Quantity 1 <FiChevronDown className="text-sm" />
                  </button>
                </div>

                {/* Icons */}
                <div className="mt-4 flex items-center gap-4 text-(--primary)">
                  <FiHeart className="cursor-pointer text-xl" />
                  <FiTrash2 className="cursor-pointer text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= SUMMARY ================= */}
          <aside>
            <h2 className="text-2xl font-semibold text-(--primary) lg:text-4xl">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3 text-sm text-(--primary) lg:text-base">
              <div className="flex justify-between">
                <span>1 ITEM</span>
                <span>$130.00</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>$6.99</span>
              </div>

              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span>-</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-lg font-semibold text-(--primary) lg:text-2xl">
              <span>Total</span>
              <span>$136.99</span>
            </div>

            <button className="mt-6 h-12 w-full rounded-lg bg-(--primary) text-sm font-medium uppercase tracking-wide text-white transition hover:opacity-90">
              Checkout
            </button>

            <button className="mt-4 text-sm font-medium underline text-(--primary)">
              Use a promo code
            </button>
          </aside>
        </div>
      </div>
      <Suggestion/>
    </section>
  );
};

export default Cart;
