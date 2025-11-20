import { User } from '../../models/user'
import { useContextAuthId } from './App'
import { useFetchUserById } from '../hooks/useUsers'
import EditUserForm from './EditUserForm'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'

export default function EditUserFrame() {
  const { currentUserId } = useContextAuthId()
  const { data, isLoading, isError, editUser } = useFetchUserById(currentUserId)
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const handleUpdateUser = async (updatedUser: User) => {
    //Todo - check username is valid and find way to send image to server storage
    try {
      const token = await getAccessTokenSilently()
      editUser.mutate({
        token,
        user: updatedUser,
      })
    } catch (err) {
      console.error('Failed to edit user', err)
    }
    navigate('/')
  }

  if (isError) {
    return <p>Error editing profile. Please try again later</p>
  }

  if (isLoading || !data) {
    return <p>Loading...</p>
  }

  return <EditUserForm currentUser={data} handleUpdateUser={handleUpdateUser} />
}
