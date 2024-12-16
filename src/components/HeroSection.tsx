"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { client } from "@/lib/contentful";

export default function HeroSection() {
  const [content, setContent] = useState<any | null>(null);

  const fetchMainArticle = async () => {
    try {
      const data = await client.getEntries({
        content_type: "blogspot",
        order: ["-fields.publishDate"] as ["-fields.publishDate"],
        limit: 1,
      });
      console.log(data.items);
      if (data.items.length > 0) {
        setContent(data.items[0].fields);
      } else {
        console.log("Article not found.");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    fetchMainArticle();
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  const { title, excerpt, image, category, publishDate, slug } = content;
  const categoryName = category?.fields?.name || "Uncategorized";
  const publishDateFormatted = new Date(publishDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <section className="hero-section bg-gray-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <p className="text-sm uppercase font-semibold text-gray-500">
          {categoryName}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-gray-800">
          {title}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{excerpt}</p>
        <p className="text-sm text-gray-400 mt-2">{publishDateFormatted}</p>
        {image && image[0]?.fields?.file?.url && (
          <div className="mt-6">
            <Image
              src={`https:${image[0].fields.file.url}`}
              alt={title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
        <Link
          href={`/post/${slug}`}
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700"
        >
          Read More
        </Link>
      </div>
    </section>
  );
}
