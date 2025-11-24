import { useDeleteRelationship } from '../hooks/useRelationships'
import { useAuth0 } from '@auth0/auth0-react'
import { useContextAuthId } from './App'
import { useState } from 'react'
import { useNavigate } from 'react-router'

interface Props {
  friendId: string
}

// Function takes a friend Id as props and deletes the friend when you click the delete friend button.
// It navigates to chat window currently if the delete was successful and shows an error message if not.
export default function DeleteFriend({ friendId }: Props) {
  const { currentUserId } = useContextAuthId()
  const deleteFriend = useDeleteRelationship()
  const { getAccessTokenSilently } = useAuth0()
  const [errorDeletingFriend, setErrorDeletingFriend] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const token = await getAccessTokenSilently()
      await deleteFriend.mutateAsync({
        token: token,
        currentUserId: currentUserId,
        friendId: friendId,
      })
      //Todo - where should this go on a successful delete?
      navigate('/')
    } catch (err) {
      setErrorDeletingFriend(true)
    }
  }

  return (
    <div>
      {errorDeletingFriend && (
        <p>Error deleting friend. Please try again later.</p>
      )}
      <button onClick={handleClick}>Delete friend</button>
    </div>
  )
}
