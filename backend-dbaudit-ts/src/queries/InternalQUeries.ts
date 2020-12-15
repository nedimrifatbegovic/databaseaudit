// import { Admin } from "../entity/Admin";
// import { ExternalAuditor } from "../entity/ExternalAuditor";

import { InternalAuditor } from "../entity/InternalAuditor";
import { getConnection } from "typeorm";

// import { create } from "domain";


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

/* Export queries */
export = {
  getCredentials: getCredentials,
};
