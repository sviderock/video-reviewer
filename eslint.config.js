// eslint.config.js
import pluginRouter from "@tanstack/eslint-plugin-router";
import reactCompiler from "eslint-plugin-react-compiler";

export default [
  ...pluginRouter.configs["flat/recommended"],
  {
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
];
