"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Using useParams for Next.js app directory
import { client } from "@/lib/contentful"; // Your Contentful client
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import { SkeletonAllPost } from "@/components/Skeleton";

interface Post {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    image?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    category: {
      fields: {
        name: string;
        slug: string;
      };
    };
  };
}

interface Category {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
  };
}

const AllPostPage = () => {
  const { page = "1" } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPostsAndCategories = async () => {
      try {
        setLoading(true);
        const postsData = await client.getEntries({
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

        const categoriesData = await client.getEntries({
          content_type: "category",
          select: ["fields.name", "fields.slug"],
        });

        const totalPosts = postsData.total;
        const pages = Math.ceil(totalPosts / 10);
        setTotalPages(pages);

        setPosts(postsData.items);
        setCategories(categoriesData.items);
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
    window.location.href = `/posts/${newPage}`; // Redirecting to the new page
  };

  if (loading) {
    return (
      <div className="mx-auto pt-48 px-12 flex justify-between relative">
        <SkeletonAllPost />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-auto pt-48 px-12 flex justify-between relative">
      <div className="w-2/3 pr-2 flex-1">
        <h1 className="text-3xl font-bold text-gray-800 border-2 border-black rounded-full py-1 px-4 w-fit ">
          All Posts
        </h1>
        <ul className="mt-6">
          {posts.map((post) => (
            <li key={post.sys.id} className="text-xl text-gray-700 mb-4">
              <div className="flex items-center">
                {post.fields.image?.fields?.file?.url && (
                  <div className="w-32 h-32 mr-6">
                    <Image
                      src={`https:${post.fields.image.fields.file.url}`}
                      alt={post.fields.title}
                      width={128}
                      height={128}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div>
                  <a
                    href={`/post/${post.fields.slug}`}
                    className="text-xl font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {post.fields.title}
                  </a>
                  <p className="text-base text-gray-500 mt-1">
                    <Link
                      href={`/category/${post.fields.category.fields.slug}`}
                      className="hover:text-blue-600"
                    >
                      {post.fields.category.fields.name}
                    </Link>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between">
          <button
            disabled={parseInt(page as string) <= 1}
            onClick={() => handlePageChange(parseInt(page as string) - 1)}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center text-xl">
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

      <div className="w-1 bg-gray-100 mx-4 h-screen" />
      <div className="w-1/4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Categories
        </h2>
        <ul>
          {categories.map((category) => (
            <li key={category.sys.id} className="mb-4">
              <Link
                href={`/category/${category.fields.slug}`}
                className="text-lg text-gray-700 hover:text-blue-600"
              >
                {category.fields.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllPostPage;
