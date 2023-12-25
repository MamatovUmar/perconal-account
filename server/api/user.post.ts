import { users } from '~/server/constants';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cookies = parseCookies(event)
  const user = users.find(item => item.token === cookies?.token)

  if (user) {
    user.firstname = body.firstname
    user.lastname = body.lastname
    user.birthdate = body.birthdate
    user.city = body.city
    return user
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
})
