import {
  IDBConnection,
  IDBVersion,
  getDBVersion,
} from "../client/queries/databaseQueries";
import { IUser, getUsers } from "../client/queries/userQueries";
import {
  IUserGroups,
  getUserGroups,
} from "../client/queries/usergroupsQueries";

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
    // console.log("Version: ", dbVersion);
    // TODO: * Handle undefined version
    // * Check User Groups
    // * Are any user groups defined?
    const userGroups: IUserGroups[] | undefined = await getUserGroups(
      data,
      configData.usergroups
    );
    // console.log("User Groups: ", userGroups);
    // * Get all Users
    const users: IUser[] | undefined = await getUsers(data, configData.user);
    // console.log("Users: ", users);
    if (users !== undefined) {
      // TODO: * If yes, are all users classified?
      if (userGroups !== undefined) {
        console.log("Check users with user group");
      }
      // TODO: * If no, handle undefined
      else {
        console.log("Check users without user group");
      }

      // TODO: Check Password
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
