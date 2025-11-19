import Layout from './Layout'
import { UserData } from '../../models/user'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useValidateUser } from '../hooks/useUsers'
import { HomePage } from './HomePage'

function App() {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
    user,
  } = useAuth0()
  const validateUser = useValidateUser()
  const userIsValidated = useRef<boolean>(
    localStorage.getItem('userIsValid') === 'true' ? true : false,
  )
  console.log(user)

  const handleLoginClick = async () => {
    if (!isAuthenticated) {
      loginWithRedirect()
    }
  }

  useEffect(() => {
    const handleDatabase = async () => {
      if (user && user.email && user.nickname && user.sub) {
        const userData: UserData = {
          email: user.email,
          username: user.nickname,
          id: user.sub,
        }
        if (user.picture) {
          userData.pfp = user.picture
        }
        try {
          const token = await getAccessTokenSilently()
          validateUser.mutate({
            token,
            user: userData,
          })
          userIsValidated.current = true
          localStorage.setItem('userIsValid', 'true')
        } catch (err) {
          console.error('Failed to validate user', err)
        }
      }
    }
    handleDatabase()
  }, [user])

  if (isLoading) {
    return <p>Loading...</p>
  }

  //Login (homepage) is visible when user is not authenticated or validated against database
  if ((!isAuthenticated || !userIsValidated.current) && !isLoading) {
    return <HomePage onLoginClick={handleLoginClick} />
  }

  //Layout with outlet and routes is visible if authenticated & validated against database
  if (isAuthenticated && userIsValidated.current && !isLoading) {
    return <Layout />
  }
}

export default App
