import { Outlet } from 'react-router'
import { useState } from 'react'
import type { ChatOutletContext } from '../../models/outletContext'
import { useFetchAcceptedFriends } from '../hooks/useFriends'

interface Props {
  currentUserId: string
}

export default function Layout({ currentUserId }: Props) {
  const {
    data: friends,
    isLoading,
    isError,
  } = useFetchAcceptedFriends(currentUserId)
  const [activeFriendId, setActiveFriendId] = useState<number | null>(null)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !friends) {
    return <p>Error loading friends</p>
  }

  return (
    <Outlet
      context={
        {
          friends,
          activeFriendId: activeFriendId
            ? activeFriendId
            : friends.length > 0
              ? friends[0].relationshipId
              : 0,
          setActiveFriendId,
          currentUserId,
        } satisfies ChatOutletContext
      }
    />
  )
}
