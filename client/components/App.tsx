import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useValidateUser } from '../hooks/useUsers'
import { HomePage } from './HomePage'
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
  const userIsInDatabase = useRef(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect])

  // Add user to database
  useEffect(() => {
    const syncUser = async () => {
      if (
        !userIsInDatabase.current &&
        isAuthenticated &&
        user &&
        user.email &&
        user.nickname &&
        user.sub
      ) {
        const userData: UserData = {
          email: user.email,
          username: user.nickname,
          id: user.sub,
        }
        if (user.image) {
          userData.pfp = user.image
        }
        try {
          const token = await getAccessTokenSilently()
          validateUser.mutate({
            token,
            user: userData,
          })
          userIsInDatabase.current = true
        } catch (err) {
          console.error('Failed to validate user', err)
        }
      }
    }
    syncUser()
  }, [user, isAuthenticated, validateUser, getAccessTokenSilently])

  return <HomePage />
}

export default App
