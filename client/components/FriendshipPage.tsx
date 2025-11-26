import FriendAdd from './FriendAdd'
import FriendsTab from './FriendsTab'
import { useState } from 'react'

export function FriendshipPage() {
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

  const handleSetAlert = (msg: string | null) => {
    setAlertMsg(msg)
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#10002B] via-[#240046] to-[#3C096C] px-4 text-white">
      <div className="w-full max-w-2xl rounded-2xl border border-[#5A189A] bg-[#240046]/80 p-6 shadow-xl backdrop-blur md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold md:text-3xl">Your friends</h1>
          <p className="mt-2 text-sm text-[#E0AAFF]/80">
            View your existing friends and add new ones.
          </p>
        </div>
        {/*Add friend */}
        <FriendAdd />
        {alertMsg && (
          <p className="border border-red-400 px-3 py-1 text-center text-base text-red-400">
            {alertMsg}
          </p>
        )}
        {/* Manage friends tabs */}
        <div className="space-y-3">
          <FriendsTab setAlertMsg={handleSetAlert} />
        </div>
      </div>
    </div>
  )
}
