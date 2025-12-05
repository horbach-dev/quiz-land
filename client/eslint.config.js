// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

// Импортируем только конфиг Prettier (который отключает конфликтующие правила)
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // reactHooks.configs.flat.recommended - его правила добавим ниже в rules
      reactRefresh.configs.vite, // <-- Здесь плагин регистрируется первый раз
      // ВАЖНО: Добавляем конфиг Prettier последним в extends
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // Добавляем плагины явно
    plugins: {
      // Оставляем только react-hooks, который не был автоматически зарегистрирован
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
      // 'react-refresh': reactRefresh <-- Эту строку УДАЛЯЕМ, она вызывает ошибку
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          caughtErrorsIgnorePattern: '^_$',
          argsIgnorePattern: '^_$',
          varsIgnorePattern: '^_$',
        },
      ],
      // Правила для react-hooks, которые раньше импортировались через extends
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    },
  },
]);
