import request from 'superagent'
import { User, UserData } from '../../models/user'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface AddUserFunction {
  user: UserData
  token: string
}
interface EditUserFunction {
  token: string
  formData: FormData
}

export async function getUserById(id: string): Promise<User | undefined> {
  const response = await request.get(`${rootURL}/users/${id}`)
  return response.body as User | undefined
}

export async function checkIfUsernameTaken(
  id: string,
  username: string,
): Promise<boolean> {
  const response = await request.get(`${rootURL}/users/${id}/${username}`)
  return response.body as boolean
}

export async function validateUser({
  user,
  token,
}: AddUserFunction): Promise<User> {
  return request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .then((res) => res.body)
}

export async function editUser({
  token,
  formData,
}: EditUserFunction): Promise<User> {
  const response = await request
    .patch(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(formData)
  return response.body
}

export async function checkUsernameUsed(username: string): Promise<boolean> {
  const response = await request.get(
    `${rootURL}/users/usernamecheck/${username}`,
  )
  return response.body
}

export async function checkUsernameUsed(username: string): Promise<boolean> {
  const response = await request.get(
    `${rootURL}/users/usernamecheck/${username}`,
  )
  return response.body
}
