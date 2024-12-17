"use client";

import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [linksVisible, setLinksVisible] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleSearchBar = (): void => {
    setSearchVisible(!searchVisible);
    setLinksVisible(!linksVisible);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitSearch = () => {
    if (searchQuery) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed w-full bg-white shadow-md p-5 flex items-center justify-between z-50 transition-all ease-in-out duration-300">
      <Link href="/">
        <Image
          src={"/svg/logo_now_think.svg"}
          height={0}
          width={0}
          alt="logo"
          className="w-32 h-10"
          loading="lazy"
        />
      </Link>

      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className={`text-black text-2xl transition-transform duration-300 ease-in-out ${
            menuOpen ? "rotate-180" : ""
          }`}
        >
          {menuOpen ? <CgClose /> : <>&#9776;</>}
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <Link
          className="font-DmMonoRegular text-xl text-black px-2 py-2 transition-all ease-in-out duration-300 hover:text-gray-600"
          href={"/post"}
        >
          Post
        </Link>
        <Link
          className="font-DmMonoRegular text-xl text-black px-2 py-2 transition-all ease-in-out duration-300 hover:text-gray-600"
          href={"/category"}
        >
          Categories
        </Link>
        <Link
          className="font-DmMonoRegular text-xl text-black px-2 py-2 transition-all ease-in-out duration-300 hover:text-gray-600"
          href={"/about"}
        >
          About
        </Link>

        <div className="flex items-center ml-5">
          {searchVisible && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
              className="bg-gray-200 text-black py-2 px-4 rounded-md border-none outline-none text-xl transition-all ease-in-out duration-300"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitSearch();
                }
              }}
            />
          )}

          <button onClick={toggleSearchBar} className="ml-2">
            {searchVisible ? (
              <CgClose color="black" />
            ) : (
              <SlMagnifier color="black" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-lg py-5 z-40 flex flex-col items-start lg:hidden transition-all ease-in-out duration-300 transform opacity-100"
          style={{
            transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
            opacity: menuOpen ? 1 : 0,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="bg-gray-200 text-black py-2 px-8 rounded-md border-none outline-none text-xl mx-auto mb-4 transition-all ease-in-out duration-300"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitSearch();
              }
            }}
          />
          <div
            className="flex flex-col items-start transition-all ease-in-out duration-300"
            style={{
              maxHeight: menuOpen ? "300px" : "0",
              overflow: "hidden",
              opacity: menuOpen ? 1 : 0,
              transition: "max-height 0.3s ease, opacity 0.3s ease",
            }}
          >
            <Link
              className="font-DmMonoRegular text-xl text-black px-5 py-2 w-full hover:bg-gray-100 transition-all ease-in-out duration-300"
              href={"/post"}
              onClick={toggleMenu}
            >
              Post
            </Link>
            <Link
              className="font-DmMonoRegular text-xl text-black px-5 py-2 w-full hover:bg-gray-100 transition-all ease-in-out duration-300"
              href={"/category"}
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              className="font-DmMonoRegular text-xl text-black px-5 py-2 w-full hover:bg-gray-100 transition-all ease-in-out duration-300"
              href={"/about"}
              onClick={toggleMenu}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
