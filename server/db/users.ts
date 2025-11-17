import db from './connection.ts'
import { User, UserData } from '../../models/user.ts'

const userSelect = [
  'users.auth_id as id',
  'email',
  'username',
  'bio',
  'pfp',
  'created_at as createdAt',
]

export async function getUserById(id: string): Promise<User | undefined> {
  const user = await db('users')
    .where({ id })
    .select(...userSelect)
    .first()
  return user as User | undefined
}

export async function addUser({
  id,
  email,
  username,
}: UserData): Promise<User | undefined> {
  const user = await db('users')
    .insert({ auth_id: id, email, username })
    .returning([...userSelect])
  return user[0] as User | undefined
}
