// checkpoint API
import ApiCore from "../api/core";
const url = "checkpoints";
const plural = "checkpoints";
const single = "checkpoint";

// plural and single may be used for message logic if needed in the ApiCore class.

const checkpointsService = new ApiCore({
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

export default checkpointsService;
