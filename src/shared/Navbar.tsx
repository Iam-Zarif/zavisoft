"use client"
import Image from "next/image";
import { FaSortDown, FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { colors } from "@/src/lib/colors";
import Logo from "../hooks/Logo";
import { LuMenu } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    const router = useRouter();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full z-50 px-4">
      <div className="max-w-332 mx-auto w-full p-4 md:p-6 bg-white rounded-3xl relative flex items-center">
        <div className="flex-1 flex items-center gap-8">
          <LuMenu
            className="text-3xl md:text-4xl lg:hidden cursor-pointer"
            style={{ color: colors.primary }}
          />

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex cursor-pointer items-center gap-1">
              <p className="font-semibold" style={{ color: colors.primary }}>
                New Drops
              </p>
              <Image
                src="/navbar/fire.png"
                width={12}
                height={12}
                alt="New Drops Icon"
                className="cursor-pointer"
              />
            </div>

            <div className="flex items-start gap-1 cursor-pointer">
              <p className="font-semibold" style={{ color: colors.primary }}>
                Men
              </p>
              <FaSortDown />
            </div>

            <div className="flex items-start gap-1 cursor-pointer">
              <p className="font-semibold" style={{ color: colors.primary }}>
                Women
              </p>
              <FaSortDown />
            </div>
          </div>
        </div>

        <div
          onClick={() => router.push("/")}
          className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <div className="scale-75 md:scale-100">
            <Logo
              k_fill={colors.primary}
              i_fill={colors.primary}
              c_fill={colors.primary}
              s_fill={colors.primary}
            />
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-4 md:gap-8">
          <IoSearch
            className="text-2xl hidden md:block cursor-pointer"
            style={{ color: colors.primary }}
          />
          <Link href="/cart" className="block">
            <FaUser
              className="text-xl cursor-pointer"
              style={{ color: colors.primary }}
            />
          </Link>
          <p
            className="h-7 w-7 text-sm flex items-center justify-center rounded-full cursor-pointer"
            style={{ backgroundColor: colors.tertiary }}
          >
            O
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
