"use client";

import { client } from "@/lib/contentful";
import { TypeBlogPostSkeleton } from "@/types/contentful.types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const PostDetailPage = () => {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params) return;
      try {
        const data = await client.getEntries<TypeBlogPostSkeleton>({
          content_type: "blogspot",
          "fields.slug": params.slug,
        });
        console.log(data.items);
        if (data.items.length > 0) {
          setPost(data.items[0].fields);
        } else {
          console.log("Post not found.");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [params]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const { title, content, image, publishDate } = post;
  const publishDateFormatted = new Date(publishDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-sm text-gray-500 mt-2">{publishDateFormatted}</p>
      {image && image[0]?.fields?.file?.url && (
        <div className="mt-6">
          <img
            src={`https:${image[0].fields.file.url}`}
            alt={title}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
      <div className="mt-6">
        {content && documentToReactComponents(content)}
      </div>
    </div>
  );
};

export default PostDetailPage;
