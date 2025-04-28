import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user?: {
            role?: string;
        } & DefaultSession["user"];
    }
}
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                // Dummy check (replace with real DB call)
                if (
                    credentials.username === "admin" &&
                    credentials.password === "1234"
                ) {
                    return { id: "1", name: "Admin User", role: "admin" };
                }

                return null; // Unauthorized
            }
            // Removed misplaced line
        }),
    ],
    pages: {
        signIn: "/login", // custom login page
    },
    session: {
        strategy: "jwt", // optional: "jwt" or "database" session
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // attach role to token
                token.role = user.role; // attach role to token
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as string | undefined; // pass role to session
            }
            return session;
        },
    }
});

export { handler as GET, handler as POST };
