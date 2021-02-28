import { ICombinedScorecard } from "../../../../../assets/interfaces/Interfaces";

interface RequestsProps {
  email: string;
}

export interface ResponseProps {
  auditid?: number;
  externalauditoremail?: string;
  externalauditorid?: number;
  error?: string;
}

export async function LoadRequests(data: RequestsProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/unresolvedrequests", {
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
