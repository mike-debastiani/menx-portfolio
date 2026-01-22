import { defineType, defineField } from 'sanity'
import { TextIcon } from '@sanity/icons'
import { paddingField } from './padding'
import { coloredTextBlock } from './richText'

export default defineType({
  name: 'textBlock',
  title: 'Textblock',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [coloredTextBlock],
      description: 'Rich Text Inhalt für den Textblock',
    }),
    defineField({
      name: 'alignment',
      title: 'Ausrichtung',
      type: 'string',
      options: {
        list: [
          { title: 'Links', value: 'left' },
          { title: 'Zentriert', value: 'center' },
          { title: 'Rechts', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
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
      content: 'content',
    },
    prepare({ content }) {
      const text = content
        ? content
            .filter((block: any) => block._type === 'block')
            .map((block: any) => block.children?.map((child: any) => child.text).join(''))
            .join(' ')
            .slice(0, 100)
        : 'Leerer Textblock'
      return {
        title: text || 'Textblock',
        subtitle: 'Textblock',
        media: TextIcon,
      }
    },
  },
})
