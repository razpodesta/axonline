import baseConfig from '../../eslint.config.mjs';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@next/next': nextPlugin,
      'react': reactPlugin,
      'react-hooks': hooksPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-empty-function': 'off',
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-html-link-for-pages': ['error', 'apps/frontend/src/app']
    },
    settings: {
      react: { version: 'detect' }
    }
  },
  {
    ignores: ['.next/**/*'],
  },
];
