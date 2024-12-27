import { createClient } from '@sanity/client';

const SanityDatabase = createClient({
  projectId: 'icuoh1le', 
  dataset: 'production', 
  apiVersion: '2023-01-01', 
  useCdn: true, 
});

export default SanityDatabase;
