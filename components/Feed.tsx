"use client";
import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/index";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setBlogs } from "@/lib/features/blogs/blogsSlice";

const Feed = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        dispatch(setBlogs(data));
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs);

  if (!blogs) return <p>Loading...</p>;

  return (
    <section className="flex flex-col items-center gap-8 p-8">
      {[...blogs]
        .sort((prev, next) => (prev.dateCreated > next.dateCreated ? -1 : 1))
        .map((blog: Blog) => {
          return <BlogCard key={blog._id} blog={blog} />;
        })}
    </section>
  );
};

export default Feed;
