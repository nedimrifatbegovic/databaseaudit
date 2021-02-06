import {
  ICheckUserGroupsStatus,
  checkUserGroupsStatus,
  getUserGroups,
} from "../client/queries/usergroupsQueries";
import {
  IDBConnection,
  IDBVersion,
  getDBVersion,
} from "../client/queries/databaseQueries";
import {
  IPasswordCheck,
  checkPassword,
  getUsers,
} from "../client/queries/userQueries";
import {
  ITicketSystemReply,
  checkTSTickets,
  getLogs,
} from "../client/queries/logsQueries";

import { Config } from "../entity/Config";
import { InternalAuditor } from "../entity/InternalAuditor";
import atob from "atob";
import { errorLevel } from "../client/config/mariadbConfig";
import { getConnection } from "typeorm";

export interface IERROR {
  level?: string;
  errordescription?: string;
}

export interface IBalancedScorecard {
  dbversion: IERROR | IDBVersion;
  usergroups: IERROR | any[];
  users: IERROR | any[];
  passwords: IERROR | IPasswordCheck[];
  ticketsystem: ITicketSystemReply[];
}

export async function generateReport(email: string) {
  // * Get Client ID & Data from the Database
  const configData: Config | undefined = await getCredentialsInternalAuditor(
    email
  );
  if (configData === undefined) {
    // * Handle wrong email | no config found
    return undefined;
  } else {
    const dbhost: string = configData.dbHost;
    const dbportString: string = configData.dbPort;
    const dbport: number = +dbportString;
    const dbuser: string = configData.dbUsername;
    const dbpassword: string = configData.dbPassword;
    const dbdatabase: string = configData.dbName;

    // * Check Database Version
    const data: IDBConnection = {
      host: dbhost,
      port: dbport,
      user: dbuser,
      password: dbpassword,
      database: dbdatabase,
    };

    const dbVersion: IDBVersion | undefined = await getDBVersion(data);

    // * Balanced Scorecards Input: Database Version formated in JSON
    let dbVersionJSON: IERROR | IDBVersion = {};

    if (dbVersion === undefined) {
      // * Handle undefined version
      dbVersionJSON = {
        errordescription: "Database version not found",
        level: errorLevel.HIGH,
      };
    } else {
      dbVersionJSON = dbVersion;
    }

    // * Check User Groups
    // * Are any user groups defined?
    const userGroups: any[] | undefined = await getUserGroups(
      data,
      configData.usergroups
    );

    // * Balanced Scorecards Input: Database Version formated in JSON
    let userGroupsJSON: IERROR | any[] = {};
    if (userGroups === undefined) {
      userGroupsJSON = {
        errordescription: "User groups not found",
        level: errorLevel.HIGH,
      };
    } else {
      userGroupsJSON = userGroups;
    }

    // * Get all Users
    const users: any[] | undefined = await getUsers(data, configData.user);

    // * Balanced Scorecards Input: Users formated in JSON
    let usersJSON: IERROR = {};
    // * Balanced Scorecards Input: Users formated in JSON
    let userspasswordsJSON: IERROR | IPasswordCheck[] = {};

    if (users !== undefined) {
      // * If yes, are all users classified?
      const userGroupsReply:
        | ICheckUserGroupsStatus
        | undefined = await checkUserGroupsStatus(
        userGroups,
        users,
        configData.title,
        configData.usergroupsgroupid,
        configData.userid
      );
      if (userGroupsReply === undefined) {
        // * ERROR - WRONG FIELD VALUE
        usersJSON = {
          errordescription:
            "Users: Wrong field value in the database. Could not check if users are added to user groups.",
          level: errorLevel.HIGH,
        };
      }

      // * Check Password
      const passwordCheckResult:
        | IPasswordCheck[]
        | undefined = await checkPassword(
        users,
        configData.password,
        configData.userid,
        configData.firstname,
        configData.lastname
      );
      if (passwordCheckResult === undefined) {
        userspasswordsJSON = {
          errordescription: "Passwords not found",
          level: errorLevel.HIGH,
        };
      } else {
        userspasswordsJSON = passwordCheckResult;
      }
    } else {
      usersJSON = {
        errordescription: "Users not found",
        level: errorLevel.HIGH,
      };
    }

    // * ---- Jira Part ----
    // * Get Logs
    const logs = await getLogs(data, configData.logs);

    // * Format private key
    const pkey = configData.privateKey;
    var file = dataURLtoFile(pkey);
    let privateKeyData = file;

    const oauth: IoAuth = {
      consumer_key: configData.consumerKey, //Your consumer key
      consumer_secret: privateKeyData, //This will contain the private key.
      token: configData.token, //Enter your OAuth access token here
      token_secret: configData.tokenSecret, //Enter your OAuth token secret here
      signature_method: configData.signatureMethod,
    };

    // * Check Errors, Changes, Backups, Restoration
    const jiraLink = configData.jiraUrl + ":" + configData.jiraPort + "/";
    const TSTickets: ITicketSystemReply[] = await checkTSTickets(
      logs,
      configData.logsid,
      configData.projectkey,
      configData.ticketkey,
      configData.logstype,
      configData.errorProjectKey,
      configData.backupProjectKey,
      configData.restorationProjectKey,
      oauth,
      jiraLink
    );

    // * ---- Generating Balanced Scorecards & Report Structure ----
    // * Collect Proof & Format & Generate Balanced Scorecard
    let balancedScorecards: IBalancedScorecard = {
      dbversion: dbVersionJSON,
      usergroups: userGroupsJSON,
      passwords: userspasswordsJSON,
      users: usersJSON,
      ticketsystem: TSTickets,
    };

    // * Return balancedScoredars JSON (raw data)
    // console.log(balancedScorecards);
    return balancedScorecards;
  }
}

// * Define oAuth interface
export interface IoAuth {
  consumer_key: string;
  consumer_secret: Uint8Array;
  token: string;
  token_secret: string;
  signature_method: string;
}

// * Convert Base64 to File
// ! Source on how to convert base64 to file: https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
function dataURLtoFile(dataurl) {
  var arr = dataurl.split(","),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return u8arr;
}

// * Get report configuration
// * Check internal auditor id (for email)
// * Search for config where internal auditor X is added
// * Return config data
export const getCredentialsInternalAuditor = async (email: string) => {
  const connection = getConnection();
  const internalRepository = connection.getRepository(InternalAuditor);
  console.log("__START__");
  const user = await internalRepository
    .createQueryBuilder("internal_auditor")
    .where("email = :email", { email: email })
    .getOne();
  console.log("__END__");

  const userid = user.internalAuditorId;
  if (userid !== undefined && userid !== null) {
    const configRepository = connection.getRepository(Config);
    console.log("__START__");
    const credentials = await configRepository
      .createQueryBuilder("config")
      .where(
        "internalAuditorInternalAuditorId = :internalAuditorInternalAuditorId",
        {
          internalAuditorInternalAuditorId: userid,
        }
      )
      .getOne();
    console.log("__END__");

    if (credentials !== undefined) {
      return credentials;
    } else {
      return credentials;
    }
  } else {
    return undefined;
  }
};
