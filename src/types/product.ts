// src/types/product.ts
export interface SaasProduct {
    id: string;
    title: string;
    slug: string;
    description: any; // Rich text content
    logo: {
      url: string;
      alt: string;
    };
    screenshots: Array<{
      image: {
        url: string;
        alt: string;
      };
      caption: string;
    }>;
    category: string;
    subcategories: Array<{ subcategory: string }>;
    pricingTiers: Array<{
      name: string;
      price: number;
      billing: 'monthly' | 'yearly';
      features: Array<{ feature: string }>;
    }>;
    integrations: Array<{ integration: string }>;
    technicalRequirements: Array<{ requirement: string }>;
    status: 'active' | 'inactive';
    featuredOn?: string;
    version?: string;
  }