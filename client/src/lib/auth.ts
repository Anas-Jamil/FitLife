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
            if(!credentials?.email || !credentials?.password) {
              return null;
            }
              const existingUser = await db.user.findUnique({
                where: { email: credentials?.email}
              });
              if(!existingUser) {
                return null;
              }

              const passwordMatch = await compare(credentials.password, existingUser.password);

              if(!passwordMatch){
                return null;
              }

              return {
                id: `${existingUser.id}`,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
              }
            }
        })
      ],
      callbacks: {
        async jwt({ token, user}) {
          if(user){
            return {
              ...token,
              email: user.email
            }
          }
          return token
        },
        async session({ session, user, token}) {
          return session
        },
      }
}

