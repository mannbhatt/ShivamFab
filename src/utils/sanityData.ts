
import SanityDatabase from "./sanityClient";

//fetch the data for investors_partners
export interface Client {
    name: string;
    logo: string;
  }
  
  export async function fetchClientData(): Promise<Client[]> { //it fetch investors_partner data from sanity
    const data = await SanityDatabase.fetch(`
      *[_type == "client"]{
        name,
        "logo": logo.asset->url
      }
    `);
  
    //console.log(data);  // You can log the fetched data to check
  
    return data || [];  // Ensure an empty array is returned if no data is found
  }



  //fetch the data for short and long benifits
  export interface LongBenefit {
    title: string;
    description: string;
    icon?: string; // Optional if not every benefit has an icon
  }
  
  export interface ShortBenefit {
    title: string;
    description: string;
  }
  
  export async function fetchLongBenefits(): Promise<LongBenefit[]> {
    const data = await SanityDatabase.fetch(`
      *[_type == "longbenefits"]{
        title,
        description,
        "icon": icon.asset->url
      }
    `);
    return data || []; // Ensure it always returns an array
  }
  
export async function fetchShortBenefits(): Promise<ShortBenefit[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "shortbenefits"]{
      title,
      description
    }
  `);
  return data || []; // Ensure it always returns an array
}
  
export interface ServiceImage {
  src: string; // The image source URL
  alt: string; // Alt text for accessibility
}

export interface Service {
  title: string;
  slug: string; // Add slug to the service interface
  description: string;
  images: ServiceImage[]; // Array of images with src and alt attributes
}

export async function fetchServices(): Promise<Service[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "services"]{
      title,
      "slug": slug.current, // Fetch the current value of the slug
      description,
      images[] {
        // Check if it's an uploaded image and get its URL and alt text
        _type == "image" => {
          "src": asset->url,
          "alt": alt
        }
      }
    }
  `);

  // Transform the data to match the Service interface structure
  return data.map((service: any) => ({
    title: service.title,
    slug: service.slug, // Map the slug value
    description: service.description,
    images: service.images?.map((image: any) => ({
      src: image.src,
      alt: image.alt || "No description available", // Default alt text
    })) || [], // Ensure images is an empty array if not available
  })) || []; // Ensure it always returns an array
}

//fetch the casestudt data
export interface CaseStudyImage {
  src: string; // The image source URL
  alt: string; // Alt text for accessibility
}

export interface CaseStudy {
  title: string; // The title of the case study
  slug: string;  // Slug for dynamic routing
  description: string; // The description of the case study
  images: CaseStudyImage[]; // Array of images related to the case study
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "caseStudy"]{
      title,
      "slug": slug.current, // Fetch the current value of the slug
      description,
      images[] {
        // Check if it's an uploaded image and get its URL and alt text
        _type == "image" => {
          "src": asset->url,
          "alt": alt
        }
      }
    }
  `);

  // Transform the data to match the CaseStudy interface structure
  return data.map((caseStudy: any) => ({
    title: caseStudy.title,
    slug: caseStudy.slug, // Map the slug value
    description: caseStudy.description,
    images: caseStudy.images?.map((image: any) => ({
      src: image.src,
      alt: image.alt || "No description available", // Default alt text
    })) || [], // Ensure images is an empty array if not available
  })) || []; // Ensure it always returns an array
}



//fetch the industry data
export interface IndustryImage {
  src: string; // The image source URL
  alt: string; // Alt text for accessibility
}

export interface Industry {
  title: string; // The title of the industry
  slug: string;  // Slug for dynamic routing
  description: string; // The description of the industry
  images: IndustryImage[]; // Array of images related to the industry
}

export async function fetchIndustry(): Promise<Industry[]> {
  const data = await SanityDatabase.fetch(`
    *[_type == "Industry"]{
      title,
      "slug": slug.current,
      description,
      images[] {
        _type == "image" => {
          "src": asset->url,
          "alt": alt
        }
      }
    }
  `);

  // Transform the data to match the Industry interface structure
  return data.map((industry: any) => ({
    title: industry.title,
    slug: industry.slug,
    description: industry.description,
    images: industry.images?.map((image: any) => ({
      src: image.src,
      alt: image.alt || "No description available", // Default alt text if not available
    })) || [], // Ensure images is an empty array if not available
  })) || []; // Ensure it always returns an array
}
