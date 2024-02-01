import { connectToDb } from "@/utils/database";
import { Blog } from "@/models/blog";

export const GET = async () => {
  try {
    await connectToDb();
    const blogs = await Blog.find({}).populate("creator");
    const headers = {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json",
    };
    return new Response(JSON.stringify(blogs), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
