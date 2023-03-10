import { useSession, signIn, signOut} from 'next-auth/react'

export default function Home() {
  console.log('env -> ', process.env.NEXTAUTH_CLIENT_ID)
  const { data: session } = useSession()

  console.log('hi ',session)

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
