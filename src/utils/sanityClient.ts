import { createClient } from '@sanity/client';

const SanityDatabase = createClient({
  projectId: 'icuoh1le',  // Replace with your Sanity project ID
  dataset: 'production',  // Replace with your dataset name (e.g., 'production')
  apiVersion: '2024-12-24',      // Use the current date in 'YYYY-MM-DD' format
  token: 'your-sanity-token',    // Optional: If using a token for authentication
  useCdn: true,                  // Use the CDN for faster read access
});

export default SanityDatabase;
