import NextAuth, { NextAuthOptions } from "next-auth"
import CognitoProvider from 'next-auth/providers/cognito'

export const authOptions:NextAuthOptions =   {
    providers: [
        CognitoProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID || '',
            clientSecret:process.env.NEXTAUTH_SECRET || '',
            issuer: process.env.NEXTAUTH_ISSUER
          }),
    ]
}

export default NextAuth(authOptions)