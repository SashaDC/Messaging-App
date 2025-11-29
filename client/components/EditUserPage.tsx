import { User } from '../../models/user'
import { useOutletContext } from 'react-router'
import { useFetchUserById } from '../hooks/useUsers'
import EditUserForm from './EditUserForm'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
import type { ChatOutletContext } from '../../models/outletContext'

export default function EditUserPage() {
  const { currentUserId } = useOutletContext<ChatOutletContext>()
  const { data, isLoading, isError, editUser } = useFetchUserById(currentUserId)
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const handleUpdateUser = async (updatedUser: User, fileData?: File) => {
    try {
      const token = await getAccessTokenSilently()
      // Make FormData object with file, username, id, to send to server.
      // Pfp is named by multer server side, so don't need to add that to formdata
      const formData = new FormData()
      formData.append('username', updatedUser.username)
      formData.append('id', updatedUser.id)
      fileData ? formData.append('singleFile', fileData) : null
      //Edit user
      editUser.mutate({ token: token, formData: formData })

      navigate('/')
    } catch (err) {
      console.error('Failed to edit user', err)
    }
  }

  if (isError) {
    return <p>Error editing profile. Please try again later</p>
  }

  if (isLoading || !data) {
    return <p>Loading...</p>
  }

  return <EditUserForm currentUser={data} handleUpdateUser={handleUpdateUser} />
}
