// Documentation: https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/

import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "dbaudit",
  database: "dbauditcompanyexample",
  connectionLimit: 5,
});

export async function asyncFunction() {
  let conn: any;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM logs");
    console.log(rows[0]["ProjectKey"]); //[ {val: 1}, meta: ... ]
    console.log(rows.length);
    // const res = await conn.query("INSERT INTO myTable value (?, ?)", [
    //   1,
    //   "mariadb",
    // ]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}
