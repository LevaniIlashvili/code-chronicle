import { Blog } from "@/models/blog";
import { connectToDb } from "@/utils/database";

export const GET = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();

    const blog = await Blog.findById(params.id).populate("creator");

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (
  req: any,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();

    const blog = await Blog.findByIdAndDelete(params.id);

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
