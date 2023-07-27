//interfaces para el auth de la aplicacion
export interface Auth {
  id: number;
  name: string;
  empresa: string;
  userEmail: string;
  bureauName: string;
  accessToken: string;

}

export interface refreshToken {
  accessToken: string,
}
export interface UserLoginToken {
  email: string;
  password: string;
}
