import {
  IInternalConfig,
  INewConfigAPI,
} from "../../../assets/interfaces/Interfaces";

// Add new configuration
export async function SetNewConfig(data: INewConfigAPI) {
  let url: string = "http://localhost:5000/newconfig";
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch(url, {
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

// Check if configuration exists
export async function checkConfig(data: IInternalConfig) {
  let url: string = "http://localhost:5000/checkconfig";
  const body = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fetch(url, {
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

// Update existing configuration
