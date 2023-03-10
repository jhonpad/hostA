import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Session } from 'next-auth'
import { useSession, signIn, signOut, getSession} from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'

type Props = {
  session: Session | null
}

export const getServerSideProps: GetServerSideProps<Props> = async({req, res}) => {
  // const session = await getSession(context)

  const session = await getServerSession(req, res, authOptions)

  console.log('Session -> ', session)
  return {
    props: {
      session
    }
  }
}

export const Home = ({
  session
}: InferGetServerSidePropsType<typeof getServerSideProps>) =>  {
  console.log('env -> ', process.env.NEXTAUTH_CLIENT_ID)
  // const { data: session } = useSession()
  const { status } = useSession()

  console.log('Session ',session)
  console.log('Status -> ',status)

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>Cerrar sesión</button>
        <br />
        <h2> <b>Usuario:</b> {session.user.email}</h2>
      </div>
    ) 
  }

  return (
    <div>
      <button onClick={() => signIn()}>Iniciar sesión</button>
    </div>
  )
  
}

export default Home