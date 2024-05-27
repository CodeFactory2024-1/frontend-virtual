export interface JWTPayload {
  userId: string
  userIdType: string
  userName: string
  userLastname: string
  userPhoneNumber: string
  roleId: number
  sub: string
  iat: number
  exp: number
}
