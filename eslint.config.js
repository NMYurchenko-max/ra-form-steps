import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default tseslint.config([
  globalIgnores(['dist', 'node_modules', '*.config.*', 'vite']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      ...compat.extends('plugin:react/recommended'),
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-comment-textnodes': 'off',
      'react/jsx-props-no-spreading': [
        'error',
        { ignoreDomElements: ['textarea', 'select'] },
      ],
    },
  },
])
