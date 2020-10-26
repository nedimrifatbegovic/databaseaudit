export interface LoginData {
  email: string;
  password: string;
}

export interface NewUser {
  email: string;
  password: string;
  companyname: string;
  type: string;
}

export interface ExistingUser {
  email: string;
  type: string;
}
