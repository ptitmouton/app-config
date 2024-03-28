/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
        tabWidth: 4,
      },
    },
  ],
};

export default config;
