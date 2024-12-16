"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/lib/contentful";
import Link from "next/link";
import Loading from "@/components/Loading";

interface CategoryPost {
  sys: {
    id: string;
  };
  fields: {
    title: string | null;
    slug: string | null;
    category: {
      fields: {
        name: string | null;
      };
    } | null;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    } | null;
    publishDate: string | null;
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
          content_type: "blogspot", // The content type for the blog posts
          "fields.category.sys.contentType.sys.id": "category", // Specify the referenced content type
          "fields.category.fields.name[match]": category, // Match the category name
        });

        console.log(data);
        if (data.items.length === 0) {
          setError("No posts found for this category.");
        }

        const formattedPosts: CategoryPost[] = data.items.map((entry) => ({
          sys: { id: entry.sys.id },
          fields: {
            title: entry.fields.title || "Untitled",
            slug: entry.fields.slug || "no-slug",
            category: entry.fields.category || null,
            image: entry.fields.image || "Post Image",
            publishDate: entry.fields.publishDat || null,
          },
        }));

        console.log(formattedPosts);

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

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Posts in {category}</h1>
      <ul className="mt-6">
        {posts.map((post) => (
          <li
            key={post.sys.id}
            className="mb-4 p-4 bg-white shadow-sm rounded-lg flex items-start"
          >
            {post.fields.image?.fields?.file?.url && (
              <img
                src={`https:${post.fields.image.fields.file.url}`}
                alt={post.fields.title || "Post image"}
                className="w-20 h-20 object-cover rounded mr-4"
              />
            )}
            <div>
              <Link
                href={`/post/${post.fields.slug}`}
                className="text-xl text-blue-600 hover:underline"
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
