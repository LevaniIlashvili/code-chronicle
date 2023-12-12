import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/user";
import { connectToDb } from "@/utils/database";

interface CustomSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    id?: string;
  } & Session["user"];
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google Client ID or Secret");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: { session: CustomSession }) {
      if (!session || !session.user) return session;

      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDb();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
          return true;
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
