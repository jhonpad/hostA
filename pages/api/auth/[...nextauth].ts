import NextAuth, { NextAuthOptions } from "next-auth"
import CognitoProvider from 'next-auth/providers/cognito'

export const authOptions:NextAuthOptions =   {
    providers: [
        CognitoProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID || '',
            clientSecret:process.env.NEXTAUTH_SECRET || '',
            issuer: process.env.NEXTAUTH_ISSUER
          }),
    ],
    cookies: {
        sessionToken: {
            name: `session-token`,
            options: {
              httpOnly: true,
              sameSite: 'none',
              secure: true,
              domain: '.vercel.app'
            }
          },
    }
}

export default NextAuth(authOptions)