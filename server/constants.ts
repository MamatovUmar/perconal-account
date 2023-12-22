import type { IUser } from '~/types/user';

export const users: IUser[] = [
  {
    username: 'admin',
    password: 'admin',
    firstname: 'Umar',
    lastname: 'Mamatov',
    birthdate: '18.01.1992',
    city: 'Samarkand',
    token: '098f6bcd4621d373cade4e832627b4f6'
  }
]

export const cities: string[] = [
  'Samarkand',
  'Tashkent',
  'Buxara'
]