import { defineCollection, z } from "astro:content";

// Define the 'clients' collection
const clientsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    clients: z.array(
      z.object({
        name: z.string(),
        logo: z.string(),
      })
    ),
  }),
});

// Define the 'features' collection
const featuresCollection = defineCollection({
  schema: z.object({
    heading: z.string(),
    subheading: z.string(),
    features: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    ),
  }),
});

// Export both collections
export const collections = {
  clients: clientsCollection,
  features: featuresCollection,
};
