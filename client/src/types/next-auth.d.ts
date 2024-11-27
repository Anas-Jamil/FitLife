import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        isAdmin: boolean
        firstName: string,
        lastName: string
    }
    interface Session {
        user: User & {
            isAdmin: boolean
            firstName: string,
            lastName: string
        }
        token: {
            isAdmin: boolean
            firstName: string,
            lastName: string
        }
    }
}