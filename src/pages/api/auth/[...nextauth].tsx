import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        if (username === "johndoe" && password === "jd123")
        {
            return {
                id: 'jd001',
                name: 'John Doe',
                username: 'johndoe',
                password: 'jd123'
            }
        }

        if (username === "jojoli" && password === "jl123")
        {
            return {
                id: 'jl001',
                name: 'Jojo Lili',
                username: 'jojoli',
                password: 'jl123'
            }
        }

        throw new Error("invalid credentials");
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