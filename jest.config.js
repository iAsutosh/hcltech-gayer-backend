// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest', // Use babel-jest to transform ES6 modules
    },
    transformIgnorePatterns: [
      '/node_modules/(?!your-es6-package)', // Specify any ES6 modules to transform
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Stub out non-JS files (e.g., CSS modules)
    },
  };
  