import { users, tickets } from '~/server/constants';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const user = users.find(item => item.token === cookies?.token)

  if (user) {
    return tickets
      .filter(el => el.userId === user.id)
      .map(el => ({...el, username: `${user.firstname} ${user.lastname}`}))
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
})
