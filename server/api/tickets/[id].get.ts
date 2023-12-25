import { users, tickets } from '~/server/constants';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)
  const user = users.find(item => item.token === cookies?.token)
  const id = Number(getRouterParam(event, 'id'))
  const ticket = tickets.find(el => el.id === id)

  if (user && ticket) {
    return {
      ...ticket,
      userName: `${user.firstname} ${user.lastname}`
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
})
