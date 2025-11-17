export interface UserData {
  id: string
  email: string
  username: string
}

export interface User extends UserData {
  pfp: string
  bio?: string
  createdAt: string
}
