export const validSession = async () => {
    const clientId = '7ta3hehkbumvglk4nb5icek0ft'
    const clientSecret = '12djclgjmmt8gnctpoj4gkbtitfratnibksggvci610aok8gvego'
    const scope = 'openid'

    // const body = new URLSearchParams({
    //   grant_type: 'authorization_code',
    //   client_id: clientId,
    //   client_secret:clientSecret,
    //   scope
    // }) 
    
    //`grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
    try {
      const credentials = btoa(`${clientId}:${clientSecret}`)

      const encoder = new TextEncoder()
      const dataEncoder = encoder.encode(`${clientId}:${clientSecret}`)
      const base64 = Buffer.from(dataEncoder).toString('base64')


      const response = await fetch(`https://accounts.paxer.com/oauth2/authorize?client_id=${clientId}&scope=${scope}&response_type=code&redirect_uri=http://localhost:3000/api/auth/callback/cognito`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64}`
        }
      });
  
    //   const data = await response.json();
      console.log('Validate Sesion -> ', response)

      return response
    } catch (error) {
      console.log('Validate Sesion - Error -> ', error)
    }
    // return data.access_token;
  }