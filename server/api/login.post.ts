import { users } from '~/server/constants';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  const user = users.find(user => user.username === username && user.password === password)

  if (user) {
    return { token: user.token }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
})
