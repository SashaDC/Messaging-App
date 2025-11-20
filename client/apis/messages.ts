import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function deleteMessage(messageID: number, friendshipID: number): Promise<void> {
  (await request.delete(`${rootURL}/messages/${friendshipID}/${messageID}`))
}