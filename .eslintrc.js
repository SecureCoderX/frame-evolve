module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier'
  ],
  rules: {
    'max-lines': ['error', {'max': 500, 'skipBlankLines': true, 'skipComments': true}],
    'complexity': ['error', 150],
    'max-depth': ['error', 150],
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
};