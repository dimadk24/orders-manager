module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/tests-setup.js'] },
    ],
  },
}
