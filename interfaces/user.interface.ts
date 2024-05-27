export interface UserInterface {
  name: string
  lastName: string
  identificationType: string
  identificationNumber: string
  email: string
  password: string
  telephonePrefix: string
  telephoneNumber: string
  termsAndConditions: boolean
  privacyPolicy: boolean
}

export interface GetUserReponse {
  userId: string
  userIdTipe: string
  userName: string
  userLastname: string
  userPhoneNumber: string
  userEmail: string
  userPassword: string
  userRole: number
  enabled: boolean
  password: string
  username: string
  authorities: null
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
}

export const identificationTypes = [
  { value: "CC", label: "CC" },
  { value: "PA", label: "PA" },
  { value: "CE", label: "CE" },
  { value: "RC", label: "RC" },
]

export enum UserRoles {
  SUPER_USUARIO = 100,
  ADMINISTRADOR = 101,
  USUARIO_REGISTRADO = 102,
}
