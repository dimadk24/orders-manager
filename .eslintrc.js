module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest-formatting/recommended',
    'plugin:react-redux/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'jest-formatting', 'react-redux'],
  rules: {
    'max-len': [
      'error',
      {
        code: 80,
        ignorePattern: '^(import|\\} from )',
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.jsx', '.storybook/**/*.js'],
      },
    ],
    'jest-formatting/padding-around-expect-groups': 'off',
    'import/order': 'off',
    'react-redux/prefer-separate-component-file': 'off',
    'react/no-unused-prop-types': 'off',
    //  this doesn't mean we allow unused prop types.
    //  we need to disable this rule to allow prop types,
    //  which are used only in mapDispatchToProps or mapStateToProps.
    //  this rule reports them as unused, what is incorrect.
    //  Currently unused prop types are reported by react-redux plugin.
    //  Which can correctly handle such case.
    'prettier/prettier': 'warn',
    //  we allow 0 warnings, so don't think prettier rules are ignored
    // this is only to show prettier issues as warnings, not errors
  },
}
