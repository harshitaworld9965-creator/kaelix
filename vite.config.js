import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite + React setup. Nothing exotic here — the interesting
// work all lives in /src.
export default defineConfig({
  plugins: [react()],
});
