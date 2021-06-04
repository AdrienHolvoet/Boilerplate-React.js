import ApiCore from "../api/core";
const url = "register";
const plural = "registers";
const single = "register";

// plural and single may be used for message logic if needed in the ApiCore class.

const registerService = new ApiCore({
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

export default registerService;
