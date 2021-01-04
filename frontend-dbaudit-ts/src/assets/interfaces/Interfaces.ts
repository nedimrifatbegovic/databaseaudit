export interface LoginData {
  email: string;
  password: string;
}

// -- Internal Audit User --
export interface IPasswordChange {
  email: string;
  newpassword: string;
}

export interface IPassword {
  newValue: string;
}

export interface IInternalConfig {
  email: string;
}

export interface INewConfigAPI {
  configdata: INewConfig;
  internalMail: string;
}

export interface INewConfig {
  privatekey: string;
  consumerkey: string;
  token: string;
  tokensecret: string;
  signaturemethod: string;
  jiraurl: string;
  jiraport: string;
  backup: string;
  restoration: string;
  error: string;
  change: string;
  dbtype: string;
  dbhost: string;
  dbport: string;
  dbusername: string;
  dbpassword: string;
  logs: string;
  logsid: string;
  projectkey: string;
  ticketkey: string;
  logstype: string;
  user: string;
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  usergroupid: string;
  title: string;
  usergroups: string;
  usergroupsgroupid: string;
  readrights: string;
  deleterights: string;
  createrights: string;
  updaterights: string;
  groupname: string;
}

export interface IUpdateConfig {
  email: string;
  attributeName: string;
  attributeValue: string;
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
