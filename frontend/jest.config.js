module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/*.spec.ts?(x)'],
  automock: false,
  setupFiles: [
    "./jest.setup.js"
  ]
};
