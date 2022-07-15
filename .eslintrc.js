module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  plugins: ['jest'],
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
}
