import { connectToDb } from "@/utils/database";
import { Blog } from "@/models/blog";

export const POST = async (req: {
  json: () => PromiseLike<{
    title: string;
    content: string;
    image: string | null;
  }>;
}) => {
  const { title, content, image } = await req.json();
  try {
    await connectToDb();

    const blog = new Blog({ title, content, image });

    await blog.save();

    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
