import { CollectionConfig } from 'payload/types'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'level', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icon or logo for this skill (SVG preferred)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Programming Languages', value: 'languages' },
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Databases', value: 'databases' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Design', value: 'design' },
        { label: 'Tools', value: 'tools' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
    },
    {
      name: 'yearsOfExperience',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Number of years experience with this skill',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of your experience with this skill',
      },
    },
    {
      name: 'featured',
      label: 'Feature on homepage',
      type: 'checkbox',
      defaultValue: false,
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