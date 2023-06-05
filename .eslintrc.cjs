// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'import/prefer-default-export': 0,
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'ignoredNodes': ['ConditionalExpression']
      }
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 2,
        'maxEOF': 0
      }
    ],
    'no-unused-vars': [
      'warn',
      'all'
    ]
  },
}
