import db from './connection.ts'

export async function checkIfUserExist(authID : string) {
    const check = await db('users').where('auth_id' , )
}