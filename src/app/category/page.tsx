"use client";

import CatSection from "@/components/CatSection";
import React, { useEffect, useState } from "react";

const CategoryPage = () => {
  return (
    <div className="p-6  flex flex-col min-h-screen">
      <div className="mt-32 items-center flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 border-2 border-black rounded-full py-1 px-2 w-fit ">
          CATEGORIES
        </h1>
        <span>Browse based your interest</span>
      </div>
      <CatSection />
    </div>
  );
};

export default CategoryPage;
