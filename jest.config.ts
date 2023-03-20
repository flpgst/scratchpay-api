import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  setupFiles: ['./src/bootstrap.ts'],
  testRunner: 'jest-jasmine2',
  collectCoverage: true,
  coverageReporters: ['cobertura'],
  transform: {
    '.+\\.ts$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testTimeout: 30000,
};

export default config;
