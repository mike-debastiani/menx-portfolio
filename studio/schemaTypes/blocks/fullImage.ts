import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'fullImage',
  title: 'Vollbild',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-Text',
      type: 'string',
      description: 'Beschreibung des Bildes für Barrierefreiheit',
    }),
    defineField({
      name: 'caption',
      title: 'Bildunterschrift',
      type: 'string',
      description: 'Optionale Bildunterschrift',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      caption: 'caption',
    },
    prepare({ media, caption }) {
      return {
        title: caption || 'Vollbild',
        subtitle: 'Vollbild Block',
        media: media ?? ImageIcon,
      }
    },
  },
})
