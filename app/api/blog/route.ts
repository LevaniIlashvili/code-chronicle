import { connectToDb } from "@/utils/database";
import { Blog } from "@/models/blog";

export const GET = async () => {
  try {
    await connectToDb();
    const blogs = await Blog.find({}).populate("creator");
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
