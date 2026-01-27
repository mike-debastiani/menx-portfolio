import { defineType, defineField, defineArrayMember } from 'sanity'
import { ListIcon } from '@sanity/icons'
import { paddingField } from './padding'

export default defineType({
  name: 'sectionBlockRows',
  title: 'Row Block',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionBlockRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'sectionBlockRowItem',
                  title: 'Item',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link (optional)',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'href',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label',
              items: 'items',
            },
            prepare({ title, items }) {
              const count = items?.length || 0
              return {
                title: title || 'Row',
                subtitle: count ? `${count} Items` : 'No items',
                media: ListIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Mindestens eine Row erforderlich'),
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
      rows: 'rows',
    },
    prepare({ rows }) {
      const count = rows?.length || 0
      return {
        title: `Rows (${count})`,
        subtitle: 'Row Block',
        media: ListIcon,
      }
    },
  },
})
