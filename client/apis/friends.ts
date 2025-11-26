import request from 'superagent'
import { Friend } from '../../models/friend'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface DeleteRelationshipFunction {
  token: string
  relationshipId: number
}

interface AddRelationshipFunction {
  currentUserId: string
  friendEmail: string
}

interface EditRelationshipFunction {
  token: string
  relationshipId: number
  status?: string
  requestedBy?: string
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
  currentUserId,
  friendEmail,
}: AddRelationshipFunction): Promise<Friend> {
  const response = await request
    .post(`${rootURL}/relationships/${currentUserId}/${friendEmail}`)
    // .set('Authorization', `Bearer ${token}`)
    .catch(() => {
      throw new Error('Friend not added')
    })
  return response.body
}

//Deletes relationship only
export async function declineFriendRequest({
  token,
  relationshipId,
}: EditRelationshipFunction): Promise<boolean> {
  const response = await request
    .patch(`${rootURL}/relationships/decline`)
    .send({ relationshipId })
    .set('Authorization', `Bearer ${token}`)
    .catch(() => {
      throw new Error('Friendship not declined')
    })
  return response.body as boolean
}

//Deletes relationship and messages with relationship id
export async function deleteFriend({
  token,
  relationshipId,
}: DeleteRelationshipFunction): Promise<boolean> {
  const response = await request
    .delete(`${rootURL}/relationships/plus-messages`)
    .set('Authorization', `Bearer ${token}`)
    .send({ relationshipId })
    .catch(() => {
      throw new Error('Relationship not deleted')
    })
  return response.body as boolean
}
