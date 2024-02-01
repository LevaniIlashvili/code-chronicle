import { Blog } from "@/models/blog";
import { connectToDb } from "@/utils/database";

export const GET = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();
    const blogs = await Blog.find({ creator: params.id }).populate("creator");
    const headers = {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json",
    };
    return new Response(JSON.stringify(blogs), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
