import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

//using jsdom to view tests on terminal
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    //setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/lib/**/*.ts'],
      exclude: ['src/lib/constants.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

// //viewing on browser console
// // vitest.config.ts
// import { defineConfig } from 'vitest/config'
// import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'
// import { playwright } from '@vitest/browser-playwright'

// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   test: {
//     browser: {
//       enabled: true,
//       provider: playwright(),
//       instances: [
//         { browser: 'chromium' }, // Opens Chrome/Chromium
//       ],
//     },
//   },
// })
