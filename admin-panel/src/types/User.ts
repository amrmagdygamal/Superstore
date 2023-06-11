export type User = {
  _id: string
  username: string
  email: string
  token: string
  role: string
}


export interface LoginData {
  email: string;
  password: string;
}