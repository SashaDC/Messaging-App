import db from './connection.ts'

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
  // Knex does not throw an error if an item is not deleted. The response
  // is the number of rows that are deleted. Check both responses and see
  // if any rows were deleted. Return true if rows were deleted
  return response + response2 > 0
}
