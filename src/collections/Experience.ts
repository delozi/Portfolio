import { CollectionConfig } from 'payload/types'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'position', 'startDate', 'endDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'City, State or Remote',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndMonth',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Leave blank if this is your current position',
        date: {
          pickerAppearance: 'dayAndMonth',
        },
      },
    },
    {
      name: 'current',
      type: 'checkbox',
      label: 'I currently work here',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Describe your responsibilities and achievements',
      },
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      admin: {
        description: 'Skills utilized in this position',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
} 