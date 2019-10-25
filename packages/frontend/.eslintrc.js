module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react-redux/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-redux'],
  rules: {
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
    'react-redux/prefer-separate-component-file': 'off',
    'react/no-unused-prop-types': 'off',
    //  this doesn't mean we allow unused prop types.
    //  we need to disable this rule to allow prop types,
    //  which are used only in mapDispatchToProps or mapStateToProps.
    //  this rule reports them as unused, what is incorrect.
    //  Currently unused prop types are reported by react-redux plugin.
    //  Which can correctly handle such case.
  },
  overrides: [
    {
      files: ['.storybook/**/*.js', '**/*.stories.jsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        //  storybook dependencies set only in root package.json
        //  and this rule can't handle such case
        //  thus disabled on particular this files
      },
    },
  ],
}
