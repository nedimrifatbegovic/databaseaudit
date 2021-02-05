import { IoAuth } from "../../queries/ReportQueries";
import request from "request";

export async function getTicket(link: string, oAuth: IoAuth) {
  const url = { url: link, oauth: oAuth, qs: null, json: true };
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (body !== undefined) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
