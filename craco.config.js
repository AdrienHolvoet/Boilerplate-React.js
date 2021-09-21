/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@images": path.resolve(__dirname, "src/resources/images"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@services": path.resolve(__dirname, "src/services"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@fonts": path.resolve(__dirname, "src/resources/fonts"),
      "@flags": path.resolve(__dirname, "src/resources/images/flags"),
      "@translations": path.resolve(__dirname, "src/resources/translations"),
      "@store": path.resolve(__dirname, "src/store"),
      "@scss": path.resolve(__dirname, "src/resources/scss"),
    },
  },
};
