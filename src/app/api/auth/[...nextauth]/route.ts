import NextAuth from "next-auth";
import { authOptions } from "./authOptions"; // Adjust the path as necessary

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
