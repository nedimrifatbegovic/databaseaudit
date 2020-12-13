export interface LoginData {
  email: string;
  password: string;
}

// -- Existing User Details
export interface ExistingUser {
  email: string;
  type: string;
}

export interface ExistingUserDetails {
  email: string;
  password: string;
  companyName: string;
  /* Only for internal users */
  folderid?: string;
}

// -- Redux ---
export interface IExistingUser {
  existinguser: ExistingUser;
  type: string;
}

export interface IREDUX {
  user: IUserState;
  existinguser: ExistingUser;
}

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

// -- Add User Api --
export interface IAddUser {
  email: string;
  password: string;
  type: string;
  companyname: string;
}
