interface RequestsProps {
  email: string;
}

export interface ResponseProps {
  auditid?: number;
  extenralauditormail?: string;
  status?: string;
  error?: string;
}

export async function LoadRequests(data: RequestsProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/getexternalaudits", {
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

export interface StatusUpdateProps {
  auditid?: number;
  status: string;
}

export async function UpdateInternalAuditStatus(data: StatusUpdateProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/changeauditstatus", {
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
