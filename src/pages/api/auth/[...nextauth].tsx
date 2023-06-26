import { PrismaClient } from '@prisma/client'
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  session:
  {
    strategy: "jwt",
  },
  providers:
  [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        
        const user = await prisma.user.findFirst({
          where: {
            username: username,
            password: password
          }
        })
        if(user === null)
        {
          throw new Error("invalid credentials");
        }
        else
        {
          return user;
        }
    },
    }),
  ],
  pages: {
    signIn: "/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};

export default NextAuth(authOptions);