"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/contentful";
import { SkeletonAllPost } from "@/components/Skeleton";
import { Post } from "@/types/contentful.types";

const SearchPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  // This will make sure useSearchParams is only called on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get("q") || "";
      setQuery(queryParam);
    }
  }, []);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          const data = await client.getEntries({
            content_type: "blogspot",
            query: query,
            limit: 10,
          });

          if (data.items.length > 0) {
            const transformedPosts: Post[] = data.items.map((item: any) => ({
              sys: item.sys,
              fields: {
                title: item.fields.title,
                slug: item.fields.slug,
                image: {
                  fields: {
                    file: {
                      url: item.fields.image?.[0]?.fields.file.url,
                    },
                  },
                },
              },
            }));
            setPosts(transformedPosts);
          } else {
            setError(`No results found for "${query}"`);
          }
        } catch (err) {
          setError("Error fetching posts.");
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) return <SkeletonAllPost />;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-6xl bg-white mx-auto p-6 min-h-screen ">
      <div className="lg:mt-48 mt-24">
        <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
        {posts.length === 0 ? (
          <p>No results found for "{query}"</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.sys.id}>
                <a
                  href={`/post/${post.fields.slug}`}
                  className="text-lg text-blue-600"
                >
                  {post.fields.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
