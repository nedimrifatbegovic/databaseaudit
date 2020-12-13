import { ExistingUser } from "../../../../../assets/interfaces/Interfaces";

export async function getUserApi(data: ExistingUser) {
  let url: string = "";
  if (data.type === "internal") {
    url = "http://localhost:5000/loadinternal";
  } else {
    url = "http://localhost:5000/loadexternal";
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
