module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es2022: true,
        node: true,
    },
    plugins: [
        'import',
        '@typescript-eslint',
        'react',
        'react-hooks',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    overrides: [],
};
