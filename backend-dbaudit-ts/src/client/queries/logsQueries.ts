import { IDBConnection, getDBConnection } from "./databaseQueries";

import { errorLevel } from "../config/mariadbConfig";

// * Get Logs
export async function getLogs(data: IDBConnection, logs: string) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows: any[] | undefined = await conn.query("SELECT * FROM " + logs);

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

// * Ticket System - Comment
export interface ITSComments {
  text: string;
  author: string;
}

// * Ticket System - Issue - Reply
export interface ITicketSystemReply {
  ticketStatus?: string;
  ticketDescription?: string;
  ticketComments?: ITSComments[] | undefined;
  level?: string;
  errordescription?: string;
  logid: number;
}

// * Check Interuptions
export async function checkTSErrors(
  logs: any[],
  logsId: string,
  logsProjectkey: string,
  logsTicketkey: string,
  logsType: string,
  errorProjectKey: string,
  jiraurl: string,
  jiraport: number,
  consumerkey: string,
  token: string,
  tokensecret: string,
  signatureMethod: string,
  privatekey: string
) {
  let response: ITicketSystemReply[] = [];

  for (let i: number = 0; i < logs.length; i++) {
    // * Check if fields undefined
    if (
      logs[i][logsId] === undefined ||
      logs[i][logsProjectkey] === undefined ||
      logs[i][logsTicketkey] === undefined ||
      logs[i][logsType] === undefined ||
      logs[i][errorProjectKey] === undefined
    ) {
      // * Format response for Error Types
      const errormsg: ITicketSystemReply = {
        logid: logs[0][logsId],
        level: errorLevel.MID,
        errordescription: "FIELDS UNDEFINED",
      };
      response.push(errormsg);
    }

    // TODO: * Get Issues from Ticket System for -ERROR- Type
    // TODO: * Check if all logs have been documented
  }
}
