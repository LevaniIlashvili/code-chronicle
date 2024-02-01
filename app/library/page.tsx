"use client";
import BlogCard from "@/components/BlogCard";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLibrary } from "@/lib/features/library/librarySlice";

const page = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const blogs = useAppSelector((state) => state.library);

  useEffect(() => {
    if (!session?.user.id) return;
    const fetchBlogs = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/saved`);
      const data = await res.json();
      dispatch(setLibrary(data));
    };
    fetchBlogs();
  }, [session]);

  return (
    <section className="flex flex-col items-center gap-10 p-8">
      <h1 className="text-5xl">Library</h1>
      <div className="flex flex-col items-center gap-8">
        {blogs.length > 0 ? (
          <>
            {blogs.map((blog) => (
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
