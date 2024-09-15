import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Twitter from 'next-auth/providers/twitter';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function getUser(email: string) {
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const authOptions = {
    ...authConfig,
    providers: [
        Twitter({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await getUser(credentials.email as string);
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password as string);

                if (passwordsMatch) return user;

                return null;
            }
        })
    ],
};

export const { auth, signIn, signOut } = NextAuth(authOptions);