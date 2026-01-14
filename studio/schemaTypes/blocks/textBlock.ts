import { defineType, defineField } from 'sanity'
import { TextIcon } from '@sanity/icons'

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
      of: [{ type: 'block' }],
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
    defineField({
      name: 'maxWidth',
      title: 'Maximale Breite',
      type: 'string',
      description: 'Begrenzt die Breite des Textblocks für bessere Lesbarkeit',
      options: {
        list: [
          { title: 'Vollbreite', value: 'full' },
          { title: 'Schmal (ca. 65ch)', value: 'narrow' },
          { title: 'Mittel (ca. 80ch)', value: 'medium' },
          { title: 'Breit (ca. 100ch)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
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
