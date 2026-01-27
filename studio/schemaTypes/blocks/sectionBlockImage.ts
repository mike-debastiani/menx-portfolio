import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { paddingField } from './padding'

export default defineType({
  name: 'sectionBlockImage',
  title: 'Image Block',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
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
      media: 'image',
      title: 'caption',
    },
    prepare({ media, title }) {
      return {
        title: title || 'Image',
        subtitle: 'Image Block',
        media: media ?? ImageIcon,
      }
    },
  },
})
