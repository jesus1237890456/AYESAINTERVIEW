//interfaces de usuario
export interface User {
 userFullName?: string;
 name: string;
 last_name: string;
 id?: number;
 mail: string;
 dni: string;
 password?: string;
}
export interface Users {
 user:User[]
 }
 export interface UserOne {
  user:User
  }
 
