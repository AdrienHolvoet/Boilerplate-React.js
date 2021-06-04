import ApiCore from "../api/core";
import { apiProvider } from "../api/provider";
import {
  GET_IMPORTED_IMAGES_ENDPOINT,
  CLASS_IMPORTED_IMAGES_ENDPOINT,
} from "./constant";

const url = "images";
const plural = "images";
const single = "image";

// plural and single may be used for message logic if needed in the ApiCore class.

const imageFileService = new ApiCore({
  getAll: true,
  get: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single,
});

imageFileService.addNewImages = (checkpointPublicId, body) => {
  const newUrl = url + "/" + checkpointPublicId;
  return apiProvider.post(newUrl, body, true);
};

imageFileService.getImportedImages = (checkpointPublicId) => {
  return apiProvider.get(
    url + "/" + checkpointPublicId,
    GET_IMPORTED_IMAGES_ENDPOINT,
    null,
    true
  );
};

imageFileService.classImportedImage = (body) => {
  const newUrl = url + CLASS_IMPORTED_IMAGES_ENDPOINT + "/";
  return apiProvider.post(newUrl, body, true);
};

export default imageFileService;
