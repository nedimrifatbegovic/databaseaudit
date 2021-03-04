import { ICombinedScorecard } from "../../../../../assets/interfaces/Interfaces";

export interface ExternalReportProps {
  auditid: string;
  email: string;
}

export interface ResponseProps {
  report: ICombinedScorecard;
  reportDate: Date | undefined;
}

export async function generateExtReport(data: ExternalReportProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/externalauditrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((result: ResponseProps) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
