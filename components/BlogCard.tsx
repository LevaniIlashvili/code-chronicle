import React from "react";
import Image from "next/image";

const BlogCard = ({
  image,
  title,
  content,
}: {
  image: string;
  title: string;
  content: string;
}) => {
  console.log(content);

  return (
    <article className="flex max-h-28 overflow-hidden">
      <div className="max-w-[500px]">
        <h1 className="font-bold leading-6 text-base md:text-xl mb-2 line-clamp-2 overflow-hidden text-ellipsis">
          {title}
        </h1>
        <div
          className="hidden md:block overflow-hidden text-ellipsis"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
      <Image
        src={image}
        alt=""
        width={200}
        height={200}
        className="w-20  md:w-28 md:h-28 object-cover ml-6 md:ml-14"
      />
    </article>
  );
};

export default BlogCard;
