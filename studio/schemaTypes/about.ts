import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'greeting',
      title: 'Begrüssung',
      type: 'string',
      description: 'Begrüssungstext (z.B. "Hello,")',
      validation: (Rule) => Rule.max(50).warning('Die Begrüssung sollte maximal 50 Zeichen lang sein'),
    }),
    defineField({
      name: 'bigStatement',
      title: 'Big Statement',
      type: 'text',
      description: 'Das grosse Statement für den About Header',
      validation: (Rule) => Rule.max(300).warning('Das Statement sollte maximal 300 Zeichen lang sein'),
    }),
    defineField({
      name: 'supportingParagraph',
      title: 'Supporting Paragraph',
      type: 'text',
      description: 'Der unterstützende Absatz für den About Header',
      validation: (Rule) => Rule.max(1000).warning('Der Paragraph sollte maximal 1000 Zeichen lang sein'),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portraitbild',
      type: 'image',
      description: 'Portraitbild für die About-Seite',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Standort (z.B. "Canton of Aargau, Switzerland")',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Status (z.B. "Available for Work")',
    }),
    defineField({
      name: 'showStatusDot',
      title: 'Status Dot anzeigen',
      type: 'boolean',
      description: 'Aktiviere diese Option, um einen farbigen Punkt vor dem Status anzuzeigen',
      initialValue: false,
    }),
    defineField({
      name: 'contentBlocks',
      title: 'About Content Blocks',
      type: 'array',
      description: 'Flexible Blöcke für die About-Seite.',
      of: [
        { type: 'fullImage' },
        { type: 'imageGallery' },
        { type: 'sectionBlock' },
        { type: 'textBlock' },
        { type: 'twoColumn' },
        { type: 'video' },
      ],
      options: {
        insertMenu: {
          views: [
            { name: 'grid' },
          ],
        },
      },
    }),
    defineField({
      name: 'footerCtaTitle',
      title: 'Footer CTA Title',
      type: 'text',
      description: 'Footer CTA Titel (z.B. "Ready for the next Step?\nDownload my CV or book a call.") - Unterstützt manuelle Zeilenumbrüche',
    }),
    defineField({
      name: 'footerPrimaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      description: 'Text für den Primary Button (z.B. "DOWNLOAD CV")',
    }),
    defineField({
      name: 'footerPrimaryButtonFile',
      title: 'Primary Button File',
      type: 'file',
      description: 'Datei für den Primary Button (z.B. CV PDF)',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),
    defineField({
      name: 'footerSecondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      description: 'Text für den Secondary Button (z.B. "BOOK A CALL")',
    }),
    defineField({
      name: 'footerSecondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      description: 'Link für den Secondary Button (z.B. "https://example.com" oder "/contact" für interne Links)',
      validation: (Rule) => Rule.custom((value) => {
        if (!value) return true; // Optional field
        // Allow both absolute URLs and relative paths
        if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/') || value.startsWith('mailto:') || value.startsWith('tel:')) {
          return true;
        }
        return 'Bitte geben Sie eine gültige URL ein (z.B. "https://example.com" oder "/contact")';
      }),
    }),
  ],
  preview: {
    select: {
      title: 'bigStatement',
      subtitle: 'greeting',
      media: 'portraitImage',
    },
  },
})
