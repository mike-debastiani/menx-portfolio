import { defineType, defineField, defineArrayMember } from 'sanity'
import { ListIcon } from '@sanity/icons'
import { coloredTextBlock } from './richText'
import RichTextInput from '../../components/RichTextInput'
import { paddingField } from './padding'

export default defineType({
  name: 'sectionBlockAccordion',
  title: 'Accordion',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionBlockAccordionItem',
          title: 'Accordion Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'array',
              of: [coloredTextBlock],
              components: { input: RichTextInput },
            }),
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
              title: 'title',
              content: 'content',
            },
            prepare({ title, content }) {
              const titleText = title
                ? title
                    .filter((block: any) => block._type === 'block')
                    .map((block: any) => block.children?.map((child: any) => child.text).join(''))
                    .join(' ')
                    .slice(0, 60)
                : ''
              const contentText = content
                ? content
                    .filter((block: any) => block._type === 'block')
                    .map((block: any) => block.children?.map((child: any) => child.text).join(''))
                    .join(' ')
                    .slice(0, 60)
                : ''
              return {
                title: titleText || 'Accordion Item',
                subtitle: contentText || 'Accordion Content',
                media: ListIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Mindestens ein Item erforderlich'),
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
      items: 'items',
    },
    prepare({ items }) {
      const count = items?.length || 0
      return {
        title: `Accordion (${count})`,
        subtitle: 'Accordion Block',
        media: ListIcon,
      }
    },
  },
})
