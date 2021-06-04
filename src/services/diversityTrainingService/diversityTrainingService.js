import ApiCore from "../api/core";
import { apiProvider } from "../api/provider";

const url = "diversityTraining";
const plural = "diversityTrainings";
const single = "diversityTraining";

// plural and single may be used for message logic if needed in the ApiCore class.

const diversityTrainingService = new ApiCore({
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

diversityTrainingService.launchTraining = (controlPublicId) => {
  const newUrl = url + "/" + controlPublicId;
  return apiProvider.post(newUrl, {}, true);
};

export default diversityTrainingService;
