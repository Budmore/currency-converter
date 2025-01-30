/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFiles: ["<rootDir>/__mocks__/setup.js"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "<rootDir>/__mocks__/css-file-mock.js",
  },
};
