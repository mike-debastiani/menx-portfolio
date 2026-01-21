import { defineField } from 'sanity'

const paddingValues = [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48]

const paddingTopOptions = [
  { title: 'Standard', value: '' },
  ...paddingValues.map((value) => ({ title: `pt-${value}`, value: `pt-${value}` })),
]

const paddingBottomOptions = [
  { title: 'Standard', value: '' },
  ...paddingValues.map((value) => ({ title: `pb-${value}`, value: `pb-${value}` })),
]

export const paddingField = defineField({
  name: 'padding',
  title: 'Padding (Optional)',
  type: 'object',
  description: 'Überschreibt das vertikale Padding pro Breakpoint.',
  fields: [
    defineField({
      name: 'base',
      title: 'Mobile (Base)',
      type: 'object',
      fields: [
        defineField({
          name: 'pt',
          title: 'Padding Top',
          type: 'string',
          options: { list: paddingTopOptions },
        }),
        defineField({
          name: 'pb',
          title: 'Padding Bottom',
          type: 'string',
          options: { list: paddingBottomOptions },
        }),
      ],
    }),
    defineField({
      name: 'md',
      title: 'Tablet (md)',
      type: 'object',
      fields: [
        defineField({
          name: 'pt',
          title: 'Padding Top',
          type: 'string',
          options: { list: paddingTopOptions },
        }),
        defineField({
          name: 'pb',
          title: 'Padding Bottom',
          type: 'string',
          options: { list: paddingBottomOptions },
        }),
      ],
    }),
    defineField({
      name: 'xl',
      title: 'Desktop (xl)',
      type: 'object',
      fields: [
        defineField({
          name: 'pt',
          title: 'Padding Top',
          type: 'string',
          options: { list: paddingTopOptions },
        }),
        defineField({
          name: 'pb',
          title: 'Padding Bottom',
          type: 'string',
          options: { list: paddingBottomOptions },
        }),
      ],
    }),
  ],
})
