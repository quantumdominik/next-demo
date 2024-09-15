import type { NextAuthConfig } from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import Credentials from 'next-auth/providers/credentials';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [
        Twitter({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                // Here you should lookup the user in your db and compare the password:
                // if (user && comparePasswords(user.password, credentials.password)) {
                //   return user
                // }
                // For this example, we'll just simulate a successful login
                if (credentials.email === "user@example.com" && credentials.password === "password") {
                    return { id: 1, name: "J Smith", email: "user@example.com" }
                }
                return null
            }
        })
    ],
};