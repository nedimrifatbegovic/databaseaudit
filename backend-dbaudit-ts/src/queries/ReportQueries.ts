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
import { getConnection } from "typeorm";

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
        configData.userid
      );
      if (passwordCheckResult === undefined) {
        // TODO: Handle
      }
    } else {
      // TODO: * Handle undefined users
      console.log("Handle undefined users");
    }

    // * ---- Jira Part ----
    // TODO: Check Interuptions
    // TODO: Check Backups
    // TODO: Check Restoration
    // TODO: Check Changes

    // * ---- Generating Balanced Scorecards & Report Structure ----
    // TODO: Collect Proof & Format
    // TODO: Generate Balanced Scorecard
    // TODO: Return Report
  }
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
