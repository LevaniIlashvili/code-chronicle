import React from "react";
import Image from "next/image";
import { Blog } from "@/types/index";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const desc = blog.content.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ");

  return (
    <article className="w-full max-w-[680px] h-[145px] overflow-hidden flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Image
          src={blog.creator.image}
          alt="creator_image"
          width={24}
          height={24}
          className="rounded-full"
        />
        <p className="text-sm">{blog.creator.username}</p>
      </div>
      <div className="flex justify-between">
        <div className="max-w-[500px]">
          <h1 className="font-bold leading-6 text-base md:text-xl mb-2 line-clamp-2 overflow-hidden text-ellipsis">
            {blog.title}
          </h1>
          <div className="hidden md:block overflow-hidden text-ellipsis">
            {desc}
          </div>
        </div>
        {blog.image && (
          <Image
            src={blog.image}
            alt=""
            width={200}
            height={200}
            className="w-20  md:w-28 md:h-28 object-cover ml-6 md:ml-14"
          />
        )}
      </div>
    </article>
  );
};

export default BlogCard;
