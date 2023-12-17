"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/index";

const Feed = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogs(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="flex flex-col items-center gap-8 p-10">
      {blogs.map((blog: Blog) => {
        return <BlogCard key={blog._id} blog={blog} />;
      })}
    </section>
  );
};

export default Feed;
