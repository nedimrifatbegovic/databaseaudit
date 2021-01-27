import { IDBConnection, getDBConnection } from "./databaseQueries";

import { IUser } from "./userQueries";
import { errorLevel } from "../config/mariadbConfig";

// * Defines the user groups interface
export interface IUserGroups {
  GroupID: number;
  ReadRights: number;
  DeleteRights: number;
  CreateRights: number;
  UpdateRights: number;
  GroupName: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

// * Get User Group Details
export async function getUserGroups(data: IDBConnection, usergroups: string) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows: IUserGroups[] = await conn.query("SELECT * FROM " + usergroups);

    if (rows === undefined) {
      conn.end();
      return undefined;
    } else {
      conn.end();
      return rows;
    }
  } catch (err) {
    conn.end();
    throw err;
  }
}

// * Defines the error types for IERROR
export const ErrorWrongUserGroup: string = "WARNING: WRONG USER GROUP";
export const ErrorUserGroupNotFound: string = "ERROR: USER HAS NO USER GROUP";
export const ErrorNoUserGroups: string = "ERROR: NO USER GROUPS FOUND";

// * Defines the cases with an ERROR / WARNING / ISSUE needed for ICheckUserGroupsStatus
export interface IError {
  type: string;
  description?: string;
  level: string;
  userid: number | undefined;
}

// * Defines the interface for the checkUserGroupStatus reply JSON
export interface ICheckUserGroupsStatus {
  errors: IError[] | undefined;
  userGroups: IUserGroups[] | undefined;
}

// * Check if all users are assigned to a user group | if yes check if the user group corresponds with their position in the company | if no mark it in the reply
export async function checkUserGroupsStatus(
  usergroups: IUserGroups[] | undefined,
  users: IUser[]
) {
  const USERLen: number = users.length;
  let errors: IError[] = [];
  console.log("INITIAL ERRORS: ", errors);
  console.log("INITIAL ERRORS LEN: ", errors.length);

  if (usergroups !== undefined) {
    // * Case: With User Groups
    for (let i: number = 0; i < USERLen; i++) {
      // * If user user group ID !== null and !== undefined
      if (users[i].UserGroupID !== null && users[i].UserGroupID !== undefined) {
        // * As defined in the example
        // * 1 === Executive / Admin
        // * 2 === Senior
        // * 3 === Junior / Trainee
        if (users[i].UserGroupID === 1) {
          if (
            users[i].Title === "Executive" ||
            users[i].Title === "executive" ||
            users[i].Title === "admin" ||
            users[i].Title === "Admin"
          ) {
            // Do nothing, it is ok!
          } else {
            let newError: IError = {
              type: ErrorWrongUserGroup,
              description:
                "User has wrong user group. Current title: " + users[i].Title,
              level: errorLevel.HIGH,
              userid: users[i].UserID,
            };
            errors.push(newError);
          }
        } else if (users[i].UserGroupID === 2) {
          if (
            users[i].Title === "Senior Developer" ||
            users[i].Title === "Senior" ||
            users[i].Title === "Senior Associate" ||
            users[i].Title === "senior" ||
            users[i].Title === "senior developer" ||
            users[i].Title === "senior associate"
          ) {
            // Do nothing, it is ok!
          } else {
            let newError: IError = {
              type: ErrorWrongUserGroup,
              description:
                "User has wrong user group. Current title: " + users[i].Title,
              level: errorLevel.MID,
              userid: users[i].UserID,
            };
            errors.push(newError);
          }
        } else if (users[i].UserGroupID === 3) {
          if (
            users[i].Title === "Junior Developer" ||
            users[i].Title === "Junior" ||
            users[i].Title === "Junior Associate" ||
            users[i].Title === "junior" ||
            users[i].Title === "junior developer" ||
            users[i].Title === "junior associate" ||
            users[i].Title === "Trainee" ||
            users[i].Title === "trainee"
          ) {
            // Do nothing, it is ok!
          } else {
            let newError: IError = {
              type: ErrorWrongUserGroup,
              description:
                "User has wrong user group. Current title: " + users[i].Title,
              level: errorLevel.LOW,
              userid: users[i].UserID,
            };
            errors.push(newError);
          }
        }
      } else {
        let newError: IError = {
          type: ErrorUserGroupNotFound,
          level: errorLevel.HIGH,
          userid: users[i].UserID,
        };
        errors.push(newError);
      }
      // * If user user group ID corresponds with user user title | 3 levels as example | 1 => Executive / Admin | 2 => Senior | 3 => Junior / Trainee
      // * Catch errors
    }
    return errors;
  } else {
    // * Case: No User Groups
    let reply: ICheckUserGroupsStatus = {
      errors: [
        {
          type: ErrorNoUserGroups,
          level: errorLevel.HIGH,
          userid: undefined,
        },
      ],
      userGroups: undefined,
    };

    return reply;
  }
}
