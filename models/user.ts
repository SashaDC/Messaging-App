export interface UserData {
  id: string
  email: string
  username: string
  pfp?: string
  bio?: string
}

export interface User extends UserData {
  createdAt: string
}
