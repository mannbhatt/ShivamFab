// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), // Add React integration
    tailwind() // Add Tailwind CSS integration
  ],

  server: {
    host: true, // Allow access from the local network
  },
});
