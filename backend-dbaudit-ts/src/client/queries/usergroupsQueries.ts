import { IDBConnection, getDBConnection } from "./databaseQueries";

// Defines the user groups interface
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

// Get User Group Details
export async function getUserGroups(data: IDBConnection, usergroups: string) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows: IUserGroups[] = await conn.query("SELECT * FROM " + usergroups);

    if (rows === undefined) {
      return undefined;
    } else {
      return rows;
    }

    // * List of supported versions: https://mariadb.com/kb/en/mariadb-server/ (10.2 until 2022)
    // if (rows[0]["VERSION()"] !== undefined || rows[0]["VERSION()"] !== null) {
    //   const dbfullversion: string = rows[0]["VERSION()"];
    //   const dbVersionStr: string = dbfullversion[3];
    //   var dbVersionNumber: number = +dbVersionStr;

    //   // ! 1 => Version is up to date
    //   if (dbVersionNumber > mdbconfiguration.latestSupportedVersion) {
    //     conn.end();
    //     return true;
    //   } else {
    //     // ! 0 => Version is not up to date
    //     conn.end();
    //     return false;
    //   }
    // }
  } catch (err) {
    throw err;
  }
}
