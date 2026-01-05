import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
      type: 'string',
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      description: 'One-sentence challenge',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short header description',
    }),
  ],
})

