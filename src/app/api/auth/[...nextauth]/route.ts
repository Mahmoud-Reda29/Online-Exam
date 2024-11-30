import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Configure NextAuth options
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        try {
          const response = await axios.post("https://exam.elevateegy.com/api/v1/auth/signin", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data;

          if (!user) {
            throw new Error("User not found");
          }

          // Return the user object, which will be available in the session
          return user;
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Invalid credentials";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
    error: "/signin",  // Redirect to sign-in page on errors
  },
};

const handler = NextAuth(authOptions);

// Route handlers for Next.js API
export { handler as GET, handler as POST };
