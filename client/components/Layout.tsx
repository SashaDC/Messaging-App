import { Outlet } from 'react-router'
import { useState } from 'react'
import { FriendList } from './FriendList'

type Friend = {
  id: number
  name: string
  avatarUrl?: string
}

export type ChatOutletContext = {
  friends: Friend[]
  activeFriendId: number
  setActiveFriendId: (id: number) => void
}

export default function Layout() {
  const [friends] = useState<Friend[]>([
    { id: 1, name: 'Sasha' },
    { id: 2, name: 'Lucas' },
    { id: 3, name: 'Jennifer' },
  ])

  const [activeFriendId, setActiveFriendId] = useState<number>(friends[0].id)

  return (
    <div className="flex min-h-screen bg-[#10002B] text-white">
      {/* Sidebar */}
      <FriendList
        friends={friends}
        activeFriendId={activeFriendId}
        onSelectFriend={setActiveFriendId}
      />

      {/* Main content area where ChatWindow / FriendshipPage render */}
      <main className="flex-1">
        <Outlet
          context={{
            friends,
            activeFriendId,
            setActiveFriendId,
          }}
        />
      </main>
    </div>
  )
}
