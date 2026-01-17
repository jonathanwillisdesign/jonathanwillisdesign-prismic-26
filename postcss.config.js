const babelConfig = require("./babel.config");

module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: [
        "src/**/*.{js,jsx,ts,tsx,stylex.js,stylex.ts}",
        "app/**/*.{js,jsx,ts,tsx,stylex.js,stylex.ts}",
        "pages/**/*.{js,jsx,ts,tsx,stylex.js,stylex.ts}",
        "components/**/*.{js,jsx,ts,tsx,stylex.js,stylex.ts}",
      ],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: babelConfig.plugins,
      },
      useCSSLayers: true,
    },
    autoprefixer: {},
  },
};
