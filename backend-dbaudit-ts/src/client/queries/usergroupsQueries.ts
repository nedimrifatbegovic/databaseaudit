import { IDBConnection, getDBConnection } from "./databaseQueries";

import { errorLevel } from "../config/mariadbConfig";

// * Get User Group Details
export async function getUserGroups(data: IDBConnection, usergroups: string) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows: any = await conn.query("SELECT * FROM " + usergroups);
    console.log(rows);
    if (rows === undefined) {
      conn.end();
      return undefined;
    } else {
      conn.end();
      return rows;
    }
  } catch (err) {
    conn.end();
    // throw err;
    return undefined;
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
  userGroups: any[] | undefined;
}

// * Check if all users are assigned to a user group | if yes check if the user group corresponds with their position in the company | if no mark it in the reply
export async function checkUserGroupsStatus(
  usergroups: any[] | undefined,
  users: any[],
  usersTitle: string,
  usersUserGroupID: string,
  usersUserID: string
) {
  const USERLen: number = users.length;
  let errors: IError[] = [];
  if (
    users[0][usersTitle] === undefined ||
    users[0][usersUserGroupID] === undefined ||
    users[0][usersUserID] === undefined
  ) {
    return undefined;
  }

  if (usergroups !== undefined) {
    // * Case: With User Groups
    for (let i: number = 0; i < USERLen; i++) {
      // * If user user group ID !== null and !== undefined
      if (
        users[i][usersUserGroupID] !== null &&
        users[i][usersUserGroupID] !== undefined
      ) {
        // * As defined in the example
        // * 1 === Executive / Admin
        // * 2 === Senior
        // * 3 === Junior / Trainee
        if (users[i][usersUserGroupID] === 1) {
          if (
            users[i][usersTitle] === "Executive" ||
            users[i][usersTitle] === "executive" ||
            users[i][usersTitle] === "admin" ||
            users[i][usersTitle] === "Admin"
          ) {
            // Do nothing, it is ok!
          } else {
            let newError: IError = {
              type: ErrorWrongUserGroup,
              description:
                "User has wrong user group. Current title: " +
                users[i][usersTitle],
              level: errorLevel.HIGH,
              userid: users[i][usersUserID],
            };
            errors.push(newError);
          }
        } else if (users[i][usersUserGroupID] === 2) {
          if (
            users[i][usersTitle] === "Senior Developer" ||
            users[i][usersTitle] === "Senior" ||
            users[i][usersTitle] === "Senior Associate" ||
            users[i][usersTitle] === "senior" ||
            users[i][usersTitle] === "senior developer" ||
            users[i][usersTitle] === "senior associate"
          ) {
            // Do nothing, it is ok!
          } else {
            let newError: IError = {
              type: ErrorWrongUserGroup,
              description:
                "User has wrong user group. Current title: " +
                users[i][usersTitle],
              level: errorLevel.MID,
              userid: users[i][usersUserID],
            };
            errors.push(newError);
          }
        } else if (users[i][usersUserGroupID] === 3) {
          if (
            users[i][usersTitle] === "Junior Developer" ||
            users[i][usersTitle] === "Junior" ||
            users[i][usersTitle] === "Junior Associate" ||
            users[i][usersTitle] === "junior" ||
            users[i][usersTitle] === "junior developer" ||
            users[i][usersTitle] === "junior associate" ||
            users[i][usersTitle] === "Trainee" ||
            users[i][usersTitle] === "trainee"
          ) {
            // Do nothing, it is ok!
          } else {
            let newError: IError = {
              type: ErrorWrongUserGroup,
              description:
                "User has wrong user group. Current title: " +
                users[i][usersTitle],
              level: errorLevel.LOW,
              userid: users[i][usersUserID],
            };
            errors.push(newError);
          }
        }
      } else {
        let newError: IError = {
          type: ErrorUserGroupNotFound,
          level: errorLevel.HIGH,
          userid: users[i][usersUserID],
        };
        errors.push(newError);
      }
      // * If user user group ID corresponds with user user title | 3 levels as example | 1 => Executive / Admin | 2 => Senior | 3 => Junior / Trainee
      // * Catch errors
    }

    let reply: ICheckUserGroupsStatus = {
      errors: errors,
      userGroups: usergroups,
    };
    return reply;
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
