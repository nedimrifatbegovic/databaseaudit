export interface AddClientApi {
  email: string;
  uniqueid: string;
}

export interface AddClientApiResponse {
  result: string;
}

export async function addClient(data: AddClientApi) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/adduniqueiduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((result: AddClientApiResponse) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
