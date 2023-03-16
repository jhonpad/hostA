import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Session } from 'next-auth'
import { useSession, signIn, signOut, getSession, getCsrfToken} from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import { getToken } from "next-auth/jwt";
import { useEffect } from 'react'
import { validSession } from './api/authorize'

type Props = {
  serverSession: Session | null,
  session2: Session | null,
  csrf: string | null
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const session2 = await getSession(context)

  const {req, res} = context

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log('Middleware - token -> ', token ) 

  validSession()

  const csrf = await getCsrfToken()

  const session =  await getServerSession(req, res, authOptions)

  const newSession:Session | null = session ? {
    user: {
      name: session?.user.name || '',
      address: session?.user.address || '',
      email: session?.user.email || '',
      image: session?.user.image || ''
    },
    expires : session?.expires || ''
  }: null

  console.log('ServerSide - Session -> ', session)
  return {
    props: {
      serverSession: newSession,
      session2,
      csrf: csrf || null
    }
  }
}

export const Home = ({
  serverSession,
  session2,
  csrf
}: InferGetServerSidePropsType<typeof getServerSideProps>) =>  {
  const { data: session, status } = useSession()
  // const [status, session ] = useSession()

  console.log('Session ',session)
  console.log('session2 -> ',session2)
  console.log('CSRF -> ', csrf)

  

  // useEffect(() => {
  //       if(!serverSession) {
  //         signIn('cognito')
  //       }
  // }, [])

  if (serverSession) {
    return (
      <div>
        <button onClick={(evt) => {
          evt.preventDefault()
          signOut()
          }}>Cerrar sesión</button>
        {/* <button onClick={() => validSession()}>Validar Sesion</button> */}
        <br />
        <h2> <b>Usuario:</b> {serverSession.user.email}</h2>
      </div>
    ) 
  }

  return (
    <div>
      <button onClick={() => signIn('cognito')}>Iniciar sesión</button>
      {/* <button onClick={() => validSession()}>Validar Sesion</button> */}

    </div>
  )
  
}

// export const Home = () => {

//   const fetchSession = async () => {
//     const res = await fetch('/api/auth/session')
//     const session = await res.json()
//     if(Object.keys(session).length) {
//       console.log('Session activa -> ', session)
//     } else {
//     // return null
//     console.log('Session no activa')
//     }

//   }
  
  
//   const { data: session } = useSession()
//   // useEffect(() => {
//   //   if(!session) {
//   //     signIn('cognito')
//   //   }
//   // }, [])

//   return (
//     <div>
//       home

//       <button onClick={() => fetchSession()}>Obtener Session</button>
//       <button onClick={() => signIn('cognito')}>Iniciar sesión</button>
//     </div>
//   )
// }

export default Home