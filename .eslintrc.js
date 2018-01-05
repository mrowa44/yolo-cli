module.exports = {
  extends: 'airbnb-base',
  rules: {
    'strict': 0,
    // needed for config file import
    'global-require': 0,
    'import/no-dynamic-require': 0,

    'no-param-reassign': ["error", { "props": false }],
  },
};
