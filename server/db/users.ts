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

interface DBAddUserData {
  auth_id: string
  email: string
  username: string
  pfp?: string
  bio?: string
}

interface DBEditUserData {
  username: string
  pfp?: string
  bio?: string
}

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
  pfp,
  bio,
}: UserData): Promise<User | undefined> {
  const userToInsert: DBAddUserData = {
    auth_id: id,
    email: email,
    username: username,
  }
  if (bio) {
    userToInsert.bio = bio
  }
  if (pfp) {
    userToInsert.pfp = pfp
  }
  const response = await db('users')
    .insert(userToInsert)
    .returning([...userSelect])
  return response[0] as User | undefined
}

export async function checkUserExists(
  user: UserData,
): Promise<User | undefined> {
  const response = await db('users')
    .where({ email: user.email, auth_id: user.id })
    .select(...userSelect)
  return response[0] as User | undefined
}

export async function editUser(
  username: string,
  bio: string | undefined,
  pfp: string | undefined,
  id: string,
): Promise<User | undefined> {
  const userToUpdate: DBEditUserData = { username: username }
  bio ? (userToUpdate.bio = bio) : null
  pfp ? (userToUpdate.pfp = pfp) : null
  const response = await db('users')
    .where('auth_id', id)
    .update(userToUpdate)
    .returning([...userSelect])
  return response[0] as User | undefined
}
