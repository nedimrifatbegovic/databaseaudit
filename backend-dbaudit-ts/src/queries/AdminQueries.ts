import { Admin } from "../entity/Admin";
import { InternalAuditor } from "../entity/InternalAuditor";
import { create } from "domain";
import { getConnection } from "typeorm";
import { v4 } from "uuid";

const getCredentials = async (email: string, password: string) => {
  const connection = getConnection();
  const adminRepository = connection.getRepository(Admin);
  console.log("__START__");
  const credentials = await adminRepository
    .createQueryBuilder("admin")
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

const setInternal = async (
  email: string,
  password: string,
  companyname: string
) => {
  const connection = getConnection();

  console.log("__START__");
  const createdUser = new InternalAuditor();
  createdUser.companyName = companyname;
  createdUser.email = email;
  createdUser.password = password;
  const randomId = v4();
  createdUser.folderId = randomId;
  const result = await connection.manager.save(createdUser);
  console.log("__END__");
  console.log("RESULT => ");
  console.log(result);
  return randomId;
};

export = { getCredentials: getCredentials, setInternal: setInternal };
