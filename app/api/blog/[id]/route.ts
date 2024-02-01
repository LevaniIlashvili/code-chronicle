import { Blog } from "@/models/blog";
import { connectToDb } from "@/utils/database";

export const GET = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();

    const blog = await Blog.findById(params.id).populate("creator");

    const headers = {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json",
    };

    return new Response(JSON.stringify(blog), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const blog = await req.json();

    const newBlog = await Blog.findByIdAndUpdate(params.id, blog).populate(
      "creator"
    );

    return new Response(JSON.stringify(newBlog), { status: 200 });
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
