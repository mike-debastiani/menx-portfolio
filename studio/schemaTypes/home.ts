import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'roles',
      title: 'Rollen (Segments)',
      type: 'array',
      description: 'Fügen Sie Rollen hinzu, die im RoleBasedHero angezeigt werden sollen',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Rollen-ID',
              type: 'string',
              description: 'Eindeutige ID für diese Rolle (z.B. "for-anyone", "recruiters", etc.)',
              validation: (Rule) => 
                Rule.required()
                  .custom((value) => {
                    const allowedIds = ['for-anyone', 'recruiters', 'hiring-managers', 'designers', 'engineers'];
                    if (value && !allowedIds.includes(value)) {
                      return `Die ID muss einer der folgenden sein: ${allowedIds.join(', ')}`;
                    }
                    return true;
                  }),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Das Label, das im SegmentedControl angezeigt wird (z.B. "For anyone", "Recruiters")',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'contentType',
              title: 'Content-Typ',
              type: 'string',
              description: 'Wählen Sie den Typ des Inhalts für diese Rolle',
              options: {
                list: [
                  { title: 'Headline (Text)', value: 'headline' },
                  { title: 'Code', value: 'code' },
                ],
                layout: 'radio',
              },
              initialValue: 'headline',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headlineText',
              title: 'Headline Text',
              type: 'text',
              description: 'Der Text, der als Headline angezeigt wird',
              hidden: ({parent}) => parent?.contentType !== 'headline',
              validation: (Rule) => 
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.contentType === 'headline' && !value) {
                    return 'Headline Text ist erforderlich, wenn Content-Typ "Headline" ist';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'codeLines',
              title: 'Code-Zeilen',
              type: 'array',
              description: 'Die Code-Zeilen für diese Rolle',
              hidden: ({parent}) => parent?.contentType !== 'code',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'lineNumber',
                      title: 'Zeilennummer',
                      type: 'number',
                      description: 'Die Nummer dieser Code-Zeile',
                      validation: (Rule) => Rule.required().min(1),
                    }),
                    defineField({
                      name: 'segments',
                      title: 'Segments',
                      type: 'array',
                      description: 'Die einzelnen Text-Segments dieser Zeile mit ihren Farben',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'text',
                              title: 'Text',
                              type: 'string',
                              description: 'Der Text dieses Segments',
                              validation: (Rule) => Rule.required(),
                            }),
                            defineField({
                              name: 'tone',
                              title: 'Farbe/Ton',
                              type: 'string',
                              description: 'Die Farbe für dieses Segment',
                              options: {
                                list: [
                                  { title: 'Standard', value: 'default' },
                                  { title: 'Lila', value: 'purple' },
                                  { title: 'Grün', value: 'green' },
                                  { title: 'Orange', value: 'orange' },
                                  { title: 'Grau', value: 'gray' },
                                  { title: 'Gedämpft', value: 'muted' },
                                  { title: 'Rot', value: 'red' },
                                ],
                              },
                              initialValue: 'default',
                              validation: (Rule) => Rule.required(),
                            }),
                          ],
                          preview: {
                            select: {
                              text: 'text',
                              tone: 'tone',
                            },
                            prepare({text, tone}) {
                              return {
                                title: text || '(leer)',
                                subtitle: `Ton: ${tone}`,
                              };
                            },
                          },
                        },
                      ],
                      validation: (Rule) => Rule.min(1),
                    }),
                  ],
                  preview: {
                    select: {
                      lineNumber: 'lineNumber',
                      firstSegment: 'segments.0.text',
                    },
                    prepare({lineNumber, firstSegment}) {
                      return {
                        title: `Zeile ${lineNumber}`,
                        subtitle: firstSegment || '(leer)',
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => 
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.contentType === 'code' && (!value || value.length === 0)) {
                    return 'Mindestens eine Code-Zeile ist erforderlich, wenn Content-Typ "Code" ist';
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              id: 'id',
              label: 'label',
              contentType: 'contentType',
            },
            prepare({id, label, contentType}) {
              return {
                title: label || id || '(Unbenannt)',
                subtitle: `ID: ${id} | Typ: ${contentType === 'headline' ? 'Headline' : 'Code'}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Mindestens eine Rolle ist erforderlich'),
    }),
  ],
  preview: {
    select: {
      rolesCount: 'roles',
    },
    prepare({rolesCount}) {
      const count = rolesCount?.length || 0;
      return {
        title: 'Home',
        subtitle: `${count} Rolle(n) konfiguriert`,
      };
    },
  },
})
