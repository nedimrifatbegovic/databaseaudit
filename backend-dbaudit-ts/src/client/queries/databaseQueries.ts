import mariadb from "mariadb";
import { mdbconfiguration } from "../config/mariadbConfig";

// Connect to the remote database
export async function getDBConnection(
  host: string,
  port: number,
  user: string,
  password: string,
  database: string
) {
  const pool = mariadb.createPool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    connectionLimit: mdbconfiguration.poolConnectionsLimit,
  });

  return pool;
}

// Check database version
export async function getDBVersion() {
  let conn: any;
  try {
    conn = await getDBConnection(
      "127.0.0.1",
      3306,
      "root",
      "dbaudit",
      "dbauditcompanyexample"
    );
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
