module.exports = {
    preset: 'ts-jest', // For handling TypeScript
    testEnvironment: 'jsdom', // For React testing environment
    transform: {
      '^.+\\.[tj]sx?$': 'ts-jest', // Handling .tsx and .ts files
    },
    moduleNameMapper: {
      // Ensure Axios uses its CJS version
      '^axios$': 'axios/dist/node/axios.cjs',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Ensure Axios is not ignored
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testMatch: [
      '**/?(*.)+(spec|test).[tj]s?(x)', // Match test files with .test.tsx or .spec.tsx extensions
    ],
  };
  