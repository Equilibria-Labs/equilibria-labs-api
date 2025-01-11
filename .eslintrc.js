const { off } = require('process');

module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/await-thenable': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
