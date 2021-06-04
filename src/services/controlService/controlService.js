import ApiCore from "../api/core";
import { COPY_ENDPOINT, RENAME_ENDPOINT } from "./constant";
import { apiProvider } from "../api/provider";

const url = "controls";
const plural = "controls";
const single = "control";

// plural and single may be used for message logic if needed in the ApiCore class.

const controlService = new ApiCore({
  getAll: true,
  get: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
  plural: plural,
  single: single,
  secured: true,
});

controlService.copyControl = (controlPublicId) => {
  const newUrl = url + COPY_ENDPOINT;
  return apiProvider.get(newUrl, controlPublicId, true);
};

controlService.rename = (body) => {
  const newUrl = url + RENAME_ENDPOINT;
  return apiProvider.put(newUrl, "", body, true);
};

export default controlService;
