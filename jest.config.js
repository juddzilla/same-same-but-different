export default {
  // "moduleDirectories": [
  //   "node_modules",
  //   "packages/*/node_modules",
  // ],
  // moduleNameMapper: {
  //   "^packages/(.*)$": "<rootDir>/packages/$1",
  // },
  // "modulePaths": [
  //   "<rootDir>/node_modules",
  //   "<rootDir>/packages/*/domain-lib/src/"
  // ],
  // "projects": ['packages/*'],
  // "roots": [
  //   "<rootDir>",
  //   "packages/"
  // ],
  // resetModules: true,
  setupFiles: [
    './jest-setup.js',
  ],
  testEnvironment: 'jest-environment-node',
  transform: {},
};