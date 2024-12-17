"use client";

import Button from "@/components/Button";
import CatSection from "@/components/CatSection";
import FeatSection from "@/components/FeatSection";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = async () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="lg:mt-48 mt-24">
        <HeroSection />
      </div>
      <hr className="my-16 border border-gray-100 w-full" />
      <h1 className="text-xl lg:w-full w-96 text-center tracking-tighter">
        Subscribe to our newsletter for daily industry insights
      </h1>
      <div className="w-full flex flex-row items-center justify-center my-5 gap-5">
        <input
          placeholder="Enter Your email"
          className="border-4 border-black p-4 py-1 w-1/3 rounded-full font-InterRegular"
        />
        <Button title="Subscribe +" />
      </div>
      <hr className="my-16 border border-gray-100 w-full" />
      <h1 className="text-4xl border-4 border-black font-InterBold rounded-full px-4 py-1">
        Featured Posts
      </h1>
      <div className="flex flex-col item-center">
        <FeatSection />
        <Link
          href={"/post"}
          className="flex items-center justify-center mx-5 text-2xl hover:text-gray-400"
        >
          EXPLORE MORE
          <FaArrowRightLong className="ml-2" />
        </Link>
      </div>
      <hr className="my-16 border border-gray-100 w-full" />
      <h1 className="text-4xl border-4 border-black font-InterBold rounded-full px-4 py-1">
        Categories
      </h1>
      <div className="flex flex-col item-center mb-10">
        <CatSection limit={3} />
        <Link
          href={"/category"}
          className="flex items-center justify-center mx-5 text-2xl hover:text-gray-400"
        >
          EXPLORE MORE
          <FaArrowRightLong className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
