import { CollectionConfig } from 'payload/types'

export const Contact: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt', 'read'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      return Boolean(user);
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as read once you have reviewed this message',
      },
    },
    {
      name: 'responded',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as responded once you have replied to this contact',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Private notes about this contact submission',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // Here you could add code to send email notifications when a new contact is submitted
        // This hook runs after a document is created or updated
      },
    ],
  },
} 