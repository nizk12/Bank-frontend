import create from './http-service'

export type User = {
  _id: string,
  name: string,
  email: string,
  accountType: string,
  balance: number,
  gender: string,
  title: string,
  postCode: string,
  cob: string
  dob: string,
  phone: string,
  address: string
}

export default create('/users/me')
