"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/lib/contentful";
import Link from "next/link";
import { SkeletonAllPost } from "@/components/Skeleton";
import Image from "next/image";

const CategoryPostsPage = () => {
  const { category } = useParams();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) {
      setError("Category is undefined or empty");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await client.getEntries({
          content_type: "blogspot",
          "fields.category.sys.contentType.sys.id": "category",
          "fields.category.fields.name[match]": category,
        });

        //console.log(data);
        if (data.items.length === 0) {
          setError("No posts found for this category.");
        }

        const formattedPosts: any[] = data.items.map((entry) => ({
          sys: { id: entry.sys.id },
          fields: {
            title: entry.fields.title || "Untitled",
            slug: entry.fields.slug || "no-slug",
            category: entry.fields.category || null,
            image: entry.fields.image || "Post Image",
            publishDate: entry.fields.publishDate || null,
          },
        }));

        //console.log(formattedPosts);

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("An error occurred while fetching the posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading)
    return (
      <div className="px-12 pt-48  min-h-screen">
        <h1 className="lg:text-3xl text-xl font-bold text-gray-800 border-2 border-black rounded-full py-1 px-4 w-fit ">
          Posts in {category}
        </h1>
        <div className="mt-6">
          <SkeletonAllPost />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="px-12 pt-48  min-h-screen items-center justify-center flex">
        <h1 className="text-2xl"> Sorry No Post In {category}</h1>
      </div>
    );

  return (
    <div className="mx-auto lg:pt-48 pt-32 px-12 flex flex-col items-center min-h-screen relative">
      <h1 className="lg:text-3xl text-xl  font-bold text-gray-800 border-2 border-black rounded-full py-1 px-4 w-fit ">
        Posts in {category}
      </h1>
      <ul className="mt-6 flex flex-col items-center justify-center">
        {posts.map((post) => (
          <li
            key={post.sys.id}
            className="mb-4 p-4 bg-white shadow-sm rounded-lg flex items-start"
          >
            {post.fields.image?.[0]?.fields?.file?.url && (
              <Image
                src={`https:${post.fields.image[0].fields.file.url}`}
                alt={post.fields.title || "No Title"}
                width={200}
                height={200}
                className="rounded-lg object-cover lg:h-36 lg:w-36 h-24 w-24"
                loading="lazy"
              />
            )}
            <div className="ml-5">
              <Link
                href={`/post/${post.fields.slug}`}
                className="lg:text-xl text-lg text-blue-600 hover:underline"
              >
                {post.fields.title}
              </Link>
              <p className="text-gray-500 text-sm">
                {post.fields.publishDate
                  ? new Date(post.fields.publishDate).toLocaleDateString()
                  : "Unknown date"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPostsPage;
