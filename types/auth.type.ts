import { User } from './user.type'

export type Credential = {
  accessToken: string
  refreshToken: string
}

export type Auth = {
  isAuthenticated: boolean
  user: string | null
  credential?: {
    accessToken: string | null
    refreshToken: string | null
  }
}

export type UserLogin = {
  accessToken: string
  refreshToken: string
  user: User
}
