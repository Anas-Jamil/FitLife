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
          
            
            const existingUser = await db.user.findFirst({
              where: {
                email: {
                  equals: credentials.email, 
                  mode: "insensitive", 
                },
              },
            });
          
            if (!existingUser) {
              return null;
            }
          
            
            const passwordMatch = await compare(credentials.password, existingUser.password);
          
            if (!passwordMatch) {
              return null;
            }
          
            return {
              id: `${existingUser.id}`,
              firstName: existingUser.firstName,
              lastName: existingUser.lastName,
              email: existingUser.email,
              isAdmin: existingUser.isAdmin,
            };
          }
        })                                                                                  
      ],
      callbacks: {
        async jwt({ token, user }) {
          if(user){
            return {
              ...token,
              isAdmin: user.isAdmin,
              id: user.id,
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
              isAdmin: token.isAdmin,
              id: token.id,
              firstName: token.firstName,
              lastName: token.lastName
            }
          }
        },
      }
}

