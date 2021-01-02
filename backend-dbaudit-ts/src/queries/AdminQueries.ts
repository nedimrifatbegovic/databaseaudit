import { Admin } from "../entity/Admin";
import { ExternalAuditor } from "../entity/ExternalAuditor";
import { InternalAuditor } from "../entity/InternalAuditor";
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

const setExternal = async (
  email: string,
  password: string,
  companyname: string
) => {
  const connection = getConnection();

  console.log("__START__");
  const createdUser = new ExternalAuditor();
  createdUser.companyName = companyname;
  createdUser.email = email;
  createdUser.password = password;
  const result = await connection.manager.save(createdUser);
  console.log("__END__");
  return result;
};

const removeInternal = async (email: string) => {
  const connection = getConnection();

  console.log("__START__");
  try {
    await connection
      .createQueryBuilder()
      .delete()
      .from(InternalAuditor)
      .where("email = :email", { email: email })
      .execute();
    console.log("__END__");
    return true;
  } catch (error) {
    console.log("__FAIL__");
    return false;
  }
};

const removeExternal = async (email: string) => {
  const connection = getConnection();

  console.log("__START__");
  try {
    await connection
      .createQueryBuilder()
      .delete()
      .from(ExternalAuditor)
      .where("email = :email", { email: email })
      .execute();
    console.log("__END__");
    return true;
  } catch (error) {
    console.log("__FAIL__");
    return false;
  }
};

/* Get users for edit */
const getInternal = async (email: string, type: string) => {
  const connection = getConnection();
  const internalRepository = connection.getRepository(InternalAuditor);
  console.log("__START__");
  const credentials = await internalRepository
    .createQueryBuilder("internal_auditor")
    .where("email = :email", { email: email })
    .getOne();
  console.log("__END__");

  if (credentials !== undefined) {
    const result = {
      userdetails: credentials,
      usertype: type,
    };

    return result;
  } else {
    return false;
  }
};

const getExternal = async (email: string, type: string) => {
  const connection = getConnection();
  const externalRepository = connection.getRepository(ExternalAuditor);
  console.log("__START__");
  const credentials = await externalRepository
    .createQueryBuilder("external_auditor")
    .where("email = :email", { email: email })
    .getOne();
  console.log("__END__");

  if (credentials !== undefined) {
    const result = {
      userdetails: credentials,
      usertype: type,
    };
    return result;
  } else {
    return false;
  }
};

/* Update external / internal user */
const updateInternal = async (
  email: string,
  attributeType: string,
  attributeValue: string
) => {
  const connection = getConnection();
  const internalRepository = connection.getRepository(InternalAuditor);

  if (attributeType === "CompanyName") {
    console.log("__START__");
    const credentials = await internalRepository
      .createQueryBuilder("internal_auditor")
      .update(internalRepository)
      .set({
        companyName: attributeValue,
      })
      .where("email = :email", { email: email })
      .execute();
    console.log("__END__");

    return credentials;
  } else if (attributeType === "password") {
    console.log("__START__");
    const credentials = await internalRepository
      .createQueryBuilder("internal_auditor")
      .update(internalRepository)
      .set({
        password: attributeValue,
      })
      .where("email = :email", { email: email })
      .execute();
    console.log("__END__");

    return credentials;
  } else {
    console.log("Wrong Attribute Type");
  }
};

const updateExternal = async (
  email: string,
  attributeType: string,
  attributeValue: string
) => {
  const connection = getConnection();
  const externalRepository = connection.getRepository(ExternalAuditor);

  if (attributeType === "CompanyName") {
    console.log("__START__");
    const credentials = await externalRepository
      .createQueryBuilder("external_auditor")
      .update(externalRepository)
      .set({
        companyName: attributeValue,
      })
      .where("email = :email", { email: email })
      .execute();
    console.log("__END__");

    return credentials;
  } else if (attributeType === "password") {
    console.log("__START__");
    const credentials = await externalRepository
      .createQueryBuilder("external_auditor")
      .update(externalRepository)
      .set({
        password: attributeValue,
      })
      .where("email = :email", { email: email })
      .execute();
    console.log("__END__");

    return credentials;
  } else {
    console.log("Wrong Attribute Type");
  }
};

/* Export queries */
export = {
  getCredentials: getCredentials,
  setInternal: setInternal,
  setExternal: setExternal,
  removeInternal: removeInternal,
  removeExternal: removeExternal,
  getInternal: getInternal,
  getExternal: getExternal,
  updateInternal: updateInternal,
  updateExternal: updateExternal,
};
