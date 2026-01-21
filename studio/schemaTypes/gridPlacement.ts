import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gridPlacement',
  title: 'Layout im Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'mobile',
      title: 'Mobile (4 Spalten)',
      type: 'object',
      fields: [
        defineField({
          name: 'start',
          title: 'Start-Spalte',
          type: 'number',
          options: {
            list: [1, 2, 3, 4].map((value) => ({ title: `${value}`, value })),
          },
          initialValue: 1,
          validation: (Rule) => Rule.required().min(1).max(4),
        }),
        defineField({
          name: 'end',
          title: 'End-Spalte',
          type: 'number',
          options: {
            list: [1, 2, 3, 4].map((value) => ({ title: `${value}`, value })),
          },
          initialValue: 4,
          validation: (Rule) => Rule.required().min(1).max(4),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value: { start?: number; end?: number } | undefined) => {
          if (!value?.start || !value?.end) return true
          return value.start <= value.end ? true : 'Start-Spalte muss kleiner/gleich End-Spalte sein'
        }),
    }),
    defineField({
      name: 'tablet',
      title: 'Tablet (6 Spalten)',
      type: 'object',
      fields: [
        defineField({
          name: 'start',
          title: 'Start-Spalte',
          type: 'number',
          options: {
            list: [1, 2, 3, 4, 5, 6].map((value) => ({ title: `${value}`, value })),
          },
          initialValue: 1,
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
        defineField({
          name: 'end',
          title: 'End-Spalte',
          type: 'number',
          options: {
            list: [1, 2, 3, 4, 5, 6].map((value) => ({ title: `${value}`, value })),
          },
          initialValue: 6,
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value: { start?: number; end?: number } | undefined) => {
          if (!value?.start || !value?.end) return true
          return value.start <= value.end ? true : 'Start-Spalte muss kleiner/gleich End-Spalte sein'
        }),
    }),
    defineField({
      name: 'desktop',
      title: 'Desktop (12 Spalten)',
      type: 'object',
      fields: [
        defineField({
          name: 'start',
          title: 'Start-Spalte',
          type: 'number',
          options: {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => ({
              title: `${value}`,
              value,
            })),
          },
          initialValue: 1,
          validation: (Rule) => Rule.required().min(1).max(12),
        }),
        defineField({
          name: 'end',
          title: 'End-Spalte',
          type: 'number',
          options: {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => ({
              title: `${value}`,
              value,
            })),
          },
          initialValue: 12,
          validation: (Rule) => Rule.required().min(1).max(12),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value: { start?: number; end?: number } | undefined) => {
          if (!value?.start || !value?.end) return true
          return value.start <= value.end ? true : 'Start-Spalte muss kleiner/gleich End-Spalte sein'
        }),
    }),
  ],
})
