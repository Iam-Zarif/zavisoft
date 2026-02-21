import Logo from "@/src/hooks/Logo";
import { colors } from "@/src/lib/colors";
import { FaCirclePlus } from "react-icons/fa6";

const Cta = () => {
  return (
    <section
      className="px-4 lg:pt-0 pt-10"
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--tertiary": colors.tertiary,
          "--background": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-332 rounded-t-[3rem] bg-(--secondary) px-6 py-12 md:px-10  lg:px-18  lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-[Rubik] text-3xl md:text-4xl lg:text-5xl font-semibold uppercase leading-tight text-(--background)">
              Join our KicksPlus
              <br />
              club & get 15% off
            </h2>

            <p className="mt-3 text-base md:text-lg font-semibold text-(--background)">
              Sign up for free! Join the community.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Email address"
                className="h-12 w-full sm:w-72 md:w-80 rounded-lg border border-white bg-transparent px-4 text-(--background) placeholder:text-(--background)/70 outline-none"
              />
              <button
                type="submit"
                className="h-12 w-fit rounded-lg bg-(--primary) px-6 font-[Rubik] text-sm font-medium uppercase tracking-wide text-(--background)"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="relative flex justify-center">
            <FaCirclePlus className="absolute top-6 right-6 md:top-10 md:-right-2 text-(--tertiary) text-2xl md:text-3xl" />

            <div className="w-48 sm:w-64 md:w-80 lg:w-[350px]">
              <Logo
                k_fill={colors.background}
                i_fill={colors.background}
                c_fill={colors.background}
                s_fill={colors.background}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
