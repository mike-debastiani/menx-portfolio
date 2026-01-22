import { defineType, defineField } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'
import { paddingField } from './padding'
import { coloredTextBlock } from './richText'

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
          of: [coloredTextBlock],
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
          of: [coloredTextBlock],
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
      name: 'columnColumns',
      title: 'Spaltenbereich (Columns)',
      type: 'object',
      description: 'Start- und End-Spalten pro Breakpoint.',
      fields: [
        defineField({
          name: 'base',
          title: 'Mobile (4 Spalten)',
          type: 'object',
          fields: [
            defineField({
              name: 'left',
              title: 'Links Start',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(4),
            }),
            defineField({
              name: 'leftEnd',
              title: 'Links Ende (Column)',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(4),
            }),
            defineField({
              name: 'right',
              title: 'Rechts Start',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(4),
            }),
            defineField({
              name: 'rightEnd',
              title: 'Rechts Ende (Column)',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(4),
            }),
          ],
        }),
        defineField({
          name: 'md',
          title: 'Tablet (6 Spalten)',
          type: 'object',
          fields: [
            defineField({
              name: 'left',
              title: 'Links Start',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(6),
            }),
            defineField({
              name: 'leftEnd',
              title: 'Links Ende (Column)',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(6),
            }),
            defineField({
              name: 'right',
              title: 'Rechts Start',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(6),
            }),
            defineField({
              name: 'rightEnd',
              title: 'Rechts Ende (Column)',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(6),
            }),
          ],
        }),
        defineField({
          name: 'lg',
          title: 'Desktop (12 Spalten)',
          type: 'object',
          fields: [
            defineField({
              name: 'left',
              title: 'Links Start',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                  { title: '7', value: 7 },
                  { title: '8', value: 8 },
                  { title: '9', value: 9 },
                  { title: '10', value: 10 },
                  { title: '11', value: 11 },
                  { title: '12', value: 12 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
            defineField({
              name: 'leftEnd',
              title: 'Links Ende (Column)',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                  { title: '7', value: 7 },
                  { title: '8', value: 8 },
                  { title: '9', value: 9 },
                  { title: '10', value: 10 },
                  { title: '11', value: 11 },
                  { title: '12', value: 12 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
            defineField({
              name: 'right',
              title: 'Rechts Start',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                  { title: '7', value: 7 },
                  { title: '8', value: 8 },
                  { title: '9', value: 9 },
                  { title: '10', value: 10 },
                  { title: '11', value: 11 },
                  { title: '12', value: 12 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
            defineField({
              name: 'rightEnd',
              title: 'Rechts Ende (Column)',
              type: 'number',
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                  { title: '5', value: 5 },
                  { title: '6', value: 6 },
                  { title: '7', value: 7 },
                  { title: '8', value: 8 },
                  { title: '9', value: 9 },
                  { title: '10', value: 10 },
                  { title: '11', value: 11 },
                  { title: '12', value: 12 },
                ],
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
          ],
        }),
      ],
      initialValue: {
        base: { left: 1, leftEnd: 2, right: 3, rightEnd: 4 },
        md: { left: 1, leftEnd: 3, right: 4, rightEnd: 6 },
        lg: { left: 1, leftEnd: 6, right: 7, rightEnd: 12 },
      },
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
