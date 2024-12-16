"use client";

import Loading from "@/components/Loading";
import { client } from "@/lib/contentful";
import { ListCategory, TypeBlogPostSkeleton } from "@/types/contentful.types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DiReact } from "react-icons/di";
import { SkeletonCard } from "./Skeleton";

const CatSection = ({ limit }: any) => {
  const [categories, setCategories] = useState<ListCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await client.getEntries({
          content_type: "blogspot",
          select: ["fields.category"],
          limit: limit,
        });
        console.log(data);
        const categoryList: ListCategory[] = [];

        data.items.forEach((item: any) => {
          const category = item.fields.category;
          if (
            category &&
            !categoryList.some((c) => c.fields.name === category.fields.name)
          ) {
            categoryList.push(category);
          }
        });

        setCategories(categoryList);
      } catch (err) {
        setError("Error fetching categories");
        console.error("Error fetching categories from Contentful:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6  grid grid-cols-3 gap-10">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6  grid grid-cols-1 lg:grid-cols-3 gap-10">
      {categories.map((category) => (
        <Link
          key={category.sys.id}
          className="text-xl text-gray-700 hover:text-blue-600 mb-4"
          href={`/category/${category.fields.slug.toLowerCase()}`}
        >
          <div className="group card bg-black rounded-lg w-[300px] lg:w-[200px] h-[300px] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out transform hover:rotate-6">
            <DiReact
              color="white"
              size={100}
              className="flex-1 lg:w-32 w-48 transform group-hover:rotate-12 transition-transform duration-500 ease-in-out"
            />
            <p className="text-2xl text-white text-center pb-10">
              {category.fields.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CatSection;
