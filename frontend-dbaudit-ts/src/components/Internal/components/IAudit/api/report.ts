import { IData } from "../../../../../assets/interfaces/Interfaces";

export async function connectUser(data: IData) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/login", {
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
