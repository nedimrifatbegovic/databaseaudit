interface RequestsProps {
  email: string;
}

export interface ResponseProps {
  companyname?: string;
  uniqueid?: string;
  auditid: string;
  companyemail?: string;
  auditstatus?: string;
  auditdate?: string;
  error?: string;
}

export async function getClients(data: RequestsProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/getallclientsexternaluser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((result: ResponseProps[]) => {
        resolve(result);
      })
      .catch((error: string) => {
        reject(error);
      });
  });
}
