import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import axios from "axios";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        userName: { label: "Username", type: "text" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rePassword: { label: "Confirm Password", type: "password" },
        phone: { label: "Phone", type: "tel" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials.");
        }

        const isSignup = credentials.rePassword !== undefined;
        const endpoint = isSignup
          ? "https://exam.elevateegy.com/api/v1/auth/signup"
          : "https://exam.elevateegy.com/api/v1/auth/signin";

        try {
          const data = isSignup
            ? {
                username: credentials.userName,
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                password: credentials.password,
                rePassword: credentials.rePassword,
                phone: credentials.phone,
              }
            : {
                email: credentials.email,
                password: credentials.password,
              };

          const response = await axios.post(endpoint, data);
          const user = response.data;

          if (!user) {
            throw new Error("Authentication failed. No user data returned.");
          }

          return {
            id: user.id,
            name: user.name || credentials.userName,
            email: user.email,
          };
        } catch (error) {
          if (error instanceof axios.AxiosError) {
            console.error(
              "Error during authentication:",
              error.response?.data || error.message
            );
            throw new Error(
              error.response?.data?.message || "Authentication failed."
            );
          } else {
            throw error;
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        } as User;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/home`;
    },

    async signIn({ user, account }) {
      if (account?.provider !== "credentials" && user) {
        const isSignup = account?.state === "signup"; // Adjust this based on your OAuth provider's response

        if (isSignup) {
          try {
            await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", {
              name: user.name,
              email: user.email,
              provider: account?.provider,
              providerId: account?.providerAccountId,
            });
          } catch (error) {
            if (error instanceof axios.AxiosError) {
              console.error(
                "OAuth registration error:",
                error.response?.data || error.message
              );
              throw new Error(
                error.response?.data?.message || "Authentication failed."
              );
            } else {
              throw new Error("Registration failed.");
            }
          }
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/signin", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
