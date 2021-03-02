import { ExternalAuditor } from "../entity/ExternalAuditor";
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

/* Export queries */
export = {
  getCredentials: getCredentials,
  updateExternalPassword: updateExternalPassword,
};
