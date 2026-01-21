import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImagesIcon } from '@sanity/icons'
import { paddingField } from './padding'

export default defineType({
  name: 'imageGallery',
  title: 'Bildergalerie',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
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
                title: caption || 'Bild',
                media: media ?? ImagesIcon,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Mindestens ein Bild erforderlich'),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      description: 'Wie sollen die Bilder angezeigt werden?',
      options: {
        list: [
          { title: 'Grid (gleichmäßig)', value: 'grid' },
          { title: 'Masonry (gestapelt)', value: 'masonry' },
          { title: 'Bento Box', value: 'bento' },
          { title: 'Carousel (Slideshow)', value: 'carousel' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'bentoLayout',
      title: 'Bento Layout',
      type: 'string',
      description: 'Wähle ein Bento-Pattern für die Bilder.',
      options: {
        list: [
          { title: 'Bento A (1 groß, 4 klein)', value: 'bento-a' },
          { title: 'Bento B (2 groß, 3 klein)', value: 'bento-b' },
          { title: 'Bento C (1 breit, 4 klein)', value: 'bento-c' },
        ],
        layout: 'radio',
      },
      initialValue: 'bento-a',
      hidden: ({ parent }) => parent?.layout !== 'bento',
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
      images: 'images',
      layout: 'layout',
    },
    prepare({ images, layout }) {
      const count = images?.length || 0
      return {
        title: `Bildergalerie (${count} ${count === 1 ? 'Bild' : 'Bilder'})`,
        subtitle: `Layout: ${layout || 'grid'}`,
        media: ImagesIcon,
      }
    },
  },
})
