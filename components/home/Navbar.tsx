"use client";

import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
          <Link href="/">
            <div className="items-center hidden lg:flex">
              <Image src={"/logo.svg"} alt="logo" height={28} width={28} />
              <p className="font-semibold text-[#0079ff] text-2xl ml-2.5">
                Ecomsy
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};
