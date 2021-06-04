import ApiCore from "../api/core";
import {
  CONFUSION_MATRIX_ENDPOINT,
  FALSE_ALERT_CHART_ENDPOINT,
} from "./constant";
import { apiProvider } from "../api/provider";
const url = "analyse";

const plural = "analyses";
const single = "analyse";

// plural and single may be used for message logic if needed in the ApiCore class.

const analyseService = new ApiCore({
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

analyseService.getConfusionMatrix = (controlPublicId, params) => {
  return apiProvider.get(
    url + CONFUSION_MATRIX_ENDPOINT,
    controlPublicId,
    params,
    true
  );
};

analyseService.getFalseAlertChart = (controlPublicId, params) => {
  return apiProvider.get(
    url + FALSE_ALERT_CHART_ENDPOINT,
    controlPublicId,
    params,
    true
  );
};

export default analyseService;
