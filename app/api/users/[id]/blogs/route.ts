import { Blog } from "@/models/blog";
import { connectToDb } from "@/utils/database";

export const dynamic = "force-dynamic";

export const GET = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();
    const blogs = await Blog.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
