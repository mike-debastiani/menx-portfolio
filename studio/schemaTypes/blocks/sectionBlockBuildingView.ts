import type { ArrayOfPrimitivesInputProps, ArraySchemaType } from 'sanity'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'
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
  name: 'sectionBlockBuildingView',
  title: 'Building View (Vertical Cards)',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    richTextField('title', 'Title (Rich Text)'),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionBlockBuildingViewCard',
          title: 'Card',
          type: 'object',
          fields: [
            defineField({
              name: 'backgroundColor',
              title: 'Background Color (HEX)',
              type: 'string',
              description: 'z.B. #FFFFFF oder #0F172A',
              validation: (Rule) =>
                Rule.required().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                  name: 'hex',
                  invert: false,
                }),
            }),
            defineField({
              name: 'icon',
              title: 'Icon (SVG)',
              type: 'file',
              options: {
                accept: '.svg',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'iconAlt',
              title: 'Icon Alt Text',
              type: 'string',
              description: 'Für Screenreader. Optional, falls rein dekorativ.',
            }),
            richTextField('content', 'Rich Text'),
          ],
          preview: {
            select: {
              content: 'content',
            },
            prepare({ content }) {
              const text = extractPlainText(content)
              return {
                title: text || 'Card',
                subtitle: 'Building View',
                media: BlockContentIcon,
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
        title: text || `Building View (${count})`,
        subtitle: 'Vertical Cards',
        media: BlockContentIcon,
      }
    },
  },
})
