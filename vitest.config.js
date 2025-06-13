// eslint-disable-next-line import/no-unresolved
const { defineConfig } = require('vitest/config');

const aux = defineConfig({
  test: {
    coverage: {
      reporter: ['text'],
    },
    include: ['**/*.{e2e,test,spec}.?(c|m)[jt]s?(x)'],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    globals: true,
    setupFiles: './e2e/test/setup.js',
  },
});

module.exports = aux;
