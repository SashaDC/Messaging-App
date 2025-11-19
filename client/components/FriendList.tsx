import { useState } from 'react'

type Friend = {
  id: number
  name: string
  avatarUrl?: string
}

type FriendListProps = {
  friends: Friend[]
  activeFriendId: number
  onSelectFriend: (id: number) => void
}

export function FriendList({
  friends,
  activeFriendId,
  onSelectFriend,
}: FriendListProps) {
  const [search, setSearch] = useState('')

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className="hidden md:flex md:w-64 bg-[#240046] border-r border-[#3C096C] p-4">
      <div className="flex flex-col w-full h-full gap-3">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold mb-1">Chats</h2>
          <p className="text-xs text-[#E0AAFF]/80">
            Select a friend to start messaging.
          </p>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-full px-3 py-1.5 text-xs bg-[#10002B] border border-[#5A189A] focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          />
        </div>

        {/* Friends list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#5A189A] scrollbar-track-transparent">
          {filteredFriends.length === 0 ? (
            <p className="text-xs text-[#E0AAFF]/70 mt-2">
              No friends found.
            </p>
          ) : (
            <ul className="space-y-1">
              {filteredFriends.map((friend) => {
                const isActive = friend.id === activeFriendId

                return (
                  <li key={friend.id}>
                    <button
                      type="button"
                      onClick={() => onSelectFriend(friend.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-left transition
                        ${
                          isActive
                            ? 'bg-[#5A189A] text-white'
                            : 'hover:bg-[#3C096C]'
                        }`}
                    >
                      {/* Avatar */}
                      <div className="relative">
                        <div className="h-8 w-8 rounded-full bg-[#9D4EDD] flex items-center justify-center font-semibold text-xs uppercase">
                          {friend.name[0]}
                        </div>
                        {/* Online dot (just visual for now) */}
                        <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#240046]" />
                      </div>

                      {/* Name + small subtitle */}
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">
                          {friend.name}
                        </span>
                        <span className="text-[10px] text-[#E0AAFF]/75">
                          Tap to view messages
                        </span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </aside>
  )
}
