import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import vitest from 'eslint-plugin-vitest';

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['*.test.*'],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    ...vitest.configs.recommended,
    settings: {
      typecheck: true,
    },
  },
];
