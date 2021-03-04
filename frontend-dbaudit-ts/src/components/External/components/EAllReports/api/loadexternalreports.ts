import { ICombinedScorecard } from "../../../../../assets/interfaces/Interfaces";

interface InternalReportProps {
  auditid: string;
}

export interface ResponseProps {
  report: ICombinedScorecard;
  reportdate: string;
  reportid: number;
}

export async function LoadExternalReports(data: InternalReportProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/allexternalreports", {
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
