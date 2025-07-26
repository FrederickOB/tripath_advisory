import { Slug, PortableTextBlock } from "sanity";

export interface Author {
  _id: string;
  _type: "author";
  name: string;
  image?: { url?: string };
}

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  description?: string;
}

export interface ImpactStat {
  _id: string;
  _type: "impactStat";
  statType: "Projects Completed" | "Lives Touched" | "Clients Satisfied";
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface Team {
  _id: string;
  _type: "team";
  name: string;
  role: string;
  linkedin_link?: string;
  bio?: string;
  image?: { url?: string };
  fullProfile?: PortableTextBlock[];
}

export interface Testimonial {
  _id: string;
  _type: "testimonial";
  name: string;
  position: string;
  company: string;
  image: { url?: string };
  text: string;
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  description: string;
  icon?: string;
  image: { url?: string };
  benefits?: string[];
  approach?: string[];
  frameworks?: string[];
}

export interface Client {
  _id: string;
  _type: "client";
  name: string;
  logo: { url?: string };
  description?: string;
  website?: string;
}

export interface ClientService {
  _id: string;
  _type: "client_service";
  title: string;
  service: { _ref: string };
  client: { _ref: string };
  description: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
}

export interface Insight {
  _id: string;
  _type: "insight";
  title: string;
  slug: Slug;
  author?: Author;
  mainImage?: { url?: string };
  categories?: Array<Category>;
  publishedAt?: string | Date;
  summary?: string;
  body?: PortableTextBlock[];
}
export interface Bio {
  _id: string;
  _type: "bio";
  body?: PortableTextBlock[];
}
