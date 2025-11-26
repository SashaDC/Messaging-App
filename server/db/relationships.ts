import db from './connection.ts'
import type { Friend } from '../../models/friend.ts'

const friendSelect = [
  'relationships.id as relationshipId',
  'users.auth_id as friendAuthId',
  'users.pfp as avatarUrl',
  'users.username as name',
  'users.email as email',
  'relationships.status as status',
]

export async function deleteRelationship(
  currentUserId: string,
  friendId: string,
): Promise<boolean> {
  //Delete relationship where current user is user1 (if this exists)
  const response = await db('relationships')
    .where({ user_one_id: currentUserId, user_two_id: friendId })
    .del()
  //Delete relationship where current user is user2 (if this exists)
  const response2 = await db('relationships')
    .where({ user_one_id: friendId, user_two_id: currentUserId })
    .del()
  /* Knex does not throw an error if an item is not deleted. The response
    is the number of rows that are deleted. Check both responses and see
    if any rows were deleted. Return true if rows were deleted e.g. if number
    of rows deleted is more than 0.*/
  return response + response2 > 0
}

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
