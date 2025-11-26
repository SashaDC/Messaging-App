import {
  useDeleteRelationship,
  useDeclineFriendRequest,
} from '../hooks/useFriends'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  relationshipId: number
  setAlertMsg: (errorMsg: string | null) => void
  deleteType: 'Delete' | 'Decline'
}

// Function takes a friend Id as props and either deletes the
// friend or declines the friend request when button is clicked.
// It shows an error message if not.
export default function FriendDelete({
  relationshipId,
  setAlertMsg,
  deleteType,
}: Props) {
  const deleteFriend = useDeleteRelationship()
  const declineRequest = useDeclineFriendRequest()
  const { getAccessTokenSilently } = useAuth0()

  const handleClick = async () => {
    try {
      const token = await getAccessTokenSilently()
      if (deleteType === 'Delete') {
        await deleteFriend.mutateAsync({
          token: token,
          relationshipId: relationshipId,
        })
      }
      if (deleteType === 'Decline') {
        await declineRequest.mutateAsync({
          token: token,
          relationshipId: relationshipId,
        })
      }
      setAlertMsg(null)
    } catch (err) {
      setAlertMsg('Error deleting friend')
    }
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="rounded-full border border-[#E0AAFF]/70 px-3 py-1 text-[11px] hover:bg-[#10002B]/40"
      name={deleteType}
    >
      {deleteType}
    </button>
  )
}
