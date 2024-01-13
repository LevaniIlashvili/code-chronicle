"use client";
import BlogCard from "@/components/BlogCard";
import { Blog } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => {
    setRefresh(!refresh);
    console.log("triggered");
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      console.log("fetched blogs");
      const res = await fetch(`/api/users/${session?.user.id}/saved`);
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, [refresh, session]);

  return (
    <section className="flex flex-col items-center gap-10 py-8">
      <h1 className="text-5xl">Library</h1>
      <div className="flex flex-col items-center gap-8">
        {blogs.length > 0 ? (
          <>
            {blogs.map((blog) => (
              <BlogCard
                blog={blog}
                key={blog._id}
                triggerRefresh={triggerRefresh}
              />
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
