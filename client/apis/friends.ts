import request from 'superagent'
import { Friend } from '../../models/friend'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface MutateRelationshipData {
  token: string
  relationshipId: number
}

interface AddRelationshipFunction {
  currentUserId: string
  friendEmail: string
}

export async function getAcceptedFriends(
  currentUserId: string,
): Promise<Friend[]> {
  const response = await request.get(
    `${rootURL}/relationships/accepted/${currentUserId}`,
  )
  return response.body as Friend[]
}

export async function getAllFriends(currentUserId: string): Promise<Friend[]> {
  const response = await request.get(
    `${rootURL}/relationships/all/${currentUserId}`,
  )
  return response.body as Friend[]
}

// POST /api/friends - add a friend
// Adjust the body fields to match backend
interface AddRelationshipFunction {
  token: string
  currentUserId: string
  friendId: string
}

export async function addFriend({
  token,
  currentUserId,
  friendId,
}: AddRelationshipFunction): Promise<Friend> {
  const response = await request
    .post(`${rootURL}/relationships`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      requesterId: currentUserId,
      receiverId: friendId,
    })
    .catch(() => {
      throw new Error('Friend not added')
    })

  return response.body as Friend
}

//Deletes relationship only
export async function declineFriendRequest({
  token,
  relationshipId,
}: MutateRelationshipData): Promise<boolean> {
  const response = await request
    .patch(`${rootURL}/relationships/decline`)
    .send({ relationshipId })
    .set('Authorization', `Bearer ${token}`)
    .catch(() => {
      throw new Error('Decline unsuccessful. Please try again later')
    })
  return response.body as boolean
}

//Deletes relationship and messages with relationship id
export async function deleteFriend({
  token,
  relationshipId,
}: MutateRelationshipData): Promise<boolean> {
  const response = await request
    .delete(`${rootURL}/relationships/plus-messages`)
    .set('Authorization', `Bearer ${token}`)
    .send({ relationshipId })
    .catch(() => {
      throw new Error('Delete unsuccessful. Please try again later')
    })
  return response.body as boolean
}

export async function blockFriend({
  token,
  relationshipId,
}: MutateRelationshipData): Promise<boolean> {
  const response = await request
    .patch(`${rootURL}/block`)
    .set('Authorization', `Bearer ${token}`)
    .send({ relationshipId })
    .catch(() => {
      throw new Error('Unable to block. Please try again later')
    })
  return response.body as boolean
}

export async function unblockFriend({
  token,
  relationshipId,
}: MutateRelationshipData): Promise<boolean> {
  const response = await request
    .patch(`${rootURL}/unblock`)
    .set('Authorization', `Bearer ${token}`)
    .send({ relationshipId })
    .catch(() => {
      throw new Error('Unable to unblock. Please try again later')
    })
  return response.body as boolean
}
