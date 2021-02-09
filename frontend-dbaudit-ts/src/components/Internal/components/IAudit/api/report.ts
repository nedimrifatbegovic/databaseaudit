import { ICombinedScorecard } from "../../../../../assets/interfaces/Interfaces";

interface InternalReportProps {
  email: string;
}

interface ResponseProps {
  report: ICombinedScorecard;
}

export async function generateReport(data: InternalReportProps) {
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/internalauditrequest", {
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
