import { UserData } from '../../models/user'
import { useUserById } from '../hooks/useUsers'
import { Navigate } from 'react-router'

export default function LoginOrRegister({ id, username, email }: UserData) {
  const { data: user, isError, error, isLoading, addUser } = useUserById(id)

  if (isError) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (user?.id) {
    return <Navigate to="/" replace />
  } else {
    addUser.mutate({ id, username, email })
    return <Navigate to="/" replace />
  }
}
