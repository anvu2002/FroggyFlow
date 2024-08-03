import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { generateToken } from '@/utils/tokenUtils';


const bcrypt = require('bcrypt');

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login/page"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "anvu@test.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await connectToDB();
                if (!credentials.email || !credentials.password) {
                    throw new Error('Missing email or password');
                }

                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('No user found with this email');
                }

                if (!user.isVerified) {
                    throw new Error('Please verify your email first');
                }

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                if (!passwordsMatch) {
                    throw new Error('Incorrect password');
                }

                console.log("Login success in auth route!");

                // set LocalStorage of Session Data

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }; // Return necessary user details
            }
        })
    ],
    callbacks: {
        // Invoke once user logged in successfully
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = generateToken(user, '50m'); // Ensure token is generated here
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            // localStorage.setItem('token', token.accessToken);

            return token;
        },
        // NestJS session for line const { data: session } = useSession();
        async session({ session, token }) {
            // Add the token to the authenticated session
            if (token) {
                const sessionUser = await User.findOne({
                    email: session.user.email
                });
    
                session.user.id = sessionUser._id.toString();
                session.user.email = token.email;
                session.user.name = token.name;

                session.accessToken = token.accessToken;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                try {
                    await connectToDB();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        const newUser = await User.create({
                            name: user.name,
                            email: user.email,
                            username: user.name.replace(" ", "").toLowerCase(),
                            profilePicture: user.picture,
                            createdAt: Date.now(),
                            isVerified: true,
                        })
                        return newUser;
                    }
                    user.id = existingUser._id.toString();

                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
            return true;
        },
    }
})

export { handler as GET, handler as POST };
