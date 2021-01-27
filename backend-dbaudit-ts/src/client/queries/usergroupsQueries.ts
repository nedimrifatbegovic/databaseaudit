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
