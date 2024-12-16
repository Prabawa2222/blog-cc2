"use client";

import Loading from "@/components/Loading";
import { client } from "@/lib/contentful";
import { ListCategory, TypeBlogPostSkeleton } from "@/types/contentful.types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState<ListCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await client.getEntries({
          content_type: "blogspot",
          select: ["fields.category"],
        });

        const categoryList: ListCategory[] = [];

        // Extract the unique categories from the fetched data
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
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
      <ul className="mt-6">
        {categories.map((category) => (
          <Link
            key={category.sys.id}
            className="text-xl text-gray-700 hover:text-blue-600 mb-4"
            href={`/category/${category.fields.slug.toLowerCase()}`}
          >
            {category.fields.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
