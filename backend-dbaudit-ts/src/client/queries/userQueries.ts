import { IDBConnection, getDBConnection } from "./databaseQueries";

// Get User Group Details
export async function getUsers(data: IDBConnection, user: string) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows: any[] | undefined = await conn.query("SELECT * FROM " + user);

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
