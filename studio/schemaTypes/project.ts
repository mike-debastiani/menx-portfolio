import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // Case Study Header Fields
    defineField({
      name: 'projectTitle',
      title: 'Project Title',
      type: 'string',
      description: 'Titel des Projektes für den Case Study Header (z.B. "Adjusto")',
      validation: (Rule) => Rule.max(50).warning('Der Titel sollte maximal 50 Zeichen lang sein'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'projectTitle',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
      description: 'e.g. "12 weeks"',
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'string',
      description: 'e.g. "Student project supported by Swiss Post"',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'text',
      description: 'Mehrere Zeilen möglich (z.B. ein Name pro Zeile)',
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
    }),
    defineField({
      name: 'projectStatement',
      title: 'Project Statement',
      type: 'text',
      description: 'Ein Statement, das den Kern des Projektes beschreibt für den Case Study Header',
      validation: (Rule) => Rule.max(200).warning('Das Statement sollte maximal 200 Zeichen lang sein'),
    }),
    defineField({
      name: 'projectDescription',
      title: 'Project Description',
      type: 'text',
      description: 'Eine ausführlichere Beschreibung des Projektes für den Case Study Header',
      validation: (Rule) => Rule.max(1000).warning('Die Beschreibung sollte maximal 1000 Zeichen lang sein'),
    }),
    // Project Card Fields
    defineField({
      name: 'cardTitle',
      title: 'Project Card Title',
      type: 'string',
      description: 'Ein kurzer Anzeigetitel für die Projectcard',
      validation: (Rule) => Rule.max(100).warning('Der Card-Titel sollte maximal 100 Zeichen lang sein'),
    }),
    defineField({
      name: 'cardDescription',
      title: 'Project Card Description',
      type: 'text',
      description: 'Eine kurze Beschreibung des Projektes in 1-2 Sätzen für die Projectcard',
      validation: (Rule) => Rule.max(300).warning('Die Card-Beschreibung sollte maximal 300 Zeichen lang sein'),
    }),
    defineField({
      name: 'cardImage',
      title: 'Project Card Image',
      type: 'image',
      description: 'Anzeigebild für die Project Card',
      options: {
        hotspot: true,
      },
    }),
    // Attributes
    defineField({
      name: 'attributePills',
      title: 'Project Attribute Pills',
      type: 'string',
      description: 'Attribute des Projektes, abgetrennt mit Kommas (z.B. "User Experience, Prototyping, Testing, Innovation")',
      validation: (Rule) => Rule.max(200).warning('Die Attribute sollten maximal 200 Zeichen lang sein'),
    }),
    // Display Settings
    defineField({
      name: 'showOnHomepage',
      title: 'Auf Homepage anzeigen (Selected Work)',
      type: 'boolean',
      description: 'Aktiviere diese Option, um das Projekt in der Selected Work Sektion auf der Homepage anzuzeigen',
      initialValue: false,
    }),
    defineField({
      name: 'selectedWorkOrder',
      title: 'Reihenfolge (Selected Work)',
      type: 'number',
      description: 'Manuelle Reihenfolge für die Anzeige in Selected Work (niedrigere Zahlen zuerst)',
    }),
    defineField({
      name: 'category',
      title: 'Projektkategorie',
      type: 'string',
      description: 'Kategorie des Projektes für die Archiv-Filterung',
      options: {
        list: [
          {title: 'Relevant Work', value: 'relevant-work'},
          {title: 'Lab', value: 'lab'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'relevantWorkOrder',
      title: 'Reihenfolge (Relevant Work)',
      type: 'number',
      description: 'Manuelle Reihenfolge für die Anzeige im Relevant Work Archiv (niedrigere Zahlen zuerst)',
    }),
    defineField({
      name: 'labOrder',
      title: 'Reihenfolge (Lab)',
      type: 'number',
      description: 'Manuelle Reihenfolge für die Anzeige im Lab Archiv (niedrigere Zahlen zuerst)',
    }),
    // Content Blocks - Flexible Case Study Content
    defineField({
      name: 'contentBlocks',
      title: 'Case Study Inhalt',
      type: 'array',
      description: 'Flexibler Inhalt für die Case Study. Füge beliebig viele Blöcke hinzu und ordne sie individuell an.',
      of: [
        defineArrayMember({ type: 'fullImage' }),
        defineArrayMember({ type: 'imageGallery' }),
        defineArrayMember({ type: 'sectionBlock' }),
        defineArrayMember({ type: 'sectionBlockText' }),
        defineArrayMember({ type: 'sectionBlockColumns' }),
        defineArrayMember({ type: 'sectionBlockRows' }),
        defineArrayMember({ type: 'sectionBlockDetailedRows' }),
        defineArrayMember({ type: 'sectionBlockAccordion' }),
        defineArrayMember({ type: 'sectionBlockImage' }),
        defineArrayMember({ type: 'textBlock' }),
        defineArrayMember({ type: 'twoColumn' }),
        defineArrayMember({ type: 'twoColumnLayout' }),
        defineArrayMember({ type: 'video' }),
      ],
      options: {
        insertMenu: {
          views: [
            { name: 'grid' },
          ],
        },
      },
    }),
  ],
})

