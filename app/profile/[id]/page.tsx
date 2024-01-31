"use client";
import BlogCard from "@/components/BlogCard";
import { Blog } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`/api/users/${params.id}/blogs`, {
        cache: "no-store",
      });
      const blogs = await res.json();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, [params.id]);

  return (
    <section className="flex flex-col items-center gap-10 p-8">
      <h1 className="md:text-5xl text-3xl">{name}'s blogs</h1>
      <div className="flex flex-col items-center gap-8">
        {blogs.length > 0 ? (
          <>
            {blogs
              .sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1))
              .map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
              ))}
          </>
        ) : (
          <p className="text-xl">No blogs yet</p>
        )}
      </div>
    </section>
  );
};

export default page;
