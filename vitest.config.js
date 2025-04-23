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
  },
});

module.exports = aux;
