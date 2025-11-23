import request from 'superagent'

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
  return response.body as boolean
}
