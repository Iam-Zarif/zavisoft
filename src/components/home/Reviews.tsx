"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { colors } from "@/src/lib/colors";
import SectionTitle from "@/src/hooks/SectionTitle";
import { PrimaryButton } from "@/src/hooks/PrimaryButton";

const reviews = [
  {
    id: 1,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar: "/reviews/avatar1.webp",
    photo: "/reviews/review1.png",
  },
  {
    id: 2,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar: "/reviews/avatar2.avif",
    photo: "/reviews/review2.png",
  },
  {
    id: 3,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar: "/reviews/avatar3.avif",
    photo: "/reviews/review3.png",
  },
];

const Reviews = () => {
  const [isLarge, setIsLarge] = useState<boolean | null>(null);

  useEffect(() => {
    const media = matchMedia("(min-width: 768px)");
    const update = () => setIsLarge(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (isLarge === null) return null;

  const visible = isLarge ? reviews : reviews.slice(0, 1);

  return (
    <section
      className="lg:px-0 px-4"
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--tertiary": colors.tertiary,
          "--bg": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-330 bg-(--bg) ">
        <div className="mb-7 flex items-center justify-between">
          <SectionTitle text={`Reviews`} color={colors.primary} />

          <PrimaryButton text="See All" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {visible.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.25rem] bg-[#f3f4f6]"
            >
              <div className="flex items-start justify-between p-5 lg:p-8">
                <div>
                  <h3 className="font-[Rubik] text-2xl font-semibold text-(--primary)">
                    {item.title}
                  </h3>
                  <p className="mt-1 pr-5 text-(--primary)/80">{item.text}</p>

                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="text-lg text-(--tertiary)" />
                    ))}
                    <span className="font-[Rubik] text-[0.875rem] ml-2 font-medium text-(--primary)">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <Image
                  src={item.avatar}
                  alt={`${item.title} reviewer`}
                  width={50}
                  height={50}
                  className="size-14 rounded-full object-cover"
                />
              </div>

              <div className="relative h-84 w-full">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
