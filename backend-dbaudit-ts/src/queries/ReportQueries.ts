import {
  IDBConnection,
  IDBVersion,
  getDBVersion,
} from "../client/queries/databaseQueries";

import { Config } from "../entity/Config";
import { InternalAuditor } from "../entity/InternalAuditor";
import { getConnection } from "typeorm";

export async function generateReport() {
  // Get Client ID & Data from the Database
  const configData: Config | undefined = await getCredentialsInternalAuditor(
    "beclija@outlook.de"
  );
  if (configData === undefined) {
    // Handle wrong email | no config found
    return undefined;
  } else {
    console.log(configData);
    const dbhost: string = configData.dbHost;
    const dbportString: string = configData.dbPort;
    const dbport: number = +dbportString;
    const dbuser: string = configData.dbUsername;
    const dbpassword: string = configData.dbPassword;
    const dbdatabase: string = "dbauditcompanyexample";

    // Check Database Version
    const data: IDBConnection = {
      host: dbhost,
      port: dbport,
      user: dbuser,
      password: dbpassword,
      database: dbdatabase,
    };
    const dbVersion: IDBVersion = await getDBVersion(data);
    console.log("Version: ", dbVersion);
    // TODO: Check User Groups
    // * Are any user groups defined?
    // * If yes, are all users classified?
    // TODO: Check Password
    // TODO: Check Interuptions
    // TODO: Check Backups
    // TODO: Check Restoration
    // TODO: Check Changes
    // TODO: Collect Proof & Format
    // TODO: Generate Balanced Scorecard
    // TODO: Return Report
  }
}

// Get report configuration
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
