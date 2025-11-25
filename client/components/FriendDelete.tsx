import { useDeleteRelationship } from '../hooks/useFriends'
import { useAuth0 } from '@auth0/auth0-react'
import { useOutletContext } from 'react-router'
import type { ChatOutletContext } from '../../models/outletContext'

interface Props {
  friendId: string
  setAlertMsg: (errorMsg: string) => void
}

// Function takes a friend Id as props and deletes the friend when you click the delete friend button.
// It navigates to chat window currently if the delete was successful and shows an error message if not.
export default function FriendDelete({ friendId, setAlertMsg }: Props) {
  const { currentUserId } = useOutletContext<ChatOutletContext>()
  const deleteFriend = useDeleteRelationship()
  const { getAccessTokenSilently } = useAuth0()

  const handleClick = async () => {
    try {
      const token = await getAccessTokenSilently()
      await deleteFriend.mutateAsync({
        token: token,
        currentUserId: currentUserId,
        friendId: friendId,
      })
    } catch (err) {
      setAlertMsg('Error deleting friend')
    }
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="rounded-full border border-[#E0AAFF]/70 px-3 py-1 text-[11px] hover:bg-[#10002B]/40"
      name="delete"
    >
      Delete friend
    </button>
  )
}
