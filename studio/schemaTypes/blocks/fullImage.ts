import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { paddingField } from './padding'

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
      name: 'mobileImage',
      title: 'Bild (Mobil <800px)',
      type: 'image',
      description: 'Optionales Bild fuer kleine Screens. Falls leer, wird das normale Bild genutzt.',
      options: {
        hotspot: true,
      },
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
