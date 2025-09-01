import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      "unused-imports": require("eslint-plugin-unused-imports"),
    },
    rules: {
      // Fix: make sure the rule is recognized
      "unused-imports/no-unused-vars": "error",
      "unused-imports/no-unused-imports": "error",

      // Let `unused-imports` handle unused vars instead of typescript-eslint
      "@typescript-eslint/no-unused-vars": "off",

      // React escaping for apostrophes
      "react/no-unescaped-entities": "error",

      // You can also silence console warnings if you want
      "no-console": "warn",
    },
  },
];

export default eslintConfig;
