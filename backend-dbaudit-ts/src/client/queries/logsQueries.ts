import { IDBConnection, getDBConnection } from "./databaseQueries";

import { IoAuth } from "../../queries/ReportQueries";
import { errorLevel } from "../config/mariadbConfig";
import { getTicket } from "../apis/jira";

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
  text?: string;
  author?: string;
}

// * Ticket System - Issue - Reply
export interface ITicketSystemReply {
  ticketStatus?: string;
  ticketDescription?: string;
  ticketComments?: ITSComments[];
  level?: string;
  errordescription?: string;
  logid: number;
  assignee?: string;
  errortype?: "INTERUPTION" | "BACKUP/RESTORATION" | "CHANGES" | "ALL";
}

// * Check Errors, Changes, Backups, Restoration
export async function checkTSTickets(
  logs: any[],
  logsId: string,
  logsProjectkey: string,
  logsTicketkey: string,
  logsType: string,
  errorProjectKey: string,
  backupProjectKey: string,
  restorationProjectKey: string,
  changeProjectKey: string,
  oauth: IoAuth,
  jiraLink: string
) {
  let response: ITicketSystemReply[] = [];
  let commentsArray: ITSComments[] = [];

  for (let i: number = 0; i < logs.length; i++) {
    if (oauth === undefined) {
      //* Handle oAuth undefined
      const errormsg: ITicketSystemReply = {
        logid: logs[i][logsId],
        level: errorLevel.HIGH,
        errordescription: "OAUTH UNDEFINED",
        errortype: "ALL",
      };
      response.push(errormsg);
    }
    // * Check if fields undefined
    else if (
      logs[i][logsId] === undefined ||
      logs[i][logsProjectkey] === undefined ||
      logs[i][logsTicketkey] === undefined ||
      logs[i][logsType] === undefined
    ) {
      // * Format response for specific Types
      const errormsg: ITicketSystemReply = {
        logid: logs[i][logsId],
        level: errorLevel.MID,
        errordescription: "FIELDS UNDEFINED (LOGS)",
        errortype: undefined,
      };
      response.push(errormsg);
    } else {
      // * Get Issues from Ticket System for specific Type
      const link: string =
        jiraLink + "rest/api/latest/issue/" + logs[i][logsTicketkey];
      const tsTicket = await getTicket(link, oauth);

      // * Check if ticket has been found | if log has been documented in the TS
      let errortypemsg:
        | "INTERUPTION"
        | "BACKUP/RESTORATION"
        | "CHANGES"
        | "ALL"
        | undefined;
      if (tsTicket["fields"] === undefined) {
        let errorlevelmsg: string = errorLevel.LOW;
        if (logs[i][logsProjectkey] === errorProjectKey) {
          errorlevelmsg = errorLevel.HIGH;
          errortypemsg = "INTERUPTION";
        } else if (
          logs[i][logsProjectkey] === restorationProjectKey ||
          logs[i][logsProjectkey] === backupProjectKey
        ) {
          errorlevelmsg = errorLevel.MID;
          errortypemsg = "BACKUP/RESTORATION";
        } else if (logs[i][logsProjectkey] === changeProjectKey) {
          errorlevelmsg = errorLevel.MID;
          errortypemsg = "CHANGES";
        }

        const errormsg: ITicketSystemReply = {
          logid: logs[i][logsId],
          level: errorlevelmsg,
          errordescription: "TICKET NOT DOCUMENTED",
          errortype: errortypemsg,
        };
        response.push(errormsg);
      } else {
        const fields = tsTicket["fields"];
        // * Check if ticket has comments
        if (fields["comment"].total === 0) {
          // * No Comments have been found
        } else {
          for (let i = 0; i < fields["comment"]["comments"].length; i++) {
            let commentInput: ITSComments = {
              text: fields["comment"]["comments"][i]["body"],
              author: fields["comment"]["comments"][i]["author"]["name"],
            };
            commentsArray.push(commentInput);
          }
        }
        // * Check status of the ticket
        const ticketStatus = fields.status.name;
        // * Check the assignee of the ticket
        let assignee: undefined | string = undefined;
        if (
          fields.assignee === null ||
          fields.assignee === undefined ||
          fields.assignee.name === null
        ) {
          assignee = undefined;
        } else {
          assignee = fields.assignee.name;
        }

        const errormsg: ITicketSystemReply = {
          logid: logs[i][logsId],
          ticketComments: commentsArray,
          ticketStatus: ticketStatus,
        };
        response.push(errormsg);
      }
    }
  }

  return response;
}
