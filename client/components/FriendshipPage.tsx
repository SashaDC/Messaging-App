import FriendAdd from './FriendAdd'
import FriendsTab from './FriendsTab'
import Nav from './Nav'
import { useState } from 'react'

export function FriendshipPage() {
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

  const handleSetAlert = (msg: string | null) => {
    setAlertMsg(msg)
  }
  return (
    <>
      <div className="border border-[#10002B] bg-[#240046] p-4">
        <Nav />{' '}
      </div>
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
          <FriendAdd setAlertMsg={handleSetAlert} />
          {/* Error */}
          {alertMsg && (
            <p className="mb-4 rounded-lg bg-red-900/40 px-3 py-2 text-xs text-red-200">
              {alertMsg}
            </p>
          )}
          {/* Manage friends tabs */}
          <div className="space-y-3">
            <FriendsTab setAlertMsg={handleSetAlert} />
          </div>
        </div>
      </div>
    </>
  )
}
