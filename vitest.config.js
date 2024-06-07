// No logre agregar el rule adecuado para ignorar en el .eslintrc.json
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text'],
    },
    include: ['**/*.{e2e,test,spec}.?(c|m)[jt]s?(x)'],
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
})
