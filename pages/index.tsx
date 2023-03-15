import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Session } from 'next-auth'
import { useSession, signIn, signOut, getSession} from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import { getToken } from "next-auth/jwt";
import { useEffect } from 'react'

type Props = {
  serverSession: Session | null,
  session2: Session | null
}

export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
  const session2 = await getSession(context)

  const {req, res} = context

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log('Middleware - token -> ', token ) 

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
      session2
    }
  }
}

export const Home = ({
  serverSession,
  session2
}: InferGetServerSidePropsType<typeof getServerSideProps>) =>  {
  const { data: session, status } = useSession()
  // const [status, session ] = useSession()

  console.log('Session ',session)
  console.log('session2 -> ',session2)

  const validSession = async () => {
    const clientId = '7ta3hehkbumvglk4nb5icek0ft'
    const secret = '12djclgjmmt8gnctpoj4gkbtitfratnibksggvci610aok8gvego'
    const scope = 'OpenID'

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret:secret,
      scope
    }) 
    
    //`grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`;
    
    const response = await fetch(`https://sesion-guest-poc.auth.us-west-2.amazoncognito.com/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // Authorization: `Basic ${`${clientId}:${secret}`}`
      },
      body
    });

    const data = await response.json();
    console.log('Validate Sesion -> ', data)
    // return data.access_token;
  }

  useEffect(() => {
        // if(!serverSession) {
        //   signIn('cognito')
        // }
  }, [])

  if (serverSession) {
    return (
      <div>
        <button onClick={(evt) => {
          evt.preventDefault()
          signOut()
          }}>Cerrar sesión</button>
        <button onClick={() => validSession()}>Validar Sesion</button>
        <br />
        <h2> <b>Usuario:</b> {serverSession.user.email}</h2>
      </div>
    ) 
  }

  return (
    <div>
      <button onClick={() => signIn('cognito')}>Iniciar sesión</button>
      <button onClick={() => validSession()}>Validar Sesion</button>

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