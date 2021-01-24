import { IDBConnection, getDBConnection } from "./databaseQueries";

import { mdbconfiguration } from "../config/mariadbConfig";

// Get User Group Details
export async function getUserGroups(data: IDBConnection) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows = await conn.query("SELECT VERSION()");

    // * List of supported versions: https://mariadb.com/kb/en/mariadb-server/ (10.2 until 2022)
    if (rows[0]["VERSION()"] !== undefined || rows[0]["VERSION()"] !== null) {
      const dbfullversion: string = rows[0]["VERSION()"];
      const dbVersionStr: string = dbfullversion[3];
      var dbVersionNumber: number = +dbVersionStr;

      // ! 1 => Version is up to date
      if (dbVersionNumber > mdbconfiguration.latestSupportedVersion) {
        conn.end();
        return true;
      } else {
        // ! 0 => Version is not up to date
        conn.end();
        return false;
      }
    }
  } catch (err) {
    throw err;
  }
}
