import { IAddUser } from "../../../../../assets/interfaces/Interfaces";

export async function addInternalUser(data: IAddUser) {
  let url: string = "";
  if (data.type === "internal") {
    url = "http://localhost:5000/internal";
  } else {
    url = "http://localhost:5000/external";
  }
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
