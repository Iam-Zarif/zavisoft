import Image from "next/image";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { colors } from "@/src/lib/colors";

const items = [
  {
    id: 1,
    title: "LIFESTYLE SHOES",
    image: "/categories/categories2.png",
    alt: "Lifestyle shoes",
  },
  {
    id: 2,
    title: "BASKETBALL SHOES",
    image: "/categories/categories1.png",
    alt: "Basketball shoes",
  },
];

const Categories = () => {
  return (
    <section
      className="lg:pt-0 pt-10 pb-8 lg:pb-20"
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--tertiary": colors.tertiary,
          "--bg": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full lg:px-0 px-4 rounded-none bg-(--primary) pb-0 pt-6 lg:pt-12">
        <div className="max-w-402 ml-auto w-full">
          {" "}
          <div className="mb-6 lg:mb-10 max-w-332 mr-auto flex items-center justify-between">
            <h2 className=" text-xl lg:text-[4rem]/[1] font-bold uppercase text-(--bg)">
              Categories
            </h2>

            <div className="flex items-center gap-2">
              <button className="grid size-8 place-items-center rounded-lg bg-white/65 text-(--primary)">
                <FiChevronLeft className="text-[1rem]" />
              </button>
              <button className="grid size-8 place-items-center rounded-lg bg-(--bg) text-(--primary)">
                <FiChevronRight className="text-[1rem]" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 overflow-hidden rounded-tl-[2.25rem] md:grid-cols-2">
            {" "}
            {items.map((item, index) => (
              <article
                key={item.id}
                className={`relative ${index === 0 ? "bg-[#ECEEF0]" : "bg-[#F5F6F5]"}`}
              >
                <div className="relative mx-auto h-90 lg:h-140 w-full">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className={`object-contain object-top ${index === 0 ? "-scale-x-100" : ""}`}
                  />
                </div>

                <div className="flex items-end justify-between px-9 pb-7">
                  <h3 className="font-[Rubik] text-3xl font-bold uppercase text-(--primary)">
                    {item.title.split(" ")[0]}
                    <br />
                    {item.title.split(" ").slice(1).join(" ")}
                  </h3>

                  <button className="grid size-11 place-items-center rounded-lg bg-(--primary) text-(--bg)">
                    <FiArrowUpRight className="text-[1.5rem]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
