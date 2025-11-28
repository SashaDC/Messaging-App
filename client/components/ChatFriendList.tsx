import { useState } from 'react'
import type { Friend } from '../../models/friend'

type FriendListProps = {
  friends: Friend[]
  activeFriendId: number
  onSelectFriend: (id: number) => void
}

export default function ChatFriendList({
  friends,
  activeFriendId,
  onSelectFriend,
}: FriendListProps) {
  const [search, setSearch] = useState('')

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <aside className="hidden border-r border-[#3C096C] bg-[#240046] p-4 md:flex md:w-64">
      <div className="flex h-full w-full flex-col gap-3">
        {/* Header + button */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold leading-tight">Chats</h2>
            <p className="text-xs text-[#E0AAFF]/80">
              Select a friend to start messaging.
            </p>
          </div>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-full border border-[#5A189A] bg-[#10002B] px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          />
        </div>

        {/* Friends list */}
        <div className="scrollbar-thin scrollbar-thumb-[#5A189A] scrollbar-track-transparent flex-1 overflow-y-auto">
          {filteredFriends.length === 0 && (
            <p className="mt-2 text-xs text-[#E0AAFF]/70">No friends found.</p>
          )}
          {filteredFriends.length > 0 && (
            <ul className="space-y-1">
              {filteredFriends.map((friend) => {
                const isActive = friend.relationshipId === activeFriendId

                return (
                  <li key={friend.relationshipId}>
                    <button
                      type="button"
                      onClick={() => onSelectFriend(friend.relationshipId)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition
                        ${
                          isActive
                            ? 'bg-[#5A189A] text-white'
                            : 'hover:bg-[#3C096C]'
                        }`}
                    >
                      {/* Avatar */}
                      <div className="relative">
                        {friend.avatarUrl && (
                          <img
                            className="h-8 w-8 justify-center rounded-full"
                            src={friend.avatarUrl}
                            alt={`Avatar for ${friend.name}`}
                          />
                        )}
                        {!friend.avatarUrl && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9D4EDD] text-xs font-semibold uppercase">
                            {friend.name[0]}
                          </div>
                        )}
                        {/* Online dot (visual only) */}
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#240046] bg-green-400" />
                      </div>

                      {/* Name + hint */}
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
