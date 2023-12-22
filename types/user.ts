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
}