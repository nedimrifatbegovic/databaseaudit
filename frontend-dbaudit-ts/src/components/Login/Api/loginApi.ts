import { IData } from "./loginApi.resources";
import axios from "axios";

export function connectUser(data: IData, callback: any, errorcallback: any) {
  axios
    .post("http://localhost:5000/login", {
      data,
    })
    .then((response) => {
      if (callback != null) {
        callback(response);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}
