import React, { useState } from 'react'
import { useAddFriend } from '../hooks/useFriends'
import { useOutletContext } from 'react-router'
import { ChatOutletContext } from '../../models/outletContext'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  setAlertMsg: (msg: string | null) => void
}

export default function FriendAdd({ setAlertMsg }: Props) {
  const [identifier, setIdentifier] = useState<string>('') // email /
  const addFriend = useAddFriend()
  const [adding] = useState(addFriend.isPending)
  const { currentUserId } = useOutletContext<ChatOutletContext>()
  const { getAccessTokenSilently } = useAuth0()

  const handleAddFriend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const token = await getAccessTokenSilently()
      await addFriend.mutateAsync({
        friendEmail: identifier,
        currentUserId: currentUserId,
        token,
      })
      setAlertMsg(null)
      setIdentifier('')
    } catch (err) {
      setAlertMsg(err instanceof Error ? err.message : 'Unable to add friend')
    }
  }

  return (
    <>
      {/* Add Friend form */}
      <form
        onSubmit={handleAddFriend}
        className="mb-6 flex flex-col gap-3 md:flex-row"
      >
        <input
          className="flex-1 rounded-full border border-[#5A189A] bg-[#10002B] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          placeholder="Enter friend's email to search…"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <button
          type="submit"
          disabled={adding}
          className="rounded-full bg-[#7B2CBF] px-4 py-2 text-sm font-medium hover:bg-[#9D4EDD] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {adding ? 'Adding…' : 'Add friend'}
        </button>
      </form>
    </>
  )
}
