// provider.js

import axios from "axios";
import { handleResponse, handleError } from "./response";
import { getItem, addItem, removeItem } from "@utils/localStorage";

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = process.env.REACT_APP_API_URL;

let instance = axios.create();
let user = JSON.parse(getItem("user"));

instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
instance.defaults.headers.patch["Content-Type"] = "application/json";

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      if (
        err.response.status === 401 &&
        err.config &&
        !err.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        if (!user) {
          user = JSON.parse(getItem("user"));
        }
        //TODO make it work with axios not fetch
        let res = fetch(BASE_URL + "/authenticate/refreshtoken", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrer: "no-referrer",
          body: JSON.stringify({
            refreshToken: user.refreshToken,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status && res.status === 417) {
              removeItem("user");
              window.location.replace("/login");
            } else {
              addItem("user", res);
              user = res;
              addAuthorizationHeader();
              originalReq.headers[
                "Authorization"
              ] = `${user.type} ${user.jwtToken}`;

              return axios(originalReq);
            }
          })
          .catch((err) => {
            // if an unknown error occurs
            removeItem("user");
            window.location.replace("/login");
          });
        resolve(res);
      } else if (err.response.status === 417) {
        removeItem("user");
        window.location.replace("/login");
      }

      return Promise.reject(error);
    });
  }
);

const addAuthorizationHeader = () => {
  user = JSON.parse(getItem("user"));

  if (user) {
    instance.defaults.headers[
      "Authorization"
    ] = `${user.type} ${user.jwtToken}`;
  }
};

/** @param {string} resource */
const getAll = (resource, secured = false) => {
  if (secured) {
    addAuthorizationHeader();
  }
  return instance
    .get(`${BASE_URL}/${resource}`)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const get = (resource, id, params = null, secured = false) => {
  if (secured) {
    addAuthorizationHeader();
  }
  return instance
    .get(`${BASE_URL}/${resource}/${id}`, {
      params,
    })
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const post = (resource, model, secured = false) => {
  if (secured) {
    addAuthorizationHeader();
  }
  return instance
    .post(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
/** @param {object} body */
const put = (resource, id, body, secured = false) => {
  if (secured) {
    addAuthorizationHeader();
  }
  return instance
    .put(`${BASE_URL}/${resource}/${id}`, body)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model, secured = false) => {
  if (secured) {
    addAuthorizationHeader();
  }
  return instance
    .patch(`${BASE_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const remove = (resource, id, secured = false) => {
  if (secured) {
    addAuthorizationHeader();
  }
  return instance
    .delete(`${BASE_URL}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export const apiProvider = {
  getAll,
  get,
  post,
  put,
  patch,
  remove,
};
