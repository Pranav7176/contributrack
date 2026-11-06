import { defineConfig } from 'vite';

// Keep JSX compatible with the classic React transform without adding
// repetitive imports to every component.
export default defineConfig({
  esbuild: { jsxInject: "import React from 'react'" }
});
