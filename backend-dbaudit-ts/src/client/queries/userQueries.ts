import { IDBConnection, getDBConnection } from "./databaseQueries";

// Interface for Users
export interface IUser {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  UserGroupID: number;
  Title: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

// Get User Group Details
export async function getUsers(data: IDBConnection, user: string) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows: IUser[] | undefined = await conn.query("SELECT * FROM " + user);

    if (rows !== undefined || rows !== null) {
      conn.end();
      return rows;
    } else {
      conn.end();
      return undefined;
    }
  } catch (err) {
    conn.end();
    throw err;
  }
}
