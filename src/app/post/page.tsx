"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/lib/contentful";
import Link from "next/link";
import Image from "next/image";

import {
  TypeBlogPost,
  TypeBlogPostSkeleton,
  ListCategory,
  CategoryFields,
} from "../../types/contentful.types";
import { SkeletonAllPost } from "@/components/Skeleton";

const AllPostPage = () => {
  const { page = "1" } = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        setLoading(true);

        const postsData = await client.getEntries<TypeBlogPostSkeleton>({
          content_type: "blogspot",
          select: [
            "fields.title",
            "fields.slug",
            "fields.image",
            "fields.category",
          ],
          limit: 10,
          skip: (parseInt(page as string) - 1) * 10,
        });

        const categoriesData = await client.getEntries<CategoryFields>({
          content_type: "category",
          select: ["fields.name", "fields.slug"],
        });

        const totalPosts = postsData.total;
        const pages = Math.ceil(totalPosts / 10);
        setTotalPages(pages);

        setPosts(postsData.items as TypeBlogPost<undefined>[]);
        setCategories(categoriesData.items as ListCategory[]);
      } catch (err) {
        console.error("Error fetching posts:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Error fetching posts: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndCategories();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    window.location.href = `/posts/${newPage}`;
  };

  if (loading) {
    return (
      <div className="px-12 pt-48 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 border-2 border-black rounded-full py-1 px-4 w-fit ">
          All Posts
        </h1>
        <div className="mt-6">
          <SkeletonAllPost />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto px-4 lg:px-12 lg:py-48 pt-32 flex flex-col lg:flex-row items-center lg:items-start justify-between relative">
      <div className="lg:w-2/3 px-4 lg:pr-2 flex-1 flex flex-col lg:items-start items-center">
        <h1 className="text-3xl font-bold text-gray-800 border-2 border-black rounded-full py-1 px-4 w-fit ">
          All Posts
        </h1>
        <ul className="mt-6 w-full">
          {posts.map((post) => (
            <li
              key={post.sys.id}
              className="text-xl text-gray-700 mb-4 flex flex-row justify-between"
            >
              <div className="flex items-center">
                {post.fields.image &&
                  post.fields.image[0] &&
                  "fields" in post.fields.image[0] &&
                  post.fields.image[0].fields.file?.url && (
                    <Image
                      src={`https:${post.fields.image[0].fields.file.url}`}
                      alt={post.fields.title || "No Title"}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover lg:h-36 lg:w-36 h-24 w-24"
                      loading="lazy"
                    />
                  )}
                <div className="ml-5 ">
                  <a
                    href={`/post/${post.fields.slug}`}
                    className="lg:text-xl text-base leading-tight font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {post.fields.title}
                  </a>
                  <p className="text-base text-gray-500 mt-1">
                    {post.fields.category &&
                      "fields" in post.fields.category &&
                      post.fields.category?.fields?.slug &&
                      post.fields.category?.fields?.name && (
                        <Link
                          href={`/category/${post.fields.category.fields.slug}`}
                          className="hover:text-blue-600"
                        >
                          {post.fields.category.fields.name}
                        </Link>
                      )}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 my-10 flex w-full justify-between">
          <button
            disabled={parseInt(page as string) <= 1}
            onClick={() => handlePageChange(parseInt(page as string) - 1)}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center lg:text-xl text-base">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={parseInt(page as string) >= totalPages}
            onClick={() => handlePageChange(parseInt(page as string) + 1)}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="lg:w-1  bg-gray-100 mx-4 lg:h-screen w-full h-1" />
      <div className="lg:w-1/4 w-full lg:items-start items-center justify-center lg:justify-start flex flex-col py-8 lg:py-0">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 lg:text-left text-center">
          Categories
        </h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category.sys.id}
              className="mb-4  text-center lg:text-left"
            >
              {category.fields?.slug && category.fields?.name ? (
                <Link
                  href={`/category/${category.fields.slug}`}
                  className="text-lg text-gray-700 hover:text-blue-600"
                >
                  {category.fields.name}
                </Link>
              ) : (
                <span className="text-lg text-gray-700">Invalid Category</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllPostPage;
