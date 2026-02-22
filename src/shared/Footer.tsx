"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { colors } from "@/src/lib/colors";
import Logo from "../hooks/Logo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

  
    const logoRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (!logoRef.current) return;

      const el = logoRef.current;

      const ctx = gsap.context(() => {
        gsap.set(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          WebkitClipPath: "inset(0% 0% 100% 0%)",
        });

        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          WebkitClipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom", 
            toggleActions: "play none none reverse",
            markers: false,
          },
        });
      }, logoRef);

      return () => ctx.revert();
    }, []);

  return (
    <footer
      className="px-4 pb-4 -mt-10"
      style={
        {
          "--primary": colors.primary,
          "--tertiary": colors.tertiary,
          "--bg": colors.background,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-332">
        <div className="rounded-[3rem] bg-(--primary) px-6 pt-8 md:px-10 md:pt-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="lg:w-2/5">
              <h3 className="text-3xl md:text-4xl font-semibold text-(--tertiary)">
                About us
              </h3>
              <p className="mt-3 max-w-lg text-base md:text-lg font-medium leading-relaxed text-(--bg)">
                We are the biggest hyperstore in the universe. We got you
                covered with our exclusive collections and latest drops.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:gap-16">
              <div>
                <h4 className="text-xl md:text-2xl font-semibold text-(--tertiary)">
                  Categories
                </h4>
                <div className="mt-3 space-y-2 text-base md:text-lg font-semibold text-(--bg)">
                  <Link href="#">Runners</Link>
                  <Link href="#" className="block">
                    Sneakers
                  </Link>
                  <Link href="#" className="block">
                    Basketball
                  </Link>
                  <Link href="#" className="block">
                    Outdoor
                  </Link>
                  <Link href="#" className="block">
                    Golf
                  </Link>
                  <Link href="#" className="block">
                    Hiking
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-semibold text-(--tertiary)">
                  Company
                </h4>
                <div className="mt-3 space-y-2 text-base md:text-lg font-semibold text-(--bg)">
                  <Link href="#">About</Link>
                  <Link href="#" className="block">
                    Contact
                  </Link>
                  <Link href="#" className="block">
                    Blogs
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-semibold text-(--tertiary)">
                  Follow us
                </h4>
                <div className="mt-4 flex items-center gap-6 text-(--bg)">
                  <FaFacebook className="text-2xl" />
                  <FaInstagram className="text-2xl" />
                  <FaTwitter className="text-2xl" />
                  <FaTiktok className="text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-14 md:pt-20  overflow-hidden" ref={logoRef}>
            <Logo
              k_fill={colors.background}
              i_fill={colors.background}
              c_fill={colors.background}
              s_fill={colors.background}
              width="100%"
            
            />
          </div>
        </div>

        <p className="mt-3 text-center text-(--primary) text-sm md:text-base">
          © All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
