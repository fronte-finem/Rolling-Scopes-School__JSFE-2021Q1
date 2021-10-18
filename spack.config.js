const { config } = require("@swc/core/spack");

module.exports = config({
  entry: __dirname + "/src/app/index.ts",
  output: {
    path: "r:/photo-filter/app",
    name: "index.js",
  },
});
