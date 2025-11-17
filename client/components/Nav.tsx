import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Button from './Button'

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogIn = () => {
    loginWithRedirect({
      appState: {
        returnTo: '/login',
      },
    })
  }

  const handleLogOut = () => {
    logout()
  }

  return (
    <nav>
      <IfAuthenticated>
        <Button handleOnClick={handleLogOut} text="Sign out" />
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Button handleOnClick={handleLogIn} text="Sign in" />
      </IfNotAuthenticated>
    </nav>
  )
}
