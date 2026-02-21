import Image from "next/image";
import { colors } from "@/src/lib/colors";

const products = [
  {
    id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/newDrops/shoe1.png",
  },
  {
    id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/newDrops/shoe2.png",
  },
  {
    id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/newDrops/shoe3.png",
  },
  {
    id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/newDrops/shoe4.png",
  },
];

const NewDrops = () => {
  return (
    <section
      className="w-full px-4 lg:py-10"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto w-full max-w-330">
        <div className="mb-6 flex items-end justify-between">
          <h2
            className="text-2xl lg:text-6xl font-semibold uppercase tracking-[-0.02em]"
            style={{ color: colors.primary }}
          >
            DON&apos;T MISS OUT
            <br />
            NEW DROPS
          </h2>

          <button
            className="h-10 lg:h-12 rounded-lg px-4 lg:px-6 text-xs lg:text-sm font-medium uppercase tracking-wide text-white cursor-pointer"
            style={{ backgroundColor: colors.secondary }}
          >
            SHOP NEW DROPS
          </button>
        </div>

        <div className="grid  gap-4 grid-cols-2 xl:grid-cols-4">
          {products.map((item) => (
            <article key={item.id}>
              <div className="relative h-55 lg:h-80 bg-[#ECEEF0] w-full overflow-hidden rounded-2xl border-6 border-white">
                <span
                  className="absolute -left-1 top-0 z-10 rounded-br-3xl px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: colors.secondary }}
                >
                  New
                </span>

                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={170}
                  className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>

              <h3
                className="mt-3 lg:text-xl font-bold uppercase"
                style={{ color: colors.primary }}
              >
                ADIDAS 4DFWD X PARLEY
                <br />
                RUNNING SHOES
              </h3>

              <button
                className="mt-3 text-sm flex h-10 lg:h-12 w-full items-center justify-center rounded-lg font-medium uppercase tracking-wide cursor-pointer"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewDrops;
