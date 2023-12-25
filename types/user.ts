export interface IUserForm {
  firstname: string
  lastname: string
  birthdate: string
  city: string
}

export interface IUser extends IUserForm{
  username: string
  password: string
  token: string
  id: number
}

export interface ITicket {
  id: number
  title: string
  text: string
  createdAt: string
  userId: number
  userName?: string
}