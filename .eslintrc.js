module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.js', 'next.config.mjs', 'vitest.config.mjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: { '@typescript-eslint/no-explicit-any': 'error' },
};
