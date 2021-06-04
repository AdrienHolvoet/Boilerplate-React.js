import ApiCore from "../api/core";
const url = "import";
const plural = "imports";
const single = "import";

// plural and single may be used for message logic if needed in the ApiCore class.

const importService = new ApiCore({
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

export default importService;
