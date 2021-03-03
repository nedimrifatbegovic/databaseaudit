import { Audit } from "../entity/Audit";
import { ExternalAuditor } from "../entity/ExternalAuditor";
import { InternalAuditor } from "../entity/InternalAuditor";
import { getConnection } from "typeorm";

const getCredentials = async (email: string, password: string) => {
  const connection = getConnection();
  const externalRepository = connection.getRepository(ExternalAuditor);
  console.log("__START__");
  const credentials = await externalRepository
    .createQueryBuilder("external_auditor")
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

const updateExternalPassword = async (email: string, password: string) => {
  const connection = getConnection();
  const externalRepository = connection.getRepository(ExternalAuditor);
  console.log("__START__");
  const credentials = await externalRepository
    .createQueryBuilder("external_auditor")
    .update(externalRepository)
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

const addClient = async (email: string, uniqueid: string) => {
  const connection = getConnection();
  const externalRepository = connection.getRepository(ExternalAuditor);
  const internalRepository = connection.getRepository(InternalAuditor);

  console.log("__START__");
  const externaluser = await externalRepository
    .createQueryBuilder("external_auditor")
    .where("email = :email", { email: email })
    .getOne();
  console.log("__END__");
  if (externaluser) {
    console.log("__START__");
    const internaluser = await internalRepository
      .createQueryBuilder("external_auditor")
      .where("folderId = :folderId", { folderId: uniqueid })
      .getOne();
    console.log("__END__");
    if (internaluser) {
      // * Add new Audit with the external and internal auditors for company with unique id X
      const newAudit = new Audit();
      newAudit.internalAuditors = [internaluser];
      newAudit.externalAuditors = [externaluser];
      newAudit.status = "Pending";
      newAudit.resolved = true;
      await connection.manager.save(newAudit);
      return "The request has been sent to the client. Your current status for the audit is: - Pending - ";
    } else {
      return "The client has not been found. No matching unique IDs are saved in the application!";
    }
  } else {
    return "Your user has not been found! Please contact the application administrator!";
  }
};

interface getClientsInterface {
  companyname?: string;
  uniqueid?: string;
  auditid: number;
  auditstatus?: string;
  auditdate?: string;
  error?: string;
}

const getClients = async (email: string) => {
  const connection = getConnection();
  const externalRepository = connection.getRepository(ExternalAuditor);
  console.log("__START__");
  const externaluser = await externalRepository.find({
    relations: ["audits", "audits.internalAuditors"],
    where: { email: email },
  });
  console.log("__END__");
  if (externaluser[0]) {
    if (externaluser[0].audits) {
      if (externaluser[0].audits.length > 0) {
        const response: getClientsInterface[] = [];

        for (let i: number = 0; i < externaluser[0].audits.length; i++) {
          externaluser[0].audits[i].createdAt.setHours(
            externaluser[0].audits[i].createdAt.getHours() + 1
          );
          let date =
            externaluser[0].audits[i].createdAt.getDate() +
            "-" +
            (externaluser[0].audits[i].createdAt.getMonth() + 1) +
            "-" +
            externaluser[0].audits[i].createdAt.getFullYear();

          let input: getClientsInterface = {
            auditid: externaluser[0].audits[i].auditId,
            auditstatus: externaluser[0].audits[i].status,
            auditdate: date,
            companyname:
              externaluser[0].audits[i].internalAuditors[0].companyName,
            uniqueid: externaluser[0].audits[i].internalAuditors[0].folderId,
          };
          response.push(input);
        }
        return response;
      } else {
        const response = [
          {
            auditid: "0",
            error: "No clients have been found. ",
          },
        ];
        return response;
      }
    } else {
      const response = [
        {
          auditid: "0",
          error: "No clients have been found. ",
        },
      ];
      return response;
    }
  } else {
    const response = [
      {
        auditid: "0",
        error:
          "Your user has not been found! Please contact the application administrator!",
      },
    ];
    return response;
  }
};

/* Export queries */
export = {
  getCredentials: getCredentials,
  updateExternalPassword: updateExternalPassword,
  addClient: addClient,
  getClients: getClients,
};
