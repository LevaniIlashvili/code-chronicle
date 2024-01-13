import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Blog } from "@/types/index";
import { formatDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const BlogCard = ({
  blog,
  triggerRefresh,
}: {
  blog: Blog;
  triggerRefresh?: () => void;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const desc = blog.content.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ");
  const [isBlogSaved, setIsBlogSaved] = useState(false);

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/saved`);
        const data = await res.json();
        if (data.map((blog: Blog) => blog._id).includes(blog._id)) {
          setIsBlogSaved(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (session?.user.id) fetchSavedBlogs();
  }, []);

  const saveBlog = async () => {
    setIsBlogSaved(true);
    try {
      const res = await fetch(`/api/users/${session?.user.id}/saved`, {
        method: "PUT",
        body: JSON.stringify({ blogId: blog._id }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const unsaveBlog = async () => {
    setIsBlogSaved(false);
    // trigger refresh of library page
    if (triggerRefresh) triggerRefresh();
    try {
      const res = await fetch(`/api/users/${session?.user.id}/saved`, {
        method: "DELETE",
        body: JSON.stringify({ blogId: blog._id }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="w-full max-w-[680px] h-full md:h-[145px] overflow-hidden flex flex-col gap-2">
      <div className="flex justify-between max-w-[512px]">
        <div className="flex items-center gap-4">
          <Image
            src={blog.creator.image}
            alt="creator_image"
            width={24}
            height={24}
            className="rounded-full cursor-pointer"
            onClick={() =>
              router.push(
                `/profile/${blog.creator._id}?name=${blog.creator.username}`
              )
            }
          />
          <span
            className="text-sm cursor-pointer"
            onClick={() =>
              router.push(
                `/profile/${blog.creator._id}?name=${blog.creator.username}`
              )
            }
          >
            {blog.creator.username}
          </span>
          <span>·</span>
          <span className="text-sm">{formatDate(blog.dateCreated)}</span>
        </div>
        {session && session.user.id && isBlogSaved ? (
          <Image
            src="/assets/icons/bookmark-filled.svg"
            alt="save icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={unsaveBlog}
          />
        ) : (
          <Image
            src="/assets/icons/bookmark.svg"
            alt="save icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={saveBlog}
          />
        )}
      </div>
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => router.push(`/blog/${blog._id}`)}
      >
        <div>
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
