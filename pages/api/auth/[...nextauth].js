import { compare } from "bcryptjs";
import bcryptjs from "bcryptjs"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/User";

export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({token, user}){
      if (user?._id) token._id = user._id;
      if(user?._isAdmin) token.isAdmin = user.isAdmin;
      return token;
    }, 
    async session({session, token}){
      if(token?._id) session.user._id = token._id;
      if(token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed..!";
        });

        //check user existance
        const user = await Users.findOne({ username: credentials.username });
        if (!user) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }
        if(user) {
          return {
            _id: user._id,
            username: user.username,
            isAdmin: user?.isAdmin
          }
        }

        //compare
        //   const checkPassword = await compare(credentials.password, result.password);

        // incorrect password
        //   if(!checkPassword || result.email !== credentials.email){
        //     throw new Error("Usename or Password does'nt match");
        //   }

        return result;
      },
    }),
  ],
});
