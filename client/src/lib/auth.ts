import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt'
    },
    pages: {
      signIn: '/signin'
    },

    providers: [
        CredentialsProvider({

          name: "Credentials",

          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              return null;
            }
          
            // Find user by email (case-insensitive)
            const existingUser = await db.user.findFirst({
              where: {
                email: {
                  equals: credentials.email, // Compare with input email
                  mode: "insensitive", // Make it case-insensitive
                },
              },
            });
          
            if (!existingUser) {
              return null;
            }
          
            // Compare hashed passwords
            const passwordMatch = await compare(credentials.password, existingUser.password);
          
            if (!passwordMatch) {
              return null;
            }
          
            return {
              id: `${existingUser.id}`,
              firstName: existingUser.firstName,
              lastName: existingUser.lastName,
              email: existingUser.email,
            };
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          if(user){
            return {
              ...token,
              firstName: user.firstName,
              lastName: user.lastName
            }
          }
          return token
        },
        async session({ session, token }) {
          return{
            ...session,
            user: {
              ...session.user,
              firstName: token.firstName,
              lastName: token.lastName
            }
          }
        },
      }
}

