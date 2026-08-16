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
            'node_modules/**/*',
        ],
    },
    {
        ignores: [
            'vite.config.ts',
        ],
        extends: [
            ...tseslint.configs.recommended,
            js.configs.recommended,
            fsdPlugin.configs.recommended,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.app.json',
            },
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-hooks/set-state-in-effect': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-empty-object-type': 'off',
            'semi': ['error', 'always'],
        },
    },
);
