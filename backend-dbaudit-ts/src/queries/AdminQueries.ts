import { Admin } from "../entity/Admin";
import { getConnection } from "typeorm";

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

export = { getCredentials: getCredentials };
