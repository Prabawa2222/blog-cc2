"use client";

import { client } from "@/lib/contentful";
import { TypeBlogPostSkeleton } from "@/types/contentful.types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import Image from "next/image";

const PostDetailPage = () => {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params) return;
      try {
        const data = await client.getEntries<TypeBlogPostSkeleton>({
          content_type: "blogspot",
          "fields.slug": params.slug,
        });
        if (data.items.length > 0) {
          setPost(data.items[0].fields);
        } else {
          //console.log("Post not found.");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [params]);

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
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

  const shareUrl = typeof window !== "undefined" && window.location.href;
  const renderOptions = {
    renderNode: {
      "embedded-asset-block": (node: any) => {
        const { file, title } = node.data.target.fields.file;
        const imageUrl = `https:${file.url}`;
        return (
          <div className="my-6">
            <Image
              src={imageUrl}
              alt={title}
              width={100}
              height={100}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        );
      },
      "embedded-entry-block": (node: any) => {
        const { title, content } = node.data.target.fields;
        return (
          <div className="my-6">
            <h3 className="text-base font-bold">{title}</h3>
            <div>{documentToReactComponents(content)}</div>
          </div>
        );
      },
      "heading-2": (node: any) => {
        return (
          <h2 className="text-lg font-bold text-gray-800 mt-6 mb-4">
            {node.content[0].value}
          </h2>
        );
      },
      paragraph: (node: any) => {
        return (
          <p className="lg:text-lg text-sm text-gray-700 mb-4">
            {documentToReactComponents(node)}
          </p>
        );
      },
      text: (node: any) => {
        return <span>{node.value}</span>;
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="lg:mt-32 mt-24">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 mt-2">{publishDateFormatted}</p>
        {image && image[0]?.fields?.file?.url && (
          <div className="mt-6">
            <Image
              src={`https:${image[0].fields.file.url}`}
              width={100}
              height={100}
              alt={title}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        )}
        <div className="mt-6 font-InterRegular">
          {content && documentToReactComponents(content, renderOptions)}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <span className="text-lg text-gray-600">Share this post:</span>
          <div className="flex gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${shareUrl}&media=https:${image[0].fields.file.url}&description=${title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800"
            >
              <FaPinterestP size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
