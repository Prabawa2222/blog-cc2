/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/lib/contentful";
import Button from "./Button";
import { SkeletonPostsCard } from "./Skeleton";

export default function FeatSection() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchLatestPosts = async () => {
    try {
      const data = await client.getEntries({
        content_type: "blogspot",
        order: ["-fields.publishDate"] as ["-fields.publishDate"],
        limit: 2,
      });

      if (data.items.length > 0) {
        setPosts(data.items.map((item: any) => item.fields));
      } else {
        console.log("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <section className="flex flex-row bg-gray-100 p-6 gap-5">
        <SkeletonPostsCard />
        <SkeletonPostsCard />
        <SkeletonPostsCard />
      </section>
    );
  }

  return (
    <section className=" p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {posts.map((post, index) => {
          const { title, excerpt, image, category, publishDate, slug } = post;
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
            <div
              key={index}
              className="post-card bg-black rounded-xl shadow-lg p-6 lg:w-96 w-72 flex flex-col items-center justify-evenly text-center"
            >
              {image && image[0]?.fields?.file?.url && (
                <div className="mt-4 ">
                  <Image
                    src={`https:${image[0].fields.file.url}`}
                    alt={title}
                    width={300}
                    height={300}
                    style={{
                      objectFit: "cover",
                      width: "500px",
                      height: "200px",
                    }}
                    className="rounded-lg object-fit"
                  />
                </div>
              )}
              <p className="text-sm font-semibold text-white mt-5">
                {categoryName}
              </p>
              <h2 className="text-xl font-bold text-white mt-2 max-h-18">
                {title}
              </h2>
              <p className="text-sm text-white mt-2 font-InterRegular">
                {publishDateFormatted}
              </p>
              <p className="mt-4 text-white font-InterRegular text-sm leading-snug">
                {excerpt}
              </p>

              <Button
                href={`/post/${slug}`}
                type="submit"
                className="mt-6 text-black bg-white"
                title="Read More"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
