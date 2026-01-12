module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/test/.*\\.spec\\.[tj]s)$',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};
