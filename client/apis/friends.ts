import request from 'superagent'
import { Friend } from '../../models/friend'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface DeleteRelationshipFunction {
  token: string
  currentUserId: string
  friendId: string
}

interface AddRelationshipFunction {
  currentUserId: string
  friendEmail: string
}

export async function deleteRelationship({
  token,
  currentUserId,
  friendId,
}: DeleteRelationshipFunction): Promise<boolean> {
  const response = await request
    .delete(`${rootURL}/relationships/${currentUserId}/${friendId}`)
    .set('Authorization', `Bearer ${token}`)
    .catch(() => {
      throw new Error('Relationship not deleted')
    })
  return response.body as boolean
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

