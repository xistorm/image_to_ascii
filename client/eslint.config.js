import js from '@eslint/js';
import fsdPlugin from 'eslint-plugin-fsd-lint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            'dist/**/*',
            'src/generated/**/*',
        ],
    },
    {
        ignores: ['dist/**/*', 'src/generated/**/*'],
        extends: [
            ...tseslint.configs.recommended,
            js.configs.recommended,
            fsdPlugin.configs.recommended,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-empty-object-type': 'off',
            'semi': ['error', 'always'],
        },
    },
);
