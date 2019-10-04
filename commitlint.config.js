module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 60],
    'subject-case': [2, 'never', ['upper-case', 'snake-case']],
    'body-leading-blank': [2, 'always'],
  },
}
