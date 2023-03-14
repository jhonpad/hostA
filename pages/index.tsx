import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Session } from 'next-auth'
import { useSession, signIn, signOut, getSession} from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import { getToken } from "next-auth/jwt";
import { useEffect } from 'react'

type Props = {
  session: Session | null
}

// export const getServerSideProps: GetServerSideProps<Props> = async({req, res}) => {
//   // const session = await getSession(context)

//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   console.log('Middleware - token -> ', token ) 

//   const session =  await getServerSession(req, res, authOptions)

//   const newSession:Session | null = session ? {
//     user: {
//       name: session?.user.name || '',
//       address: session?.user.address || '',
//       email: session?.user.email || '',
//       image: session?.user.image || ''
//     },
//     expires : session?.expires || ''
//   }: null

//   console.log('ServerSide - Session -> ', session)
//   return {
//     props: {
//       session: newSession
//     }
//   }
// }

// export const Home = ({
//   session
// }: InferGetServerSidePropsType<typeof getServerSideProps>) =>  {
//   // const { data: session } = useSession()
//   const { status } = useSession()

//   console.log('Session ',session)
//   console.log('Status -> ',status)

//   useEffect(() => {

//   }, [])
//   if (session) {
//     return (
//       <div>
//         <button onClick={() => signOut()}>Cerrar sesión</button>
//         <br />
//         <h2> <b>Usuario:</b> {session.user.email}</h2>
//       </div>
//     ) 
//   }

//   return (
//     <div>
//       <button onClick={() => signIn('cognito')}>Iniciar sesión</button>
//     </div>
//   )
  
// }

export const Home = () => {

  const fetchSession = async () => {
    const res = await fetch('/api/auth/session')
    const session = await res.json()
    if(Object.keys(session).length) {
      console.log('Session activa -> ', session)
    } else {
    // return null
    console.log('Session no activa')
    }

  }

  return (
    <div>
      home

      <button onClick={() => fetchSession()}>Obtener Session</button>
      <button onClick={() => signIn('cognito')}>Iniciar sesión</button>
    </div>
  )
}

export default Home