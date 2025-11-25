import React, { useState } from 'react'
import { useAddFriend } from '../hooks/useFriends'
import { useOutletContext } from 'react-router'
import { ChatOutletContext } from '../../models/outletContext'

export default function FriendAdd() {
  const [error, setError] = useState<string | null>(null)
  const [identifier, setIdentifier] = useState('') // email / username etc.
  const addFriend = useAddFriend()
  const [adding, setAdding] = useState(false)
  const { currentUserId } = useOutletContext<ChatOutletContext>()

  const handleAddFriend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      addFriend.mutate({
        friendEmail: identifier,
        currentUserId: currentUserId,
      })
      setAdding(addFriend.isPending)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
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
      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-900/40 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}
    </>
  )
}
