import NextAuth, { NextAuthOptions } from "next-auth"
import CognitoProvider from 'next-auth/providers/cognito'

export const authOptions:NextAuthOptions =   {
    providers: [
        CognitoProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID || '',
            clientSecret:process.env.NEXTAUTH_SECRET || '',
            issuer: process.env.NEXTAUTH_ISSUER,

          }),

        // {
        //     id: 'cognito',
        //     name: 'Cognito',
        //     type: 'oauth',
        //     version: '2.0',
        //     accessTokenUrl: 'https://sesion-guest-poc.auth.us-west-2.amazoncognito.com/oauth2/token',
        //     authorization: 'https://sesion-guest-poc.auth.us-west-2.amazoncognito.com/oauth2/authorize',
        //     clientId: process.env.NEXTAUTH_CLIENT_ID || '',
        //     clientSecret: process.env.NEXTAUTH_SECRET || '',
        //     idToken: true,
            
        //     issuer: process.env.NEXTAUTH_ISSUER,
        //     profileUrl: 'https://sesion-guest-poc.auth.us-west-2.amazoncognito.com/oauth2/userInfo',
        //     profile: (profile) => {
        //         return {
        //             id: profile.sub,
        //             name: profile.name,
        //             email: profile.email,
        //             image: null,
        //         }
        //     }
            
        // }
    ],
    
    callbacks: {
        async signIn(params) {
            const { user } = params

            console.log('callbacks -> ', user)

            
            return user? true : false
        },
        
    }
}

export default NextAuth(authOptions)