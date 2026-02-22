import Image from "next/image";
import { colors } from "@/src/lib/colors";
import SectionTitle from "@/src/hooks/SectionTitle";
import { PrimaryButton } from "@/src/hooks/PrimaryButton";

const HeroProduct = () => {
  return (
    <div className="w-full">
      <section className="relative h-100 lg:h-187.5 w-full overflow-hidden rounded-3xl lg:rounded-[4rem]">
        <Image
          src="/hero/shoe.jpg"
          alt="Nike Air Max"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1320px"
          className="object-cover"
          quality={100}
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_31.12%,rgba(0,0,0,0.5)_66.06%)]" />

        <div
          className="absolute left-0 top-5 lg:top-20 flex py-3 px-1.5 lg:px-0 lg:py-0 lg:h-[14.813rem] lg:w-[4.188rem] items-center justify-center rounded-r-xl lg:rounded-r-2xl"
          style={{ backgroundColor: colors.primary }}
        >
          <p
            className="rotate-180 lg:text-[16px] text-sm whitespace-nowrap font-semibold [writing-mode:vertical-rl]"
            style={{ color: colors.background }}
          >
            Nike product of the year
          </p>
        </div>

        <div className="absolute left-4 lg:left-12 bottom-5 lg:bottom-10 flex w-122.5 flex-col items-start gap-4">
          <div className="flex flex-col">
            <SectionTitle text={`NIKE AIR MAX`} color={colors.background} />
            <p
              className="lg:text-2xl lg:w-full w-60 lg:leading-relaxed"
              style={{ color: colors.background }}
            >
              Nike introducing the new air max for everyone's comfort
            </p>
          </div>

          <PrimaryButton text="SHOP NOW" />
        </div>

        <div className="absolute right-4 lg:right-12 bottom-5 lg:bottom-10 flex lg:w-40 flex-col gap-2 lg:gap-4">
          <div
            className="w-20 h-20 lg:h-40 lg:w-40 overflow-hidden rounded-2xl border lg:border-[3px]"
            style={{ borderColor: colors.background }}
          >
            <Image
              src="/hero/shoe-1.jpg"
              alt="Nike Air Max detail"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="w-20 h-20 lg:h-40 lg:w-40 overflow-hidden rounded-2xl border lg:border-[3px]"
            style={{ borderColor: colors.background }}
          >
            <Image
              src="/hero/shoe-2.jpg"
              alt="Nike Air Max side"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroProduct;
