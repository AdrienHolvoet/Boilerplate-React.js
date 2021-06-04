// core.js

import { apiProvider } from "./provider";

export default class ApiCore {
  constructor(options) {
    this.options = options;
    if (options.getAll) {
      this.getAll = () => {
        return apiProvider.getAll(options.url, options.secured);
      };
    }

    if (options.get) {
      this.get = (id) => {
        return apiProvider.get(options.url, id, null, options.secured);
      };
    }

    if (options.post) {
      this.post = (model) => {
        return apiProvider.post(options.url, model, options.secured);
      };
    }

    if (options.put) {
      this.put = (id, body) => {
        return apiProvider.put(options.url, id, body, options.secured);
      };
    }

    if (options.patch) {
      this.patch = (model) => {
        return apiProvider.patch(options.url, model, options.secured);
      };
    }

    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.url, id, options.secured);
      };
    }
  }
  getUrl() {
    return this.options.url;
  }
}
