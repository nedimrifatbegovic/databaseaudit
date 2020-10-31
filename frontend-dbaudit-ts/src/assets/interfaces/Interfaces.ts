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

// -- Redux ---
export interface IUserState {
  email: string;
  password: string;
  type: string;
  status: boolean;
}

export interface IUserAction {
  user: IUserState;
  type: string;
}

export interface IUserCall {
  email: string;
  password: string;
  type: string;
}

// -- Login Api --
export interface IData {
  email: string;
  password: string;
  type: string;
}

export interface ILogin {
  type: string;
}
