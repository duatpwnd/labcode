const CracoAlias = require("craco-alias");
const ScopedScss = require("craco-plugin-scoped-css");
module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "tsconfig.paths.json",
        debug: false,
      },
    },
    {
      plugin: ScopedScss,
    },
  ],
};
