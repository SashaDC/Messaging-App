import request from 'superagent'
import { User, UserData } from '../../models/user'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface AddUserFunction {
  user: UserData
  token: string
}
interface EditUserFunction {
  updatedUser: User
  token: string
}

export async function getUserById(id: string): Promise<User | undefined> {
  const response = await request.get(`${rootURL}/users/${id}`)
  return response.body as User | undefined
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
  updatedUser,
  token,
}: EditUserFunction): Promise<User> {
  return request
    .patch(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(updatedUser)
    .then((res) => res.body)
}
