import { CollectionConfig } from 'payload/types'

export const About: CollectionConfig = {
  slug: 'about',
  admin: {
    useAsTitle: 'name',
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
      name: 'title',
      label: 'Professional Title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Full Stack Developer" or "UX Designer"',
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'shortBio',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief introduction for homepage (1-2 sentences)',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Dribbble', value: 'dribbble' },
            { label: 'Behance', value: 'behance' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Medium', value: 'medium' },
            { label: 'Dev.to', value: 'devto' },
            { label: 'CodePen', value: 'codepen' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'customLabel',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.platform === 'other',
            description: 'Name of the platform if "Other" is selected',
          },
        },
      ],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload your resume/CV (PDF format recommended)',
      },
    },
    {
      name: 'interests',
      type: 'array',
      fields: [
        {
          name: 'interest',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'institution',
          type: 'text',
          required: true,
        },
        {
          name: 'degree',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldOfStudy',
          type: 'text',
        },
        {
          name: 'startYear',
          type: 'number',
          required: true,
        },
        {
          name: 'endYear',
          type: 'number',
        },
        {
          name: 'current',
          type: 'checkbox',
          label: 'Currently studying here',
          defaultValue: false,
        },
      ],
    },
  ],
} 