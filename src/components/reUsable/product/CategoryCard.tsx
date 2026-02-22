"use client";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

interface CategoryCardProps {
  id?: number | string;
  name?: string;
  image?: string;
  index: number;
}

const CategoryCard = ({ id, name = "", image, index }: CategoryCardProps) => {
  const [first, ...rest] = name.split(" ");
  const imageSrc =
    typeof image === "string" && image.length > 0 ? image : "/fallback.png";

  return (
    <article
      key={id ?? `${name}-${index}`}
      className="relative flex flex-col justify-between"
      style={{
        backgroundColor: index === 0 ? "#B1AEAC" : "#AFAFAF",
      }}
    >
      <div className="relative h-90 w-full lg:h-140">
        <Image
          src={imageSrc}
          alt={name || "Category image"}
          fill
          priority={index === 0}
          className={`object-contain object-top ${
            index === 0 ? "-scale-x-100" : ""
          }`}
        />
      </div>

      <div className="relative z-10 flex items-end justify-between px-9 pb-7">
        <h3 className="font-[Rubik] text-3xl font-bold uppercase text-(--primary)">
          {first}
          <br />
          {rest.join(" ")}
        </h3>

        <button
          aria-label={`Open ${name}`}
          className="grid size-11 place-items-center rounded-lg bg-(--primary) text-(--bg)"
        >
          <FiArrowUpRight className="text-[1.5rem]" />
        </button>
      </div>
    </article>
  );
};

export default CategoryCard;
