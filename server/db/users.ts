import db from './connection.ts'
import { User, UserData } from '../../models/user.ts'

const userSelect = [
  'users.auth_id as id',
  'email',
  'username',
  'pfp',
  'created_at as createdAt',
]

interface DBAddUserData {
  auth_id: string
  email: string
  username: string
  pfp?: string
}

interface DBEditUserData {
  username: string
  pfp?: string
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
}: UserData): Promise<User | undefined> {
  const userToInsert: DBAddUserData = {
    auth_id: id,
    email: email,
    username: username,
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
  pfp: string | undefined,
  id: string,
): Promise<User | undefined> {
  const userToUpdate: DBEditUserData = { username: username }
  //Check if pfp is undefined, if not correct the formatting supplied by multer for pfps
  pfp ? (userToUpdate.pfp = `/${pfp.split('/').slice(1).join('/')}`) : null
  const response = await db('users')
    .where('auth_id', id)
    .update(userToUpdate)
    .returning([...userSelect])
  return response[0] as User | undefined
}

export async function checkUsernameUsed(
  username: string,
  id: string,
): Promise<boolean> {
  const response = await db('users')
    .where('username', username)
    .select('auth_id')
    .first()
  //Check if the username is in use
  let usernameForbidden = response ? true : false
  //Change usernameForbidden to false if the user with the username is the current user
  if (usernameForbidden) {
    usernameForbidden = response.auth_id !== id
  }
  return usernameForbidden
}

export async function deleteUser(id: string): Promise<void> {
  await db('users').where({ auth_id: id }).delete()
}
