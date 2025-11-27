import {
  useDeleteRelationship,
  useDeclineFriendRequest,
  useBlockFriend,
  useUnblockFriend,
} from '../hooks/useFriends'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  relationshipId: number
  setAlertMsg: (errorMsg: string | null) => void
  actionType: 'Delete' | 'Decline' | 'Block' | 'Unblock'
}

// Function takes a friend Id as props and actions the request according action type.
// It shows an error message on FriendshipPage if unsuccessful
export default function FriendDelete({
  relationshipId,
  setAlertMsg,
  actionType,
}: Props) {
  const deleteFriend = useDeleteRelationship()
  const declineRequest = useDeclineFriendRequest()
  const blockFriend = useBlockFriend()
  const unblockFriend = useUnblockFriend()
  const { getAccessTokenSilently } = useAuth0()

  const handleClick = async () => {
    try {
      const token = await getAccessTokenSilently()
      switch (actionType) {
        case 'Delete':
          await deleteFriend.mutateAsync({
            token: token,
            relationshipId: relationshipId,
          })
          break
        case 'Decline':
          await declineRequest.mutateAsync({
            token: token,
            relationshipId: relationshipId,
          })
          break
        case 'Block':
          await blockFriend.mutateAsync({
            token: token,
            relationshipId: relationshipId,
            //TODO - add these throughout
            // status:
            // currentUserId:
          })
          break
        case 'Unblock':
          await unblockFriend.mutateAsync({
            token: token,
            relationshipId: relationshipId,
          })
          break
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
