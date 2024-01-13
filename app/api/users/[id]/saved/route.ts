import { User } from "@/models/user";
import { connectToDb } from "@/utils/database";

export const GET = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();
    const user = await User.findById(params.id).populate({
      path: "savedBlogs",
      populate: { path: "creator", model: "User" },
    });
    return new Response(JSON.stringify(user.savedBlogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PUT = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDb();
    const { blogId } = await req.json();
    const user = await User.findById(params.id).exec();
    if (user.savedBlogs.includes(blogId)) {
      return new Response(JSON.stringify({ message: "Blog already saved" }), {
        status: 400,
      });
    }
    await User.findByIdAndUpdate(params.id, { $push: { savedBlogs: blogId } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (
  req: { json: () => Promise<{ blogId: string }> },
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const { blogId } = await req.json();
    await User.findByIdAndUpdate(params.id, {
      $pull: { savedBlogs: blogId },
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
