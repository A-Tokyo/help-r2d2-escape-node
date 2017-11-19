module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/__flow__/**',
  ],
  coverageDirectory: './coverage',
};
