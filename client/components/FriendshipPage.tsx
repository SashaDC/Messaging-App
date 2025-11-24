import { FormEvent, useEffect, useState } from 'react'
import { addFriend, getFriends, type Friend } from '../apis/friends'

export function FriendshipPage() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [identifier, setIdentifier] = useState('') // email / username etc.
  const [adding, setAdding] = useState(false)

  // Load current friends on mount
  useEffect(() => {
    async function loadFriends() {
      try {
        setLoading(true)
        setError(null)
        const data = await getFriends()
        setFriends(data)
      } catch (err) {
        console.error(err)
        setError('Could not load friends.')
      } finally {
        setLoading(false)
      }
    }

    loadFriends()
  }, [])

  async function handleAddFriend(e: FormEvent) {
    e.preventDefault()
    const trimmed = identifier.trim()
    if (!trimmed) return

    try {
      setAdding(true)
      setError(null)
      const created = await addFriend(trimmed)

      // add new friend into local list if not already there
      setFriends((prev) => {
        const exists = prev.some((f) => f.id === created.id)
        return exists ? prev : [...prev, created]
      })
      setIdentifier('')
    } catch (err) {
      console.error(err)
      setError('Could not add friend. Check the details and try again.')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C] text-white px-4">
      <div className="w-full max-w-2xl bg-[#240046]/80 border border-[#5A189A] rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Your friendships</h1>
          <p className="mt-2 text-sm text-[#E0AAFF]/80">
            View your existing friends and add new ones.
          </p>
        </div>

        {/* Add Friend form */}
        <form
          onSubmit={handleAddFriend}
          className="mb-6 flex flex-col md:flex-row gap-3"
        >
          <input
            className="flex-1 rounded-full px-3 py-2 bg-[#10002B] border border-[#5A189A] text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            placeholder="Enter friend email or username…"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <button
            type="submit"
            disabled={adding}
            className="px-4 py-2 rounded-full bg-[#7B2CBF] hover:bg-[#9D4EDD] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? 'Adding…' : 'Add friend'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-4 text-xs text-red-200 bg-red-900/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Friends list */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-[#E0AAFF]/80">Loading friends…</p>
          ) : friends.length === 0 ? (
            <p className="text-sm text-[#E0AAFF]/80">
              You don’t have any friends yet. Use the form above to add someone.
            </p>
          ) : (
            <ul className="space-y-2">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center justify-between gap-3 bg-[#3C096C]/70 border border-[#5A189A]/60 rounded-xl px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#9D4EDD] flex items-center justify-center text-xs font-semibold uppercase">
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
                  {/* Later this could navigate to chat with this friend */}
                  <button
                    type="button"
                    className="text-[11px] px-3 py-1 rounded-full border border-[#E0AAFF]/70 hover:bg-[#10002B]/40"
                  >
                    Open chat
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
