"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/lib/contentful";
import Link from "next/link";

interface CategoryPost {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    category: {
      fields: {
        name: string;
      };
    };
  };
}

const CategoryPostsPage = () => {
  const { category } = useParams(); // Fetch category from the URL params

  const [posts, setPosts] = useState<CategoryPost[]>([]);
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
          content_type: "blogspot", // Fetch blog posts
        });

        if (data.items.length === 0) {
          setError("No posts found for this category.");
        }

        const formattedPosts: CategoryPost[] = data.items.map((entry) => ({
          sys: { id: entry.sys.id },
          fields: {
            title: entry.fields.title,
            slug: entry.fields.slug,
            category: entry.fields.category,
          },
        }));

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Posts in {category}</h1>
      <ul className="mt-6">
        {posts.map((post) => (
          <Link
            href={`/post/${post.fields.slug}`}
            key={post.sys.id}
            className="text-xl text-gray-700 mb-4"
          >
            {post.fields.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPostsPage;
