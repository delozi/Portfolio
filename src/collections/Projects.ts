import { CollectionConfig } from 'payload/types'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectType', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the project title (no spaces or special characters)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
    },
    {
      name: 'projectType',
      type: 'select',
      options: [
        { label: 'Web Development', value: 'web' },
        { label: 'Mobile App', value: 'mobile' },
        { label: 'UI/UX Design', value: 'design' },
        { label: 'Open Source', value: 'open-source' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
      admin: {
        description: 'Add multiple images to showcase your project',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of the project (1-2 sentences)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies Used',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'projectLinks',
      type: 'group',
      fields: [
        {
          name: 'liveUrl',
          label: 'Live Project URL',
          type: 'text',
        },
        {
          name: 'githubUrl',
          label: 'GitHub Repository URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      label: 'Feature on homepage',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'completionDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
} 