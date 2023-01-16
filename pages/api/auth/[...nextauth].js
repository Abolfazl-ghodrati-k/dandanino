import { compare } from "bcryptjs";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../../model/User";
import db from "../../../database/db";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?._isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        await db.connect();
        const user = await Users.findOne({
          username: credentials.username,
        });
        await db.disconnect();
        if (user) {
          if (user?.isAdmin) {
            const checkPassword = bcryptjs.compareSync(
              credentials.password,
              user.password
            );
            if (!checkPassword || user.username !== credentials.username) {
              throw new Error("invalid pass");
            } else {
              return {
                // _id: user._id,
                _id: user._id,
                name: user.name,
                email: user.isAdmin,
                image: user.image,
                username: user.username,
                password: user.password,
                isAdmin: user.isAdmin,
              };
            }
          } else {
            return {
              _id: user._id,
              username: user.username,
              isAdmin: user?.isAdmin,
            };
          }
        } else {
          throw new Error("no user found sign up");
        }
      },
    }),
  ],
});
