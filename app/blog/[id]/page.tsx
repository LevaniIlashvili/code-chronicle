"use client";
import { Blog } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "highlight.js/styles/default.css";
import { formatDate } from "@/utils/helpers";
import { unstable_noStore as no_store } from "next/cache";

const page = ({ params }: { params: { id: string } }) => {
  no_store();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("/api/blog/" + params.id);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };

    console.log(params);
    if (params.id) fetchBlog();
  }, [params.id]);

  if (!blog) return;

  return (
    <section className="flex justify-center mb-20">
      <article className="max-w-[680px] w-full">
        <h1 className="text-[#242424] text-4xl font-bold mb-10 mt-12">
          {blog?.title}
        </h1>
        <div className="flex items-center gap-4 mb-10">
          <Image
            src={blog.creator.image}
            alt="authors profile"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span>{blog.creator.username}</span>
            <span className="text-sm text-gray-500">
              {formatDate(blog.dateCreated)}
            </span>
          </div>
        </div>
        {blog.image && (
          <Image
            width={680}
            height={450}
            src={blog.image}
            alt="blog_image"
            className="mb-10"
          />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="blog_post"
        ></div>
      </article>
    </section>
  );
};

export default page;
