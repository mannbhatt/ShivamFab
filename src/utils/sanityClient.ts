import sanityClient from '@sanity/client';

const SantiyDatabase = sanityClient({
  projectId: 'icuoh1le', // Replace with your project ID
  dataset: 'production',       // Replace with your dataset name
  apiVersion: '2023-01-01',    // Use a specific API version
  useCdn: true,                // `true` if you want fast responses, `false` for fresh data
});

export default SantiyDatabase;
