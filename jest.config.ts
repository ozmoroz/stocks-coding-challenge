/* Jest config file for Next.js
 * ref: https://github.com/vercel/next.js/blob/canary/examples/with-jest/jest.config.js
 * https://jestjs.io/docs/configuration
 */
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/interfaces/(.*)$': '<rootDir>/interfaces/$1',
    '^@/mocks/(.*)$': '<rootDir>/mocks/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/state/(.*)$': '<rootDir>/state/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    // TODO: There must be better way to do this, but I couldn't find it :-()
    '^interfaces/constants$': '<rootDir>/interfaces/constants.ts',
    '^mocks/stocks.mock$': '<rootDir>/mocks/stocks.mock.ts',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
