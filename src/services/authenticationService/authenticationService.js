import ApiCore from "@services/api/core";
import { apiProvider } from "../api/provider";
import { REGISTRATION_ENDPOINT, LOGIN_ENDPOINT } from "./constant";

const url = "authentication";
const plural = "authentication";
const single = "authentication";

// plural and single may be used for message logic if needed in the ApiCore class.

const authenticationService = new ApiCore({
  getAll: true,
  get: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single,
  secured: false,
});

export default authenticationService;

authenticationService.register = (body) => {
  const newUrl = url + REGISTRATION_ENDPOINT;
  return apiProvider.post(newUrl, body);
};

authenticationService.login = (body) => {
  const newUrl = url + LOGIN_ENDPOINT;
  return apiProvider.post(newUrl, body);
};
