import type { Friend } from './friend'

export type ChatOutletContext = {
  friends: Friend[]
  activeFriendId: number
  setActiveFriendId: (id: number) => void
  currentUserId: string
}
