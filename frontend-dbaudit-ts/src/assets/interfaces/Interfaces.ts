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
  privatekeybase64: string | unknown;
  internalMail: string;
}

export interface IUpdateForm {
  updatetype: string;
  updatevalue?: string;
  updateprivatekey?: FileList;
}

export interface INewConfig {
  privatekey: FileList;
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

export interface IAPIUpdateConfig {
  email: string;
  attributeName: string;
  attributeValue: string | unknown;
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

// * Report interfaces
// -- Balanced Scorecards --
export interface IBalancedScorecard {
  dbversion: IERROR | IDBVersion;
  usergroups: IERROR | any[];
  usergroupscheck: ICheckUserGroupsStatus | undefined;
  users: IERROR | any[];
  passwords: IERROR | IPasswordCheck[];
  ticketsystem: ITicketSystemReply[];
}

// -- User Groups Reply (issues) --
export interface ICheckUserGroupsStatus {
  errors: IERROR[] | undefined;
  userGroups: any[] | undefined;
}
// -- Error Interface --
export interface IERROR {
  level?: string;
  errordescription?: string;
}

// -- Password Check Interface --
export interface IPasswordCheck {
  result?: boolean;
  error?: string;
  userid?: number;
  level?: string;
}

// -- Database Version Interface --
export interface IDBVersion {
  version: string;
  status: boolean;
}

// -- Ticket System Reply Interface --
export interface ITicketSystemReply {
  ticketStatus?: string;
  ticketDescription?: string;
  ticketComments?: ITSComments[];
  level?: string;
  errordescription?: string;
  logid: number;
  assignee?: string;
}

// -- Ticket System - Comments Interface --
export interface ITSComments {
  text?: string;
  author?: string;
}

// -- User Groups Interface --
export interface IUserGroups {
  GroupName: string;
}
