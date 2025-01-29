/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
