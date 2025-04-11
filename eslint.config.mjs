import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwind from 'eslint-plugin-tailwindcss';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({extends: ["next/core-web-vitals", '@rocketseat/eslint-config/next']}),
  {
    ignores: [
      '**/.next/',
    ],
  },
  {
    name: 'tailwindcss/recommended',
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      tailwindcss: tailwind,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...tailwind.configs.recommended.rules,
      'tailwindcss/classnames-order': [
        'warn',
        {
          callees: ['clsx', 'cn', 'twMerge']
        }
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    }
  },
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
