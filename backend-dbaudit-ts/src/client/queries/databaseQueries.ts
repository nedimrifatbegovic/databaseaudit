import mariadb from "mariadb";
import { mdbconfiguration } from "../config/mariadbConfig";

// Connect to the remote DB interface
export interface IDBConnection {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

// Connect to the remote database
export async function getDBConnection(data: IDBConnection) {
  const pool = mariadb.createPool({
    host: data.host,
    port: data.port,
    user: data.user,
    password: data.password,
    database: data.database,
    connectionLimit: mdbconfiguration.poolConnectionsLimit,
  });

  return pool;
}

//DEFINE THE INTERFACE FOR THE REPLY (DB VERSION)
export interface IDBVersion {
  version: string;
  status: boolean;
}

// Check database version
export async function getDBVersion(data: IDBConnection) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows = await conn.query("SELECT VERSION()");
    let replay: IDBVersion = {
      version: "",
      status: false,
    };
    // * List of supported versions: https://mariadb.com/kb/en/mariadb-server/ (10.2 until 2022)
    if (rows[0]["VERSION()"] !== undefined || rows[0]["VERSION()"] !== null) {
      const dbfullversion: string = rows[0]["VERSION()"];
      const dbVersionStr: string = dbfullversion[3];
      var dbVersionNumber: number = +dbVersionStr;

      // ! 1 => Version is up to date
      if (dbVersionNumber > mdbconfiguration.latestSupportedVersion) {
        conn.end();
        replay = {
          version: dbfullversion,
          status: true,
        };
        return replay;
      } else {
        // ! 0 => Version is not up to date
        conn.end();
        replay = {
          version: dbfullversion,
          status: false,
        };
        return replay;
      }
    } else {
      return undefined;
    }
  } catch (err) {
    throw err;
  }
}
