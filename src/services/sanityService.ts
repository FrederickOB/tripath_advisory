import sanityClient from "@/lib/sanity";
import type {
  ImpactStat,
  Team,
  Service,
  Testimonial,
  Client,
  ClientService,
  Insight,
  Author,
  Category,
  Bio,
} from "@/types/schema";
import type { QueryParams } from "@/types/queryParams";

// Impact Stats
export const fetchImpactStats = async (): Promise<ImpactStat[]> => {
  return await sanityClient.fetch(`
    *[_type == "impactStat" && value > 0] {
      _id,
      value,
      label,
      suffix,
      prefix
    }
  `);
};

// Team Members
export const fetchTeamMembers = async (): Promise<Team[]> => {
  return await sanityClient.fetch(`
    *[_type == "team"] | order(order asc) {
      _id,
      name,
      role,
      linkedin_link,
      bio,
      "image": image.asset->{
        url,
        metadata
      },
      fullProfile
    }
  `);
};

// Services
export const fetchServices = async (): Promise<Service[]> => {
  return await sanityClient.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      icon,
      "image": image.asset->{
        url,
        metadata
      },
      benefits,
      approach,
      frameworks
    }
  `);
};

// Testimonials
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  return await sanityClient.fetch(`
    *[_type == "testimonial"] {
      _id,
      name,
      position,
      company,
      "image": image.asset->{
        url,
        metadata
      },
      text
    }
  `);
};

// Clients
export const fetchClients = async (): Promise<Client[]> => {
  return await sanityClient.fetch(`
    *[_type == "client"] {
      _id,
      name,
      "logo": logo.asset->{
        url,
        metadata
      },
      description,
      website
    }
  `);
};

export const fetchBio = async (): Promise<Bio[]> => {
  return await sanityClient.fetch(`
    *[_type == "bio"] {
      _id,
      name,
     body
    }
  `);
};

// Client Services (Case Studies)
export const fetchClientServices = async (): Promise<ClientService[]> => {
  return await sanityClient.fetch(`
    *[_type == "client_service"] {
      _id,
      title,
      "service": service->{
        title,
        description
      },
      "client": client->{
        name,
        logo
      },
      description,
      metrics
    }
  `);
};

// Insights/Blog Posts with pagination, search, and filtering
export const fetchInsights = async (
  params?: QueryParams
): Promise<{ insights: Insight[]; total: number }> => {
  const { limit = 10, offset = 0, sort, filters } = params || {};

  // Build filter conditions
  let filterConditions = '_type == "insight"';

  if (filters) {
    // Handle search query
    if (filters.search) {
      const searchTerm = filters.search.toString();
      filterConditions += ` && (title match "*${searchTerm}*" || summary match "*${searchTerm}*")`;
    }

    // Handle category filter
    if (filters.category && filters.category !== "All") {
      filterConditions += ` && "${filters.category}" in categories[]->title`;
    }

    // Handle author filter
    if (filters.author) {
      filterConditions += ` && author->name match "*${filters.author}*"`;
    }

    // Handle date range filter
    if (filters.fromDate && filters.toDate) {
      filterConditions += ` && (publishedAt >= "${filters.fromDate}" && publishedAt <= "${filters.toDate}")`;
    }
  }

  // Build sort condition
  const sortCondition = sort
    ? `| order(${sort.field} ${sort.direction})`
    : "| order(publishedAt desc)";

  // Count total matching documents for pagination
  const totalQuery = `count(*[${filterConditions}])`;
  const total = await sanityClient.fetch(totalQuery);

  // Fetch paginated results
  const query = `{
    "insights": *[${filterConditions}] ${sortCondition}[${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      "author": author->{
        name,
        "image": image.asset->{
          url,
          metadata
        }
      },
      "mainImage": mainImage.asset->{
        url,
        metadata
      },
      "categories": categories[]->{
        title
      },
      publishedAt,
      summary,
      body
    },
    "total": ${total}
  }`;

  return await sanityClient.fetch(query);
};

// Single Insight with related posts
export const fetchInsightBySlug = async (
  slug: string
): Promise<{ insight: Insight; relatedInsights: Insight[] }> => {
  const query = `{
    "insight": *[_type == "insight" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      "author": author->{
        name,
        "image": image.asset->{
          url,
          metadata
        }
      },
      "mainImage": mainImage.asset->{
        url,
        metadata
      },
      "categories": categories[]->{
        _id,
        title
      },
      publishedAt,
      summary,
      body
    },
    "relatedInsights": *[_type == "insight" && slug.current != $slug && count(categories[]->{_id} [@._id in ^.^.insight.categories[]._id]) > 0] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      "author": author->{
        name
      },
      "mainImage": mainImage.asset->{
        url
      },
      publishedAt,
      summary
    }
  }`;

  return await sanityClient.fetch(query, { slug });
};

// Categories with count of associated insights
export const fetchCategories = async (): Promise<
  (Category & { count: number })[]
> => {
  return await sanityClient.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      description,
      "count": count(*[_type == "insight" && references(^._id)])
    }
  `);
};

// Authors with count of associated insights
export const fetchAuthors = async (): Promise<
  (Author & { count: number })[]
> => {
  return await sanityClient.fetch(`
    *[_type == "author"] {
      _id,
      name,
      "image": image.asset->{
        url,
        metadata
      },
      "count": count(*[_type == "insight" && references(^._id)])
    }
  `);
};
