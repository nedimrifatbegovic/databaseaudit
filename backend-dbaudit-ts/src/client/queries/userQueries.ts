import { IDBConnection, getDBConnection } from "./databaseQueries";

import { errorLevel } from "../config/mariadbConfig";

// * Get User Group Details
export async function getUsers(data: IDBConnection, user: string) {
  let conn: any;
  try {
    conn = await getDBConnection(data);
    const rows: any[] | undefined = await conn.query("SELECT * FROM " + user);

    if (rows !== undefined || rows !== null) {
      conn.end();
      return rows;
    } else {
      conn.end();
      return undefined;
    }
  } catch (err) {
    conn.end();
    throw err;
  }
}

// * Check password rules
export async function checkPassword(
  users: any[],
  usersPassword: string,
  usersUserId: string
) {
  if (
    users[0][usersPassword] === undefined ||
    users[0][usersUserId] === undefined
  ) {
    return undefined;
  }

  // * Password Policy: https://www.eui.eu/ServicesAndAdmin/ComputingService/PolicyDocuments/StrongPasswordPolicy
  /*
    The password is between 8-16 characters long
    The password contains characters from 3 of the following 4 categories:
    standard uppercase characters (A - Z)
    standard lowercase characters (a - z)
    numbers (0 - 9)
    symbols: only from among ! % - _ + = [ ] { } : , . ? < > ( ) ;
    The password does not contain your account name or any part of your full name (**** This one has not been implemented)
    The password does not contain characters only found on a particular national keyboard (e.g. ö, ë, å, ñ, é)
  */
  let result: IPasswordCheck[] = [];
  if (users.length === null) {
    return result;
  }

  try {
    for (let i: number = 0; i < users.length; i++) {
      if (users[i][usersPassword] === null) {
        var password: IPasswordCheck = {
          result: false,
          error: "The user has no password",
          userid: users[i][usersUserId],
          level: errorLevel.HIGH,
        };
        result.push(password);
      } else {
        var password: IPasswordCheck = passwordPolicyCheck(
          users[i][usersPassword],
          users[i][usersUserId]
        );

        if (password.result === false) {
          result.push(password);
        }
      }
    }
  } catch (error) {
    return error;
  }

  return result;
}

// * Defines the interface for the password check
export interface IPasswordCheck {
  result?: boolean;
  error?: string;
  userid?: number;
  level?: string;
}

// ! Source for similar solution: https://stackoverflow.com/questions/17152677/javascript-validation-for-a-complex-password, last visited 27.01.2021
function passwordPolicyCheck(password: string, userid: number) {
  // * Definition of the rules
  var anUpperCase = /[A-Z]/;
  var aLowerCase = /[a-z]/;
  var aNumber = /[0-9]/;
  var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
  var aParticularKeyboard = /[ü|Ü|Ä|ä|ë|å|ñ|é|Ö|ö]/;
  var obj: IPasswordCheck = {};
  obj.result = true;

  // * Check minimal password length
  if (password.length < 8) {
    obj.result = false;
    obj.error = "The password is not long enough!";
    obj.level = errorLevel.HIGH;
    obj.userid = userid;
    return obj;
  }
  if (password.length > 16) {
    obj.result = false;
    obj.error = "The password is too long!";
    obj.level = errorLevel.LOW;
    obj.userid = userid;
  }
  // * Defining the counters
  var numUpper: number = 0;
  var numLower: number = 0;
  var numNums: number = 0;
  var numSpecials: number = 0;

  for (var i = 0; i < password.length; i++) {
    if (anUpperCase.test(password[i])) numUpper++;
    else if (aLowerCase.test(password[i])) numLower++;
    else if (aNumber.test(password[i])) numNums++;
    else if (aSpecial.test(password[i])) numSpecials++;
    else if (aParticularKeyboard.test(password[i])) {
      obj.result = false;
      obj.error = "Password contains special national character!";
      obj.level = errorLevel.MID;
      obj.userid = userid;
      return obj;
    }
  }

  // * Checking if the password has the right format
  let counter: number = 0;
  if (numUpper >= 2) {
    counter = counter + 1;
  }
  if (numLower >= 2) {
    counter = counter + 1;
  }
  if (numNums >= 2) {
    counter = counter + 1;
  }
  if (numSpecials >= 2) {
    counter = counter + 1;
  }

  if (counter > 2) {
    return obj;
  } else {
    obj.result = false;
    if (counter === 1) {
      obj.error =
        "Only " + counter + " requirement has been fulfilled! (Min is 3 / 4)";
    } else {
      obj.error = counter + " requirements have been fulfilled! (Min is 3 / 4)";
    }
    obj.level = errorLevel.HIGH;
    obj.userid = userid;
    return obj;
  }
}
