import ApiCore from "../api/core";
import { apiProvider } from "../api/provider";
import { DIVERSITY_CLASSES_ENDPOINT } from "./constant";
const url = "dataset-entries";
const plural = "dataset-entries";
const single = "dataset-entry";

// plural and single may be used for message logic if needed in the ApiCore class.

const datasetEntryService = new ApiCore({
  getAll: true,
  get: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single,
  secured: true,
});

datasetEntryService.getAllDatasetEntriesOfClass = (
  diversityClassPublicId,
  params
) => {
  const newUrl = url + DIVERSITY_CLASSES_ENDPOINT;
  return apiProvider.get(newUrl, diversityClassPublicId, params, true);
};

datasetEntryService.changeDiversityClass = (diversityClassPublicId, body) => {
  const newUrl =
    url + DIVERSITY_CLASSES_ENDPOINT + "/" + diversityClassPublicId;
  return apiProvider.post(newUrl, body, true);
};

export default datasetEntryService;
