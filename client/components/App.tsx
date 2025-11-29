import { useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Layout from './Layout'
import { HomePage } from './HomePage'
import { useValidateUser } from '../hooks/useUsers'
import { UserData } from '../../models/user'

function App() {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
    user,
  } = useAuth0()

  const validateUser = useValidateUser()

  const userIsValidated = useRef(
    sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : null,
  )

  const handleLoginClick = async () => {
    //If not authenticated by auth0, authenticate. This will make useEffect run
    if (!isAuthenticated) {
      await loginWithRedirect()
    } else {
      //If authenticated but not seeing chat window, likely that the sessionStorage
      //had the user from another time.
      userIsValidated.current = null
      handleDatabase()
    }
  }

  const handleDatabase = async () => {
    if (user && user.email && user.sub) {
      const userData: UserData = {
        email: user.email,
        username: user.nickname ? user.nickname : user.email,
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
        userIsValidated.current = `${user.sub}`
        localStorage.setItem('userIsValid', 'true')
      } catch (err) {
        console.error('Failed to validate user', err)
      }
    }
  }

  useEffect(() => {
    handleDatabase()
  }, [user, getAccessTokenSilently]) //eslint-disable-line

  // Still loading Auth0 state
  if (isLoading) {
    return <p>Loading...</p>
  }

  // Show landing/login page if not authed or not validated
  if (
    !isAuthenticated ||
    !userIsValidated.current ||
    !user ||
    !user.sub ||
    userIsValidated.current !== user.sub
  ) {
    return <HomePage onLoginClick={handleLoginClick} />
  }

  // Authenticated & validated → show main app layout (which includes <Outlet />)
  return <Layout currentUserId={user.sub} />
}

export default App
