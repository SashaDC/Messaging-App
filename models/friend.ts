export type Friend = {
  relationshipId: number
  name: string
  avatarUrl?: string
  friendAuthId: string
  email: string
  status: Status
}

export type Status = 'accepted' | 'pending' | 'blocked'
