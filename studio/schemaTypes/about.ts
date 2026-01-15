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
      name: 'skillsSectionTitle',
      title: 'Skills Section Title',
      type: 'string',
      description: 'Titel für die Skills Section',
    }),
    defineField({
      name: 'skillsParagraphText',
      title: 'Skills Paragraph Text',
      type: 'text',
      description: 'Beschreibungstext für die Skills Section',
    }),
    defineField({
      name: 'skillsColumn1Title',
      title: 'Column 1 Title',
      type: 'string',
      description: 'Titel für die erste Spalte (z.B. "Skills")',
    }),
    defineField({
      name: 'skillsColumn1Content',
      title: 'Column 1 Content',
      type: 'array',
      description: 'Inhalt für die erste Spalte (Liste von Skills)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'skillsColumn2Title',
      title: 'Column 2 Title',
      type: 'string',
      description: 'Titel für die zweite Spalte (z.B. "Tools & Technologies")',
    }),
    defineField({
      name: 'skillsColumn2Content',
      title: 'Column 2 Content',
      type: 'array',
      description: 'Inhalt für die zweite Spalte (Liste von Tools & Technologies)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
