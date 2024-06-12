export type User = {
  username: string;
  email: string;
  password: string;
}

export type RegisterUser = {
  confirmedPassword: string;
} & User;