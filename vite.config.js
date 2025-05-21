import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: "/housing-clean-frontend/", // Set this to match your GitHub repo name

  build: {
    outDir: "dist",
  },
});
