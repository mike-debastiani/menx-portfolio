import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'
import { paddingField } from './padding'

const sectionBlockMembers = [
  defineArrayMember({ type: 'sectionBlockText' }),
  defineArrayMember({ type: 'sectionBlockColumns' }),
  defineArrayMember({ type: 'sectionBlockRows' }),
  defineArrayMember({ type: 'sectionBlockDetailedRows' }),
  defineArrayMember({ type: 'sectionBlockAccordion' }),
  defineArrayMember({ type: 'sectionBlockImage' }),
]

export default defineType({
  name: 'twoColumnLayout',
  title: 'Zwei Blöcke',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'leftBlock',
      title: 'Linker Block',
      type: 'array',
      of: sectionBlockMembers,
      validation: (Rule) => Rule.min(1).max(1).error('Bitte genau einen Block hinzufügen'),
      options: {
        insertMenu: { views: [{ name: 'grid' }] },
      },
    }),
    defineField({
      name: 'rightBlock',
      title: 'Rechter Block',
      type: 'array',
      of: sectionBlockMembers,
      validation: (Rule) => Rule.min(1).max(1).error('Bitte genau einen Block hinzufügen'),
      options: {
        insertMenu: { views: [{ name: 'grid' }] },
      },
    }),
    defineField({
      name: 'columnColumns',
      title: 'Spaltenbreite pro Breakpoint',
      type: 'object',
      description: 'Mobile stapelt die Blöcke. Breiten nur für Tablet/Desktop.',
      fields: [
        defineField({
          name: 'md',
          title: 'Tablet (6 Spalten)',
          type: 'object',
          fields: [
            defineField({
              name: 'left',
              title: 'Links Start',
              type: 'number',
              options: { list: [1, 2, 3, 4, 5, 6].map((value) => ({ title: `${value}`, value })) },
              validation: (Rule) => Rule.min(1).max(6),
            }),
            defineField({
              name: 'leftEnd',
              title: 'Links Ende (Column)',
              type: 'number',
              options: { list: [1, 2, 3, 4, 5, 6].map((value) => ({ title: `${value}`, value })) },
              validation: (Rule) => Rule.min(1).max(6),
            }),
            defineField({
              name: 'right',
              title: 'Rechts Start',
              type: 'number',
              options: { list: [1, 2, 3, 4, 5, 6].map((value) => ({ title: `${value}`, value })) },
              validation: (Rule) => Rule.min(1).max(6),
            }),
            defineField({
              name: 'rightEnd',
              title: 'Rechts Ende (Column)',
              type: 'number',
              options: { list: [1, 2, 3, 4, 5, 6].map((value) => ({ title: `${value}`, value })) },
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
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => ({
                  title: `${value}`,
                  value,
                })),
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
            defineField({
              name: 'leftEnd',
              title: 'Links Ende (Column)',
              type: 'number',
              options: {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => ({
                  title: `${value}`,
                  value,
                })),
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
            defineField({
              name: 'right',
              title: 'Rechts Start',
              type: 'number',
              options: {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => ({
                  title: `${value}`,
                  value,
                })),
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
            defineField({
              name: 'rightEnd',
              title: 'Rechts Ende (Column)',
              type: 'number',
              options: {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => ({
                  title: `${value}`,
                  value,
                })),
              },
              validation: (Rule) => Rule.min(1).max(12),
            }),
          ],
        }),
      ],
      initialValue: {
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
    prepare() {
      return {
        title: 'Zwei Blöcke',
        subtitle: '2-Column Layout',
        media: BlockContentIcon,
      }
    },
  },
})
