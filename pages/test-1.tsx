import { useEffect } from 'react'


export const Test1 = () => {
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

    return data.access_token;
  }

  useEffect(() => {
    validSession()
  }, [])

  return (
    <div>
      TEST # 1
    </div>
  )
}

export default Test1