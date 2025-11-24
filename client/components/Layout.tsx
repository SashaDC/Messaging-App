import { Outlet } from 'react-router'
import { useState } from 'react'
import { FriendList } from './FriendList'
import type { ChatOutletContext } from '../../models/outletContext'
import { useFetchAcceptedFriends } from '../hooks/useRelationships'

interface Props {
  currentUserId: string
}

export default function Layout({ currentUserId }: Props) {
  const {
    data: friends,
    isLoading,
    isError,
  } = useFetchAcceptedFriends('auth0|123')
  const [activeFriendId, setActiveFriendId] = useState<number | null>(null)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !friends) {
    return <p>Error loading friends</p>
  }

  console.log(friends)

  return (
    <div className="flex min-h-screen bg-[#10002B] text-white">
      <FriendList
        friends={friends}
        activeFriendId={
          activeFriendId ? activeFriendId : friends[0].id ? friends[0].id : 0
        }
        onSelectFriend={setActiveFriendId}
      />

      {/* Main content area where ChatWindow / FriendshipPage render */}
      <main className="flex-1">
        <Outlet
          context={
            {
              friends,
              activeFriendId: activeFriendId
                ? activeFriendId
                : friends[0].id
                  ? friends[0].id
                  : 0,
              setActiveFriendId,
              currentUserId,
            } satisfies ChatOutletContext
          }
        />
      </main>
    </div>
  )
}
