import {
  useDeleteRelationship,
  useDeclineFriendRequest,
  useBlockFriend,
} from '../hooks/useFriends'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  relationshipId: number
  setAlertMsg: (errorMsg: string | null) => void
  actionType: 'Delete' | 'Decline' | 'Block'
}

// Function takes a friend Id as props and actions the request according action type.
// It shows an error message if not.
export default function FriendDelete({
  relationshipId,
  setAlertMsg,
  actionType,
}: Props) {
  const deleteFriend = useDeleteRelationship()
  const declineRequest = useDeclineFriendRequest()
  const blockFriend = useBlockFriend()
  const { getAccessTokenSilently } = useAuth0()

  const handleClick = async () => {
    try {
      const token = await getAccessTokenSilently()
      if (actionType === 'Delete') {
        await deleteFriend.mutateAsync({
          token: token,
          relationshipId: relationshipId,
        })
      }
      if (actionType === 'Decline') {
        await declineRequest.mutateAsync({
          token: token,
          relationshipId: relationshipId,
        })
      }
      if (actionType === 'Block') {
        await blockFriend.mutateAsync({
          token: token,
          relationshipId: relationshipId,
        })
      }
      setAlertMsg(null)
    } catch (err) {
      setAlertMsg(
        `${err instanceof Error ? err.message : `${actionType} unsuccessful. Please try again later.`}`,
      )
    }
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="rounded-full border border-[#E0AAFF]/70 px-3 py-1 text-[11px] hover:bg-[#10002B]/40"
      name={actionType}
    >
      {actionType}
    </button>
  )
}
