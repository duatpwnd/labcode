const CracoAlias = require("craco-alias");
const ScopedScss = require("craco-plugin-scoped-css");
module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules.unshift({
        /* 중요! unshift를 해야함. */ test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
  },
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
