import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import { OFF, ERROR, pelesBase } from '@peleswin/eslint-config-base'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'


const clientEslint = {
  extends: [js.configs.recommended, ...tsEslint.configs.recommended, ...pelesBase.extends],
  ignores: ['dist', 'node_modules'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...pelesBase.rules,
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

const serverEslint = {
  extends: [js.configs.recommended, ...tsEslint.configs.recommended, ...pelesBase.extends],
  ignores: ['dist', 'node_modules'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.node,
    },
  },
  rules: {
    ...pelesBase.rules,
  },
}

export default tsEslint.config(
  ...pelesBase.flatConfig,
  ...tsEslint.configs.recommended,
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', '**/public/**', '**/vite-env.d.ts'],
  },
  clientEslint,
  serverEslint,
  {
    // files: ['**/*.d.ts'],
    rules: {
      'no-unused-vars': OFF,
    },
  },
)
