export interface LogginInterface {
  userEmail: string
  userPassword: string
}

export interface CreateNewUserInterface {
  userId: string
  userIdTipe: string
  userName: string
  userLastname: string
  userPhoneNumber: string
  userEmail: string
  userPassword: string
  roleId: number
}
