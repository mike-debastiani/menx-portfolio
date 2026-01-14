import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export default defineType({
  name: 'twoColumn',
  title: 'Zwei Spalten',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'leftColumn',
      title: 'Linke Spalte',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Typ',
          type: 'string',
          options: {
            list: [
              { title: 'Text', value: 'text' },
              { title: 'Bild', value: 'image' },
            ],
            layout: 'radio',
          },
          initialValue: 'text',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
          hidden: ({ parent }) => parent?.type !== 'text',
        }),
        defineField({
          name: 'image',
          title: 'Bild',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
        defineField({
          name: 'imageAlt',
          title: 'Bild Alt-Text',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
      ],
    }),
    defineField({
      name: 'rightColumn',
      title: 'Rechte Spalte',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Typ',
          type: 'string',
          options: {
            list: [
              { title: 'Text', value: 'text' },
              { title: 'Bild', value: 'image' },
            ],
            layout: 'radio',
          },
          initialValue: 'text',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
          hidden: ({ parent }) => parent?.type !== 'text',
        }),
        defineField({
          name: 'image',
          title: 'Bild',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
        defineField({
          name: 'imageAlt',
          title: 'Bild Alt-Text',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
      ],
    }),
    defineField({
      name: 'columnRatio',
      title: 'Spaltenverhältnis',
      type: 'string',
      description: 'Verhältnis der Spaltenbreiten',
      options: {
        list: [
          { title: '50/50', value: '50-50' },
          { title: '40/60', value: '40-60' },
          { title: '60/40', value: '60-40' },
          { title: '33/67', value: '33-67' },
          { title: '67/33', value: '67-33' },
        ],
        layout: 'radio',
      },
      initialValue: '50-50',
    }),
  ],
  preview: {
    select: {
      leftType: 'leftColumn.type',
      rightType: 'rightColumn.type',
    },
    prepare({ leftType, rightType }) {
      return {
        title: 'Zwei Spalten',
        subtitle: `${leftType || 'Text'} / ${rightType || 'Text'}`,
        media: BlockContentIcon,
      }
    },
  },
})
