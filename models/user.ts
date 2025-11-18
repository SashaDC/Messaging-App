export interface UserData {
  id: string
  email: string
  username: string
  pfp?: string
}

export interface User extends UserData {
  bio?: string
  createdAt: string
}
