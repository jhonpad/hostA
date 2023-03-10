import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Session } from 'next-auth'
import { useSession, signIn, signOut, getSession} from 'next-auth/react'
type Props = {
  session: Session | null
}

export const getServerSideProps: GetServerSideProps<Props> = async(context: GetServerSidePropsContext) => {
  const session = await getSession(context)

  console.log('context -> ', context)
  
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
  const { status } = useSession()


  console.log('Session -> ',session)
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
