module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier'
  ],
  rules: {
    'max-lines': ['error', {'max': 300, 'skipBlankLines': true, 'skipComments': true}],
    'complexity': ['error', 15],
    'max-depth': ['error', 15],
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
};