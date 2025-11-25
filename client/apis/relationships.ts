import request from 'superagent'
import { Friend } from '../../models/friend'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface DeleteRelationshipFunction {
  token: string
  currentUserId: string
  friendId: string
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
    `${rootURL}/relationships/${currentUserId}`,
  )
  return response.body as Friend[]
}
