import { ICombinedScorecard } from "../../../../../assets/interfaces/Interfaces";

interface InternalReportProps {
  email: string;
}

export interface ResponseProps {
  report: ICombinedScorecard;
  reportdate: string;
  reportid: number;
  companyname: string;
}

export async function LoadReports(data: InternalReportProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/allreports", {
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
