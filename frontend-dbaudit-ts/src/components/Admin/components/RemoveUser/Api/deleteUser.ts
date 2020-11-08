import { ExistingUser } from "../../../../../assets/interfaces/Interfaces";

export async function deleteUserApi(data: ExistingUser) {
  let url: string = "http://localhost:5000/deleteuser";
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
