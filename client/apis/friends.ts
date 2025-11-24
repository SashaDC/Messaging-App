export type Friend = {
  id: number
  name: string
  email?: string
  avatarUrl?: string
}

// GET /api/friends - list of my friends
export async function getFriends(): Promise<Friend[]> {
  const res = await fetch('/api/friends')

  if (!res.ok) {
    throw new Error('Failed to load friends')
  }

  return await res.json()
}

// POST /api/friends - add a friend
// Adjust the body fields to match backend
export async function addFriend(identifier: string): Promise<Friend> {
  const res = await fetch('/api/friends', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  
    body: JSON.stringify({ email: identifier }),
  })

  if (!res.ok) {
    throw new Error('Failed to add friend')
  }

  return await res.json()
}
