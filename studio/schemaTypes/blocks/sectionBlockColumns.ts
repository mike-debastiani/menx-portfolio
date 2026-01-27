import { defineType, defineField, defineArrayMember } from 'sanity'
import { ListIcon } from '@sanity/icons'
import { paddingField } from './padding'

export default defineType({
  name: 'sectionBlockColumns',
  title: 'Column Block',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionBlockColumn',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'list',
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              items: 'items',
            },
            prepare({ title, items }) {
              const count = items?.length || 0
              return {
                title: title || 'Column',
                subtitle: count ? `${count} Items` : 'No items',
                media: ListIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Mindestens eine Spalte erforderlich'),
    }),
    paddingField,
    defineField({
      name: 'gridPlacement',
      title: 'Layout im Grid',
      type: 'gridPlacement',
      description: 'Steuert die Platzierung im Layout-Grid pro Breakpoint.',
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
    },
    prepare({ columns }) {
      const count = columns?.length || 0
      return {
        title: `Columns (${count})`,
        subtitle: 'Column Block',
        media: ListIcon,
      }
    },
  },
})
