import { UpdateUserApiInput } from "../../../../../assets/interfaces/Interfaces";

export async function editUserApi(data: UpdateUserApiInput) {
  let url: string = "";
  if (data.userType === "internal") {
    url = "http://localhost:5000/updateinternal";
  } else {
    url = "http://localhost:5000/updateexternal";
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
