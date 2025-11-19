import { User } from '../../models/user'
import { useContextAuthId } from './App'
import { useFetchUserById } from '../hooks/useUsers'
import EditUserForm from './EditUserForm'

export default function EditUserFrame() {
  const { currentUserId } = useContextAuthId()
  const { data, isLoading, isError, editUser } = useFetchUserById(currentUserId)

  const handleUpdateUser = (updatedUser: User) => {
    editUser.mutate({ updatedUser, token })
  }

  if (isError) {
    return <p>Error editing profile. Please try again later</p>
  }

  if (isLoading || !data) {
    return <p>Loading...</p>
  }

  return <EditUserForm currentUser={data} handleUpdateUser={handleUpdateUser} />
}
