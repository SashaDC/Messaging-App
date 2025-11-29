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
    logout,
  } = useAuth0()
  const validateUser = useValidateUser()
  const userIsValidated = useRef(
    sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : null,
  )
  const errorMessage = useRef<string | null>(
    sessionStorage.getItem('errMsg') ? sessionStorage.getItem('errMsg') : null,
  )

  useEffect(() => {
    handleDatabase()
  }, [user, getAccessTokenSilently]) //eslint-disable-line

  const handleLoginClick = async () => {
    //If not authenticated by auth0, authenticate.
    if (!isAuthenticated) {
      await loginWithRedirect()
    } else if (
      user &&
      user.sub &&
      (!userIsValidated.current || userIsValidated.current !== user.sub)
    ) {
      //If authenticated but not seeing chat window, likely that the sessionStorage
      //has a different user id stored or none
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
        const dbUser = await validateUser.mutateAsync({
          token,
          user: userData,
        })
        userIsValidated.current = `${dbUser.id}`
        sessionStorage.setItem('userId', `${dbUser.id}`)
        sessionStorage.removeItem('errMsg')
      } catch (err) {
        logout()
        sessionStorage.setItem(
          'errMsg',
          `Failed to validate. Email or username may already be in use`,
        )
      }
    }
  }

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
    return (
      <HomePage
        onLoginClick={handleLoginClick}
        errorMessage={errorMessage.current}
      />
    )
  }

  // Authenticated & validated → show main app layout (which includes <Outlet />)
  return <Layout currentUserId={user.sub} />
}

export default App
