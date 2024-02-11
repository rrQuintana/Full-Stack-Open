module.exports = {
  root: true,
  env: { browser: true, es6: true, jest: true, cypress: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true }},
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-trailing-spaces': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'eqeqeq': 'error',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  settings: { react: { version: 'detect' } },
}
