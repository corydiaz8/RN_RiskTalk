import axios from "axios";

export const URL = "https://risktalk.com.au/app/api/appdata";

export default class Api {
  axiosFunction = () => {
    return axios.create({
      baseURL: `${URL}/request/`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  };
  handleError = error => {
    console.log("ERROR", error.status);
    return error;
  };

  post = (url, data) => {
    let self = this;
    return new Promise((resolve, reject) => {
      self
        .axiosFunction()
        .post(url, data)
        .then(
          response => {
            resolve(response);
          },
          error => {
            reject(error.status);
          }
        );
    });
  };
}
