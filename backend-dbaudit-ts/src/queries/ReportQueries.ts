import {
  ICheckUserGroupsStatus,
  IError,
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

import { Config } from "../entity/Config";
import { InternalAuditor } from "../entity/InternalAuditor";
import atob from "atob";
import { getConnection } from "typeorm";
import { getLogs } from "../client/queries/logsQueries";
import request from "request";

export async function generateReport(email: string) {
  // * Get Client ID & Data from the Database
  const configData: Config | undefined = await getCredentialsInternalAuditor(
    email
  );
  if (configData === undefined) {
    // * Handle wrong email | no config found
    return undefined;
  } else {
    // console.log(configData);
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
    // TODO: * Handle undefined version
    // * Check User Groups
    // * Are any user groups defined?
    const userGroups: any[] | undefined = await getUserGroups(
      data,
      configData.usergroups
    );

    // * Get all Users
    const users: any[] | undefined = await getUsers(data, configData.user);

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
        // TODO: ERROR - WRONG FIELD VALUE
        console.log("Handle if wrong field in the database");
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
        // TODO: Handle
      }
    } else {
      // TODO: * Handle undefined users
      console.log("Handle undefined users");
    }

    // * ---- Jira Part ----
    // * Get Logs
    const logs = await getLogs(data, configData.logs);

    // * Format private key
    const pkey = configData.privateKey;
    var file = dataURLtoFile(pkey);
    let privateKeyData = file;
    const oauth = {
      consumer_key: "dbauditkey", //Your consumer key
      consumer_secret: privateKeyData, //This will contain the private key.
      token: "eBxh3fiuLRWgQuFSt9NI4ymwCB9hISym", //Enter your OAuth access token here
      token_secret: "d3j911c1DzUNzdMhc3B4Oa0wvO3rHYRQ", //Enter your OAuth token secret here
      signature_method: "RSA-SHA1",
    };

    request.get(
      {
        url: "http://localhost:8080/rest/api/latest/issue/RES-2",
        oauth: oauth,
        qs: null,
        json: true,
      },
      function (e, r, user) {
        console.log(user.fields);
      }
    );
    // TODO: * Check Errors

    // TODO: * Check Changes

    // TODO: * Check Backups

    // TODO: * Check Restoration

    // * ---- Generating Balanced Scorecards & Report Structure ----
    // TODO: Collect Proof & Format
    // TODO: Generate Balanced Scorecard
    // TODO: Return Report
  }
}

// * Convert Base64 to File
// ! Source on how to convert base64 to file: https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
function dataURLtoFile(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
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
