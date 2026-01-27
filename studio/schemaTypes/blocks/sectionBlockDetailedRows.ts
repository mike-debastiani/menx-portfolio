import { defineType, defineField, defineArrayMember } from 'sanity'
import { ListIcon } from '@sanity/icons'
import { coloredTextBlock } from './richText'
import RichTextInput from '../../components/RichTextInput'
import { paddingField } from './padding'

export default defineType({
  name: 'sectionBlockDetailedRows',
  title: 'Detailed Rows',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [coloredTextBlock],
      components: { input: RichTextInput },
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionBlockDetailedRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [coloredTextBlock],
              components: { input: RichTextInput },
            }),
          ],
          preview: {
            select: {
              content: 'content',
            },
            prepare({ content }) {
              const text = content
                ? content
                    .filter((block: any) => block._type === 'block')
                    .map((block: any) => block.children?.map((child: any) => child.text).join(''))
                    .join(' ')
                    .slice(0, 80)
                : ''
              return {
                title: text || 'Row',
                subtitle: 'Detailed Row',
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
      title: 'title',
      rows: 'rows',
    },
    prepare({ title, rows }) {
      const text = title
        ? title
            .filter((block: any) => block._type === 'block')
            .map((block: any) => block.children?.map((child: any) => child.text).join(''))
            .join(' ')
            .slice(0, 60)
        : ''
      const count = rows?.length || 0
      return {
        title: text || 'Detailed Rows',
        subtitle: `${count} Rows`,
        media: ListIcon,
      }
    },
  },
})
