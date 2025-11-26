import db from './connection.ts'
import type { Friend } from '../../models/friend.ts'

const friendSelect = [
  'relationships.id as relationshipId',
  'users.auth_id as friendAuthId',
  'users.pfp as avatarUrl',
  'users.username as name',
  'users.email as email',
  'relationships.status as status',
  'requested_by as requestedBy',
  'blocked_by as blockedBy',
]

export async function getAcceptedFriends(
  currentUserId: string,
): Promise<Friend[]> {
  //Get all accepted friends of the user
  const response1 = await db('relationships')
    .where({ user_one_id: currentUserId, status: 'accepted' })
    .join('users', 'users.auth_id', 'relationships.user_two_id')
    .select(...friendSelect)
  const response2 = await db('relationships')
    .where({ user_two_id: currentUserId, status: 'accepted' })
    .join('users', 'users.auth_id', 'relationships.user_one_id')
    .select(...friendSelect)
  return [...response1, ...response2] as Friend[]
}

export async function getAllFriends(currentUserId: string): Promise<Friend[]> {
  //Get all friends of the user
  const response1 = await db('relationships')
    .where({ user_one_id: currentUserId })
    .join('users', 'users.auth_id', 'relationships.user_two_id')
    .select(...friendSelect)
  const response2 = await db('relationships')
    .where({ user_two_id: currentUserId })
    .join('users', 'users.auth_id', 'relationships.user_one_id')
    .select(...friendSelect)
  return [...response1, ...response2] as Friend[]
}

//Deletes relationship. Does not block friend
export async function deleteRelationship(
  relationshipId: number,
): Promise<boolean> {
  const response = await db('relationships').where({ id: relationshipId }).del()
  return response > 0
}

//Blocks friend by adding blocked status
export async function blockRelationship(
  relationshipId: number,
): Promise<boolean> {
  const response = await db('relationships')
    .where({ id: relationshipId })
    .update({ status: 'blocked' })
  //Response is the number of rows affected by the update
  return response > 0
}
