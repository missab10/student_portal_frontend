// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Add this
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Add this alias config
    },
  },
  plugins: [react(), tailwindcss()],
});
