// src/collections/SaasProducts.ts
import { CollectionConfig } from 'payload'

const SaasProducts: CollectionConfig = {
  slug: 'saas-products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the SaaS product'
      }
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title'
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'screenshots',
      type: 'array',
      required: false,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Analytics', value: 'analytics' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Sales', value: 'sales' },
        { label: 'Development', value: 'development' },
        { label: 'Design', value: 'design' },
        { label: 'Productivity', value: 'productivity' },
        { label: 'Finance', value: 'finance' },
        { label: 'HR', value: 'hr' },
        { label: 'Customer Support', value: 'customer-support' },
      ],
    },
    {
      name: 'subcategories',
      type: 'array',
      admin: {
        description: 'Additional categories that this product belongs to'
      },
      fields: [
        {
          name: 'subcategory',
          type: 'text',
        },
      ],
    },
    {
      name: 'pricingTiers',
      type: 'array',
      required: true,
      admin: {
        description: 'Different pricing plans offered by the product'
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'billing',
          type: 'select',
          options: [
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
            { label: 'One-time', value: 'one-time' },
          ],
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'integrations',
      type: 'array',
      admin: {
        description: 'List of platforms and services this product integrates with'
      },
      fields: [
        {
          name: 'integration',
          type: 'text',
        },
      ],
    },
    {
      name: 'technicalRequirements',
      type: 'array',
      admin: {
        description: 'Technical specifications or requirements needed to use the product'
      },
      fields: [
        {
          name: 'requirement',
          type: 'text',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    {
      name: 'featuredOn',
      type: 'date',
      admin: {
        description: 'Date when this product was featured'
      },
    },
    {
      name: 'version',
      type: 'text',
      admin: {
        description: 'Current version of the product'
      },
    },
  ],
}

export default SaasProducts