import type { ArrayOfPrimitivesInputProps, ArraySchemaType } from 'sanity'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import type { ComponentType } from 'react'
import RichTextInput from '../../components/RichTextInput'
import { coloredTextBlock } from './richText'
import { paddingField } from './padding'

const richTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [coloredTextBlock],
    components: {
      input: RichTextInput as ComponentType<
        ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>
      >,
    },
  })

const extractPlainText = (blocks?: any[]) =>
  blocks
    ?.filter((block) => block?._type === 'block')
    .map((block) => block.children?.map((child: any) => child.text).join(''))
    .join(' ')
    .slice(0, 80)

export default defineType({
  name: 'cardsBlock',
  title: 'Cards Block',
  type: 'object',
  icon: ImageIcon,
  fields: [
    richTextField('title', 'Title (Optional)'),
    defineField({
      name: 'cardsPerRow',
      title: 'Cards pro Zeile',
      type: 'object',
      description: 'Anzahl Cards pro Zeile je Breakpoint. Bei zu kleiner Breite wird automatisch umbrochen.',
      fields: [
        defineField({
          name: 'base',
          title: 'Mobile (Base)',
          type: 'number',
          options: {
            list: [1, 2, 3, 4].map((value) => ({ title: `${value}`, value })),
          },
          initialValue: 1,
          validation: (Rule) => Rule.min(1).max(4),
        }),
        defineField({
          name: 'md',
          title: 'Tablet (md)',
          type: 'number',
          options: {
            list: [1, 2, 3, 4].map((value) => ({ title: `${value}`, value })),
          },
          initialValue: 2,
          validation: (Rule) => Rule.min(1).max(4),
        }),
        defineField({
          name: 'xl',
          title: 'Desktop (xl)',
          type: 'number',
          options: {
            list: [1, 2, 3, 4].map((value) => ({ title: `${value}`, value })),
          },
          initialValue: 3,
          validation: (Rule) => Rule.min(1).max(4),
        }),
      ],
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'cardsBlockCard',
          title: 'Card',
          type: 'object',
          icon: ImageIcon,
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) =>
                Rule.required().warning('Alt-Text ist wichtig für Barrierefreiheit.'),
            }),
            richTextField('content', 'Content'),
          ],
          preview: {
            select: {
              content: 'content',
              media: 'image',
            },
            prepare({ content, media }) {
              const text = extractPlainText(content)
              return {
                title: text || 'Card',
                subtitle: 'Cards Block',
                media: media ?? ImageIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Mindestens eine Card erforderlich'),
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
      cards: 'cards',
    },
    prepare({ title, cards }) {
      const text = extractPlainText(title)
      const count = cards?.length || 0
      return {
        title: text || `Cards (${count})`,
        subtitle: 'Cards Block',
        media: ImageIcon,
      }
    },
  },
})
