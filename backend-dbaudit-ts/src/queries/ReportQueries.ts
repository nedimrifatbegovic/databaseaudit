import { getDBVersion } from "../client/queries/databaseQueries";

export async function generateReport() {
  // TODO: Get Client ID & Data from the Database
  // Check Database Version
  const dbVersion: any = await getDBVersion();
  console.log("Version: ", dbVersion);
  // TODO: Check User Groups
  // TODO: Check Password
  // TODO: Check Interuptions
  // TODO: Check Backups
  // TODO: Check Restoration
  // TODO: Check Changes
  // TODO: Collect Proof & Format
  // TODO: Generate Balanced Scorecard
  // TODO: Return Report
}
