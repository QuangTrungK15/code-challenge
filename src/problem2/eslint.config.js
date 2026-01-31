import eslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  reactHooks.configs.flat.recommended,
  eslint.configs.recommended,
  tseslint.configs.strict,
  globalIgnores(['dist/**', 'build/**', 'node_modules/**'], 'Ignore Directory'),
  [
    {
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-function-type': 'warn'
      }
    }
  ]
);
