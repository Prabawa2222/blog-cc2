"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/contentful";
import Loading from "@/components/Loading";

interface Post {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    image: { fields: { file: { url: string } } };
  };
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            // Transform data.items to match the Post type
            const transformedPosts: Post[] = data.items.map((item: any) => ({
              sys: item.sys,
              fields: {
                title: item.fields.title,
                slug: item.fields.slug,
                image: {
                  fields: {
                    file: {
                      url: item.fields.image.fields.file.url,
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

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
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
  );
};

export default SearchPage;
