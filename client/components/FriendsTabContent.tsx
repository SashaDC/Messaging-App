import React from 'react'
import { Status, Friend } from '../../models/friend'
import { useNavigate } from 'react-router'
import FriendButton from './FriendButton'

interface Props {
  status: Status
  friends: Friend[]
  setAlertMsg: (errorMsg: string | null) => void
  currentUserId: string
}

export default function FriendsTabContent({
  status,
  friends,
  setAlertMsg,
  currentUserId,
}: Props) {
  const filteredFriends = friends.filter((friend) => friend.status === status)
  const navigate = useNavigate()

  if (friends.length === 0) {
    return (
      <div className="text-sm text-[#E0AAFF]">
        <p className="pb-2">None found</p>
      </div>
    )
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonType = e.currentTarget.name
    setAlertMsg(null)
    switch (buttonType) {
      case 'chat':
        navigate('/')
        break
      case 'acceptRequest':
        break
    }
  }

  return (
    <ul className="space-y-2">
      {filteredFriends.map((friend) => (
        //Todo - blocked ppl shouldn't see that they're blocked
        <li
          key={friend.relationshipId}
          className="flex items-center justify-between gap-3 rounded-xl border border-[#5A189A]/60 bg-[#3C096C]/70 px-3 py-2 text-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9D4EDD] text-xs font-semibold uppercase">
              {friend.name?.[0] ?? '?'}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{friend.name}</span>
              {friend.email && (
                <span className="text-[11px] text-[#E0AAFF]/80">
                  {friend.email}
                </span>
              )}
            </div>
          </div>
          {status === 'accepted' && (
            <div>
              <button
                onClick={handleClick}
                type="button"
                name="chat"
                className="rounded-full border border-[#E0AAFF]/70 px-3 py-1 text-[11px] hover:bg-[#10002B]/40"
              >
                Chat now
              </button>
              <FriendButton
                relationshipId={friend.relationshipId}
                setAlertMsg={setAlertMsg}
                actionType="Delete"
              />
              <FriendButton
                relationshipId={friend.relationshipId}
                setAlertMsg={setAlertMsg}
                actionType="Block"
              />
            </div>
          )}
          {status === 'blocked' && (
            <div>
              <FriendButton
                relationshipId={friend.relationshipId}
                setAlertMsg={setAlertMsg}
                actionType="Unblock"
              />
            </div>
          )}
          {status === 'pending' && friend.requestedBy !== currentUserId && (
            <div>
              <button
                type="button"
                className="rounded-full border border-[#E0AAFF]/70 px-3 py-1 text-[11px] hover:bg-[#10002B]/40"
                name="acceptRequest"
              >
                Accept
              </button>
              <FriendButton
                relationshipId={friend.relationshipId}
                setAlertMsg={setAlertMsg}
                actionType="Decline"
              />
              <FriendButton
                relationshipId={friend.relationshipId}
                setAlertMsg={setAlertMsg}
                actionType="Block"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
