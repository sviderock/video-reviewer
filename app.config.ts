import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from 'vite-tsconfig-paths'
import path from "path"

const ReactCompilerConfig = {};

export default defineConfig({
  react: {
    babel: {
      plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
    },
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json']
      }) as any,

    ]
  }
});
