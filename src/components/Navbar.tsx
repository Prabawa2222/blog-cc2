"use client";

import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { CgClose } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";

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
    <div className="fixed w-full bg-white shadow-md p-5 flex items-center justify-between z-50">
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

      <div className="flex items-center gap-4 lg:hidden">
        <button onClick={toggleMenu} className="text-white text-2xl">
          &#9776;
        </button>
      </div>

      <div
        className={`${
          searchVisible
            ? "bg-white justify-between border-2 border-black py-2 px-16"
            : "bg-black py-2 px-10"
        } flex items-center  rounded-full w-fit transition-all duration-500`}
      >
        {linksVisible && !menuOpen && (
          <div
            className={`${
              linksVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000 flex items-center gap-4 lg:flex`}
          >
            <Link
              className="font-DmMonoRegular text-xl text-white px-2 py-2"
              href={"/post"}
            >
              Post
            </Link>
            <Link
              className="font-DmMonoRegular text-xl text-white px-2 py-2"
              href={"/category"}
            >
              Categories
            </Link>
            <Link
              className="font-DmMonoRegular text-xl text-white px-2 py-2"
              href={"/about"}
            >
              About
            </Link>
          </div>
        )}

        {searchVisible && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="bg-transparent text-black py-2 px-10 w-full flex-grow  rounded-md border-none outline-none text-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitSearch();
              }
            }}
          />
        )}

        <button onClick={toggleSearchBar} className="ml-5">
          {searchVisible ? (
            <CgClose color="black" />
          ) : (
            <SlMagnifier color="white" />
          )}
        </button>
      </div>

      <Button title="SUBSCRIBE+" />
    </div>
  );
};

export default Navbar;
