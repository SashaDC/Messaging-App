import request from 'superagent'
import { Friend, Status } from '../../models/friend'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface MutateRelationshipData {
  token: string
  relationshipId: number
}

interface AddRelationshipFunction {
  currentUserId: string
  friendEmail: string
}

interface AddRelationshipFunction {
  token: string
  currentUserId: string
  friendEmail: string
}

interface BlockRelationshipData {
  token: string
  currentUserId: string
  relationshipId: number
  status: Status
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
export async function addFriend({
  token,
  currentUserId,
  friendEmail,
}: AddRelationshipFunction): Promise<Friend> {
  const response = await request
    .post(`${rootURL}/relationships`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      currentUserId: currentUserId,
      friendEmail: friendEmail,
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
    .delete(`${rootURL}/relationships/decline`)
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
  currentUserId,
  status,
}: BlockRelationshipData): Promise<boolean> {
  const response = await request
    .patch(`${rootURL}/relationships/block`)
    .set('Authorization', `Bearer ${token}`)
    .send({ relationshipId, status, currentUserId })
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
    .patch(`${rootURL}/relationships/unblock`)
    .set('Authorization', `Bearer ${token}`)
    .send({ relationshipId })
    .catch(() => {
      throw new Error('Unable to unblock. Please try again later')
    })
  return response.body as boolean
}

export async function acceptFriendRequest({
  token,
  relationshipId,
}: MutateRelationshipData): Promise<boolean> {
  const response = await request
    .patch(`${rootURL}/relationships/accept`)
    .set('Authorization', `Bearer ${token}`)
    .send({ relationshipId })
    .catch(() => {
      throw new Error('Unable accept friend request. Please try again later')
    })
  return response.body as boolean
}
