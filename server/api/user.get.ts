import { users } from '~/server/constants';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const user = users.find(item => item.token === cookies?.token)

  if (user) {
    return user
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
})
