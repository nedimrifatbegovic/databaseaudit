import {
  ICheckUserGroupsStatus,
  IUserGroupsNames,
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

import { Audit } from "../entity/Audit";
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
  usergroups: undefined | IUserGroupsNames[] | IERROR;
  usergroupscheck: ICheckUserGroupsStatus | undefined;
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
    const userGroups: IUserGroupsNames[] | undefined = await getUserGroups(
      data,
      configData.usergroups,
      configData.groupname
    );

    // * Balanced Scorecards Input: Database Version formated in JSON
    let userGroupsJSON: IERROR | IUserGroupsNames[] = {};
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
    let userGroupsReply: ICheckUserGroupsStatus | undefined;
    if (users !== undefined) {
      // * If yes, are all users classified?
      userGroupsReply = await checkUserGroupsStatus(
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
      configData.changeProjectKey,
      oauth,
      jiraLink
    );

    // * ---- Generating Balanced Scorecards & Report Structure ----
    // * Collect Proof & Format & Generate Balanced Scorecard
    let balancedScorecards: IBalancedScorecard = {
      dbversion: dbVersionJSON,
      usergroups: userGroupsJSON,
      usergroupscheck: userGroupsReply,
      passwords: userspasswordsJSON,
      users: usersJSON,
      ticketsystem: TSTickets,
    };

    const tableinput: IScorecardTable = prepareTabledata(balancedScorecards);

    // * Prepare data for table
    const scorecardTable: IScorecardTable = tableinput;

    // * Format output
    const formatedOutput: ICombinedScorecard = {
      balancedScorecards: balancedScorecards,
      scorecardTable: scorecardTable,
    };

    // * Return combined data as JSON
    return formatedOutput;
  }
}

// * Check if any errors, if yes, pick the highest
function prepareTabledata(balancedScorecards: IBalancedScorecard) {
  /*
  IERROR: 
  level?: string;
  errordescription?: string;
  */

  // * DATABASE VERSION
  let databaseInput: ITableValues | undefined;

  if (balancedScorecards.dbversion["level"] !== undefined) {
    databaseInput = {
      cobit: {
        Availability: true,
        Compliance: false,
        Reliability: true,
        Confidentality: false,
      },
      value: balancedScorecards.dbversion["level"],
    };
  } else {
    databaseInput = {
      cobit: {
        Availability: true,
        Compliance: false,
        Reliability: true,
        Confidentality: false,
      },
      value: "OK",
    };
  }

  // * USER GROUPS
  let usergroupsInput: ITableValues | undefined;
  if (balancedScorecards.usergroups === undefined) {
    usergroupsInput = {
      cobit: {
        Availability: true,
        Compliance: false,
        Reliability: false,
        Confidentality: true,
      },
      value: "HIGH",
    };
  } else if (balancedScorecards.usergroups["level"] !== undefined) {
    usergroupsInput = {
      cobit: {
        Availability: true,
        Compliance: false,
        Reliability: false,
        Confidentality: true,
      },
      value: balancedScorecards.usergroups["level"],
    };
  } else {
    //* If no errors
    usergroupsInput = {
      cobit: {
        Availability: true,
        Compliance: false,
        Reliability: false,
        Confidentality: true,
      },
      value: "OK",
    };
  }

  // * User Rights Check
  let usergroupscheckInput: ITableValues | undefined;
  // * If no errors
  if (
    balancedScorecards.usergroupscheck.errors.length === 0 ||
    balancedScorecards.usergroupscheck.errors.length === undefined
  ) {
    usergroupscheckInput = {
      cobit: {
        Availability: true,
        Compliance: false,
        Reliability: false,
        Confidentality: true,
      },
      value: "OK",
    };
  } else {
    // * else if errors
    for (
      let i: number = 0;
      i < balancedScorecards.usergroupscheck.errors.length;
      i++
    ) {
      const errorlvl = balancedScorecards.usergroupscheck.errors[i].level;
      if (usergroupscheckInput === undefined) {
        if (errorlvl === "MID") {
          usergroupscheckInput = {
            cobit: {
              Availability: true,
              Compliance: false,
              Reliability: false,
              Confidentality: true,
            },
            value: "MID",
          };
        } else if (errorlvl === "HIGH") {
          usergroupscheckInput = {
            cobit: {
              Availability: true,
              Compliance: false,
              Reliability: false,
              Confidentality: true,
            },
            value: "HIGH",
          };
        } else {
          usergroupscheckInput = {
            cobit: {
              Availability: true,
              Compliance: false,
              Reliability: false,
              Confidentality: true,
            },
            value: "LOW",
          };
        }
      } else if (usergroupscheckInput.value === "LOW" && errorlvl !== "LOW") {
        if (errorlvl === "MID") {
          usergroupscheckInput = {
            cobit: {
              Availability: true,
              Compliance: false,
              Reliability: false,
              Confidentality: true,
            },
            value: "MID",
          };
        } else if (errorlvl === "HIGH") {
          usergroupscheckInput = {
            cobit: {
              Availability: true,
              Compliance: false,
              Reliability: false,
              Confidentality: true,
            },
            value: "HIGH",
          };
        }
      } else if (usergroupscheckInput.value === "MID") {
        if (errorlvl === "HIGH") {
          usergroupscheckInput = {
            cobit: {
              Availability: true,
              Compliance: false,
              Reliability: false,
              Confidentality: true,
            },
            value: "HIGH",
          };
        }
      } else if (usergroupscheckInput.value === "HIGH") {
        // * Do nothing - maximal value
      }
    }
  }

  // * Check highest password error
  let passwordInput: ITableValues | undefined;
  if (balancedScorecards.passwords["level"] !== undefined) {
    passwordInput = {
      cobit: {
        Availability: true,
        Compliance: true,
        Reliability: false,
        Confidentality: true,
      },
      value: balancedScorecards.passwords["level"],
    };
  } else {
    if (Array.isArray(balancedScorecards.passwords)) {
      for (let i: number = 0; i < balancedScorecards.passwords.length; i++) {
        const errorlvl = balancedScorecards.passwords[i].level;
        if (passwordInput === undefined) {
          if (errorlvl === "MID") {
            passwordInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: false,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            passwordInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: false,
                Confidentality: true,
              },
              value: "HIGH",
            };
          } else {
            passwordInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: false,
                Confidentality: true,
              },
              value: "LOW",
            };
          }
        } else if (passwordInput.value === "LOW" && errorlvl !== "LOW") {
          if (errorlvl === "MID") {
            passwordInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: false,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            passwordInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: false,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (passwordInput.value === "MID") {
          if (errorlvl === "HIGH") {
            passwordInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: false,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (passwordInput.value === "HIGH") {
          // * Do nothing - maximal value
        }
      }
    }
  }

  // * Check Ticket System Tickets
  // | "INTERUPTION"
  // | "BACKUP/RESTORATION"
  // | "CHANGES"
  let INTERUPTIONInput: ITableValues | undefined;
  let BACKUPRESTORATIONInput: ITableValues | undefined;
  let CHANGESInput: ITableValues | undefined;
  for (let i: number = 0; i < balancedScorecards.ticketsystem.length; i++) {
    if (balancedScorecards.ticketsystem[i].errordescription !== undefined) {
      let errorlvl = balancedScorecards.ticketsystem[i].level;
      if (
        balancedScorecards.ticketsystem[i].errortype === undefined ||
        balancedScorecards.ticketsystem[i].errortype === "ALL"
      ) {
        // * --- Handle Interuptions ---
        if (INTERUPTIONInput === undefined) {
          if (errorlvl === "MID") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          } else {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "LOW",
            };
          }
        } else if (INTERUPTIONInput.value === "LOW" && errorlvl !== "LOW") {
          if (errorlvl === "MID") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (INTERUPTIONInput.value === "MID") {
          if (errorlvl === "HIGH") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (INTERUPTIONInput.value === "HIGH") {
          // * Do nothing - maximal value
        }
        // * --- Handle Backup / Restore ---
        if (BACKUPRESTORATIONInput === undefined) {
          if (errorlvl === "MID") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          } else {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "LOW",
            };
          }
        } else if (
          BACKUPRESTORATIONInput.value === "LOW" &&
          errorlvl !== "LOW"
        ) {
          if (errorlvl === "MID") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (BACKUPRESTORATIONInput.value === "MID") {
          if (errorlvl === "HIGH") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (BACKUPRESTORATIONInput.value === "HIGH") {
          // * Do nothing - maximal value
        }
        // * --- Handle Changes ---
        if (CHANGESInput === undefined) {
          if (errorlvl === "MID") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          } else {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "LOW",
            };
          }
        } else if (CHANGESInput.value === "LOW" && errorlvl !== "LOW") {
          if (errorlvl === "MID") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (CHANGESInput.value === "MID") {
          if (errorlvl === "HIGH") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (CHANGESInput.value === "HIGH") {
          // * Do nothing - maximal value
        }
      } else if (
        balancedScorecards.ticketsystem[i].errortype === "BACKUP/RESTORATION"
      ) {
        // * --- Handle Backup / Restore ---
        if (BACKUPRESTORATIONInput === undefined) {
          if (errorlvl === "MID") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          } else {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "LOW",
            };
          }
        } else if (
          BACKUPRESTORATIONInput.value === "LOW" &&
          errorlvl !== "LOW"
        ) {
          if (errorlvl === "MID") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (BACKUPRESTORATIONInput.value === "MID") {
          if (errorlvl === "HIGH") {
            BACKUPRESTORATIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (BACKUPRESTORATIONInput.value === "HIGH") {
          // * Do nothing - maximal value
        }
      } else if (balancedScorecards.ticketsystem[i].errortype === "CHANGES") {
        // * --- Handle Changes ---
        if (CHANGESInput === undefined) {
          if (errorlvl === "MID") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          } else {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "LOW",
            };
          }
        } else if (CHANGESInput.value === "LOW" && errorlvl !== "LOW") {
          if (errorlvl === "MID") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (CHANGESInput.value === "MID") {
          if (errorlvl === "HIGH") {
            CHANGESInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (CHANGESInput.value === "HIGH") {
          // * Do nothing - maximal value
        }
      } else if (
        balancedScorecards.ticketsystem[i].errortype === "INTERUPTION"
      ) {
        // * --- Handle Interuptions ---
        if (INTERUPTIONInput === undefined) {
          if (errorlvl === "MID") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          } else {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "LOW",
            };
          }
        } else if (INTERUPTIONInput.value === "LOW" && errorlvl !== "LOW") {
          if (errorlvl === "MID") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "MID",
            };
          } else if (errorlvl === "HIGH") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (INTERUPTIONInput.value === "MID") {
          if (errorlvl === "HIGH") {
            INTERUPTIONInput = {
              cobit: {
                Availability: true,
                Compliance: true,
                Reliability: true,
                Confidentality: true,
              },
              value: "HIGH",
            };
          }
        } else if (INTERUPTIONInput.value === "HIGH") {
          // * Do nothing - maximal value
        }
      }
    }
  }

  // * If no issues found for ticket system
  if (INTERUPTIONInput === undefined) {
    INTERUPTIONInput = {
      cobit: {
        Availability: true,
        Compliance: true,
        Reliability: true,
        Confidentality: true,
      },
      value: "OK",
    };
  }
  if (BACKUPRESTORATIONInput === undefined) {
    BACKUPRESTORATIONInput = {
      cobit: {
        Availability: true,
        Compliance: true,
        Reliability: true,
        Confidentality: true,
      },
      value: "OK",
    };
  }
  if (CHANGESInput === undefined) {
    CHANGESInput = {
      cobit: {
        Availability: true,
        Compliance: true,
        Reliability: true,
        Confidentality: true,
      },
      value: "OK",
    };
  }

  const scorecardTable: IScorecardTable = {
    dbversion: databaseInput,
    userrights: usergroupsInput,
    userrightscheck: usergroupscheckInput,
    password: passwordInput,
    interuptions: INTERUPTIONInput,
    backuprestoration: BACKUPRESTORATIONInput,
    changes: CHANGESInput,
  };

  return scorecardTable;
}

// * Defines the combined reply
export interface ICombinedScorecard {
  balancedScorecards: IBalancedScorecard;
  scorecardTable: IScorecardTable;
}

// * Defines the Fields of the Scorecard
export interface ICOBITFIELDS {
  Availability: boolean;
  Compliance: boolean;
  Reliability: boolean;
  Confidentality: boolean;
}

// * Format Table - DB Version
export interface ITableValues {
  cobit: ICOBITFIELDS;
  value: "LOW" | "MID" | "HIGH" | "OK";
}

// * Defines the Table Scorecard interface
export interface IScorecardTable {
  // * I - Format Table - DB Version
  dbversion: ITableValues;
  // * II - PO2.3 - User Rights
  userrights: ITableValues;
  // * III - PO2.3 - DBA Users (Admin Rights)
  userrightscheck: ITableValues;
  // * IV - DS5 / EU Policy - Password check
  password: ITableValues;
  //* V - AC 4 - Interuptions
  interuptions: ITableValues;
  // * VI - DS11.5 - Backup, Restoration
  backuprestoration: ITableValues;
  //* VII - AI 6.1, AI 6.2 - Changes Cobit
  changes: ITableValues;
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

export async function updateAuditResolved(auditid: string, action: boolean) {
  const connection = getConnection();
  const auditRepository = connection.getRepository(Audit);

  const response = await auditRepository
    .createQueryBuilder("audit")
    .update(auditRepository)
    .set({
      resolved: action,
    })
    .where("auditId = :auditId", { auditId: auditid })
    .execute();

  return response;
}

export async function updateAuditStatus(auditid: string, status: string) {
  const connection = getConnection();
  const auditRepository = connection.getRepository(Audit);

  const response = await auditRepository
    .createQueryBuilder("audit")
    .update(auditRepository)
    .set({
      status: status,
    })
    .where("auditId = :auditId", { auditId: auditid })
    .execute();

  return response;
}
