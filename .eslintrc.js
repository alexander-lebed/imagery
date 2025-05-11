module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  rules: {
    'no-console': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};
