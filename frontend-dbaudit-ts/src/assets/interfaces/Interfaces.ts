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
  folderId?: string;
}

export interface IExistingUser {
  usertype: string;
  userdetails: ExistingUserDetails;
}

// Update User - Admin
export interface UpdateUserNewValue {
  chosenAttribute: string;
  newValue: string;
}

export interface UpdateUserApiInput {
  email: string;
  userType: string;
  newValue: UpdateUserNewValue;
}

// -- Redux ---
export interface IExistingUser {
  existinguser: ExistingUser;
  type: string;
}

export interface IREDUX {
  user: IUserState;
  existinguser: IExistingUser;
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
