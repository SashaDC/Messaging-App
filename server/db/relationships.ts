import db from './connection.ts'
import type { Friend, Status } from '../../models/friend.ts'

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

export function insertRelationship(requesterId: string, receiverId: string) {
  return db('relationships')
    .insert({ requester_id: requesterId, receiver_id: receiverId })
    .returning('*')
}

//Deletes relationship. Does not block friend
export async function deleteRelationship(
  relationshipId: number,
): Promise<boolean> {
  const response = await db('relationships').where({ id: relationshipId }).del()
  return response > 0
}

//Blocks friend, current user becomes the blockee (blocked_by field)
export async function blockFriend(
  relationshipId: number,
  currentUserId: string,
  status: Status,
): Promise<boolean> {
  const response = await db('relationships')
    .where({ id: relationshipId })
    .update({
      status: 'blocked',
      blocked_by: currentUserId,
      prev_status: status,
    })
  //Response is the number of rows affected by the update
  return response > 0
}

//Unblocks friend. Previous status becomes current status
export async function unblockFriend(relationshipId: number): Promise<boolean> {
  const prevStatus = await db('relationships')
    .where({ id: relationshipId })
    .select('prev_status')
    .first()
  const response = await db('relationships')
    .where({ id: relationshipId })
    .update({ status: prevStatus.prev_status })
  //Response is the number of rows affected by the update
  return response > 0
}
