import { IPasswordChange } from "../../../../../assets/interfaces/Interfaces";

export async function updatePassword(data: IPasswordChange) {
  const url: string = "http://localhost:5000/internalpassword";
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
