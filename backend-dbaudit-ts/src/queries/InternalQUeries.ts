import { ICombinedScorecard, generateReport } from "./ReportQueries";

import { Audit } from "../entity/Audit";
import { Config } from "../entity/Config";
import { InternalAuditor } from "../entity/InternalAuditor";
import { Report } from "../entity/Report";
import { getConnection } from "typeorm";

const getCredentials = async (email: string, password: string) => {
  const connection = getConnection();
  const internalRepository = connection.getRepository(InternalAuditor);
  console.log("__START__");
  const credentials = await internalRepository
    .createQueryBuilder("internal_auditor")
    .where("email = :email", { email: email })
    .andWhere("password = :password", { password: password })
    .getOne();
  console.log("__END__");

  if (credentials !== undefined) {
    return true;
  } else {
    return false;
  }
};

const updateInternalPassword = async (email: string, password: string) => {
  const connection = getConnection();
  const internalRepository = connection.getRepository(InternalAuditor);
  console.log("__START__");
  const credentials = await internalRepository
    .createQueryBuilder("internal_auditor")
    .update(internalRepository)
    .set({
      password: password,
    })
    .where("email = :email", { email: email })
    .execute();
  console.log("__END__");

  if (credentials !== undefined) {
    return true;
  } else {
    return false;
  }
};

// Set New Configuration for Internal User
interface ConfigurationData {
  privatekey: string;
  consumerkey: string;
  token: string;
  tokensecret: string;
  signaturemethod: string;
  jiraurl: string;
  jiraport: string;
  backup: string;
  restoration: string;
  error: string;
  change: string;
  dbtype: string;
  dbhost: string;
  dbport: string;
  dbusername: string;
  dbpassword: string;
  dbname: string;
  logs: string;
  logsid: string;
  projectkey: string;
  ticketkey: string;
  logstype: string;
  user: string;
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  usergroupid: string;
  title: string;
  usergroups: string;
  usergroupsgroupid: string;
  readrights: string;
  deleterights: string;
  createrights: string;
  updaterights: string;
  groupname: string;
}

const setNewConfiguration = async (
  data: ConfigurationData,
  privatekeybase64: string,
  internalMail: string
) => {
  const connection = getConnection();
  console.log("__START__");
  const internalAuditorPreload = await InternalAuditor.findOne({
    where: {
      email: internalMail,
      // relations: ["config"],
    },
  });

  const internalAuditor = await InternalAuditor.findOne(
    internalAuditorPreload.internalAuditorId,
    { relations: ["configs"] }
  );

  const newConfig = new Config();
  newConfig.privateKey = privatekeybase64;
  newConfig.consumerKey = data.consumerkey;
  newConfig.token = data.token;
  newConfig.tokenSecret = data.tokensecret;
  newConfig.signatureMethod = data.signaturemethod;
  newConfig.jiraUrl = data.jiraurl;
  newConfig.jiraPort = data.jiraport;
  newConfig.backupProjectKey = data.backup;
  newConfig.restorationProjectKey = data.restoration;
  newConfig.errorProjectKey = data.error;
  newConfig.changeProjectKey = data.change;
  newConfig.dbType = data.dbtype;
  newConfig.dbHost = data.dbhost;
  newConfig.dbPort = data.dbport;
  newConfig.dbUsername = data.dbusername;
  newConfig.dbPassword = data.dbpassword;
  newConfig.logs = data.logs;
  newConfig.logsid = data.logsid;
  newConfig.projectkey = data.projectkey;
  newConfig.ticketkey = data.ticketkey;
  newConfig.logstype = data.logstype;
  newConfig.user = data.user;
  newConfig.userid = data.userid;
  newConfig.firstname = data.firstname;
  newConfig.lastname = data.lastname;
  newConfig.email = data.email;
  newConfig.password = data.password;
  newConfig.usergroupid = data.usergroupid;
  newConfig.title = data.title;
  newConfig.usergroups = data.usergroups;
  newConfig.usergroupsgroupid = data.usergroupsgroupid;
  newConfig.readrights = data.readrights;
  newConfig.deleterights = data.deleterights;
  newConfig.createrights = data.createrights;
  newConfig.updaterights = data.updaterights;
  newConfig.groupname = data.groupname;
  newConfig.dbName = data.dbname;

  const result = await connection.manager.save(newConfig);

  internalAuditor.configs.push(newConfig);
  await connection.manager.save(internalAuditor);

  console.log("__END__");
  if (result !== undefined) {
    return true;
  } else {
    return false;
  }
};

// Check if configuration for email exists (Internal Admin)
const checkConfiguration = async (internalMail: string) => {
  console.log("Internal Mail", internalMail);
  console.log("__START__");
  const internalAuditorPreload = await InternalAuditor.findOne({
    where: {
      email: internalMail,
      // relations: ["config"],
    },
  });

  if (internalAuditorPreload === undefined) {
    return false;
  }

  const preloadConfig = await Config.findOne({
    where: {
      internalAuditor: internalAuditorPreload,
    },
  });

  console.log("__END__");
  if (preloadConfig !== undefined) {
    return true;
  } else {
    return false;
  }
};

// Get correct attribute type, what should be updated
function getUpdateJSON(updatetype: string, updatevalue: string) {
  switch (updatetype) {
    case "privatekey":
      return { privateKey: updatevalue };
    case "consumerkey":
      return { consumerKey: updatevalue };
    case "token":
      return { token: updatevalue };
    case "tokensecret":
      return { tokenSecret: updatevalue };
    case "jiraurl":
      return { jiraUrl: updatevalue };
    case "jiraport":
      return { jiraPort: updatevalue };
    case "backup":
      return { backupProjectKey: updatevalue };
    case "restoration":
      return { restorationProjectKey: updatevalue };
    case "error":
      return { errorProjectKey: updatevalue };
    case "change":
      return { changeProjectKey: updatevalue };
    case "dbhost":
      return { dbHost: updatevalue };
    case "dbport":
      return { dbPort: updatevalue };
    case "dbusername":
      return { dbUsername: updatevalue };
    case "dbpassword":
      return { dbPassword: updatevalue };
    case "dbname":
      return { dbName: updatevalue };
    case "logs":
      return { logs: updatevalue };
    case "logsid":
      return { logsid: updatevalue };
    case "projectkey":
      return { projectkey: updatevalue };
    case "ticketkey":
      return { ticketkey: updatevalue };
    case "logstype":
      return { logstype: updatevalue };
    case "user":
      return { user: updatevalue };
    case "userid":
      return { userid: updatevalue };
    case "firstname":
      return { firstname: updatevalue };
    case "lastname":
      return { lastname: updatevalue };
    case "email":
      return { email: updatevalue };
    case "password":
      return { password: updatevalue };
    case "usergroupid":
      return { usergroupid: updatevalue };
    case "title":
      return { title: updatevalue };
    case "usergroups":
      return { usergroups: updatevalue };
    case "usergroupsgroupid":
      return { usergroupsgroupid: updatevalue };
    case "readrights":
      return { readrights: updatevalue };
    case "deleterights":
      return { deleterights: updatevalue };
    case "createrights":
      return { createrights: updatevalue };
    case "updaterights":
      return { updaterights: updatevalue };
    case "groupname":
      return { groupname: updatevalue };
    default:
      console.log("--updatetype--> ", updatetype);
      return undefined;
  }
}

// Update Configuration
const updateConfigValue = async (
  email: string,
  updatevalue: string,
  updatetype: string
) => {
  const connection = getConnection();
  const internalRepository = connection.getRepository(InternalAuditor);
  const configRepository = connection.getRepository(Config);
  const internalAuditorId = await internalRepository
    .createQueryBuilder("internal_auditor")
    .where("email = :email", { email: email })
    .execute();

  const auditorid = internalAuditorId[0].internal_auditor_internalAuditorId;
  if (auditorid === undefined) {
    return false;
  }
  console.log("Update type & Value: ", updatetype, updatevalue);
  const updatedata = getUpdateJSON(updatetype, updatevalue);
  if (updatedata === undefined) {
    return false;
  }

  console.log("__START__");
  const credentials = await configRepository
    .createQueryBuilder("config")
    .update(configRepository)
    .set(updatedata)
    .where(
      "internalAuditorInternalAuditorId = :internalAuditorInternalAuditorId",
      { internalAuditorInternalAuditorId: auditorid }
    )
    .execute();
  console.log("__END__");

  if (credentials !== undefined) {
    return true;
  } else {
    return false;
  }
};

// * Chech if internal audit exists
const checkInternalAudit = async (email: string) => {
  // ! If no return 0, if yes return id number
  const connection = getConnection();
  const internalRepository = connection.getRepository(InternalAuditor);
  const auditRepository = connection.getRepository(Audit);
  // * Get internal auditor id
  const internalAuditorId = await internalRepository
    .createQueryBuilder("internal_auditor")
    .where("email = :email", { email: email })
    .execute();

  const auditorid = internalAuditorId[0].internal_auditor_internalAuditorId;

  if (auditorid === undefined) {
    // * If the internal auditor has not been found
    console.log("User not found : " + auditorid);
    return undefined;
  }

  // * Check if any audits for id x
  const audit = await auditRepository.createQueryBuilder("audit").execute();

  if (audit.length === 0) {
    return 0;
  } else {
    // * Get internal auditors ids (added to the audit)
    const internalAuditorPreload = await auditRepository
      .createQueryBuilder("audit")
      .leftJoinAndSelect(
        "audit.internalAuditors",
        "internal_auditor",
        "internal_auditor.internalAuditorId = :internalAuditorId",
        { internalAuditorId: auditorid }
      )
      .getMany();

    // * Get audits without external auditors (find internal audit - if any)
    for (let i: number = 0; i < internalAuditorPreload.length; i++) {
      if (internalAuditorPreload[i].externalAuditors === undefined) {
        // * If yes return audit id
        return internalAuditorPreload[i].auditId;
      }

      if (internalAuditorPreload[i].externalAuditors.length === 0) {
        // * If yes return audit id
        return internalAuditorPreload[i].auditId;
      }
    }

    return auditorid;
  }
};

// * Generate internal audit (add to database)
const createInternalAudit = async (email: string) => {
  const connection = getConnection();
  console.log("__START__");
  const internalAuditorPreload = await InternalAuditor.findOne({
    where: {
      email: email,
    },
  });

  const internalAuditor = await InternalAuditor.findOne(
    internalAuditorPreload.internalAuditorId,
    { relations: ["configs"] }
  );

  const newAudit = new Audit();
  newAudit.internalAuditors = [internalAuditor];
  newAudit.status = "Accepted";
  newAudit.resolved = true;

  const result = await connection.manager.save(newAudit);
  console.log(result);

  console.log("__END__");
  return result.auditId;
};

// * Add report to datbaase
const addReport = async (auditid: number, report: ICombinedScorecard) => {
  const connection = getConnection();
  const reportConnection = new Report();
  // * Convert object to json object
  var jsontxt = JSON.stringify(report);
  var jsonobject = JSON.parse(jsontxt);
  reportConnection.scorecard = jsonobject;

  // * Get audit
  const auditpreload = await Audit.findOne({
    where: {
      auditId: auditid,
    },
  });

  reportConnection.audit = auditpreload;

  // * Set date
  var today = new Date();
  reportConnection.createdAt = today;

  const result = await connection.manager.save(reportConnection);
  return result.reportId;
};

// * Get report created date
const getReportCreatedDate = async (reportid: number) => {
  // const connection = getConnection();
  console.log("__START__");
  const reportpreload = await Report.findOne({
    where: {
      reportId: reportid,
    },
  });
  if (reportpreload !== undefined) {
    return reportpreload.createdAt;
  } else {
    return undefined;
  }
};

// * Generate internal audit & report
const internalReport = async (email: string) => {
  // * Check if audit exists
  const auditCheck: undefined | number = await checkInternalAudit(email);
  let auditid: undefined | number;

  if (auditCheck === undefined) {
    const error500 = {
      message: "ERROR 500: Audit failed. User not found",
    };
    return error500;
  }
  // * 1 Internal auditor auditor can have mulitple audits
  // * 2 If an audit has no external auditor then it is an internal audit
  if (auditCheck !== 0) {
    auditid = auditCheck;
  }
  // * If no , create new audit
  else {
    auditid = await createInternalAudit(email);

    if (createInternalAudit === undefined) {
      const error500 = {
        message: "ERROR 500: Create audit failed.",
      };
      return error500;
    }
  }
  // * If yes , generate report
  const report: ICombinedScorecard = await generateReport(email);

  // * Save report in DB for specific audit
  const reportid: number = await addReport(auditid, report);

  // * Get report created date
  let reportDate: Date | undefined = await getReportCreatedDate(reportid);
  reportDate.setHours(reportDate.getHours() + 1);
  const fullreport = {
    report: report,
    reportDate: reportDate,
  };

  return fullreport;
};

/* Export queries */
export = {
  getCredentials: getCredentials,
  updateInternalPassword: updateInternalPassword,
  setNewConfiguration: setNewConfiguration,
  checkConfiguration: checkConfiguration,
  updateConfigValue: updateConfigValue,
  internalReport: internalReport,
  addReport: addReport,
};
