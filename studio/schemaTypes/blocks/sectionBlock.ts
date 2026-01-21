import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockContentIcon, ImageIcon, ListIcon, TextIcon } from '@sanity/icons'

export default defineType({
  name: 'sectionBlock',
  title: 'Section Block',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionBlockText',
          title: 'Rich Text Block',
          type: 'object',
          icon: TextIcon,
          fields: [
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
          preview: {
            select: {
              content: 'content',
            },
            prepare({ content }) {
              const text = content
                ? content
                    .filter((block: any) => block._type === 'block')
                    .map((block: any) => block.children?.map((child: any) => child.text).join(''))
                    .join(' ')
                    .slice(0, 80)
                : ''
              return {
                title: text || 'Rich Text',
                subtitle: 'Rich Text Block',
                media: TextIcon,
              }
            },
          },
        }),
        defineArrayMember({
          name: 'sectionBlockColumns',
          title: 'Column Block',
          type: 'object',
          icon: ListIcon,
          fields: [
            defineField({
              name: 'columns',
              title: 'Columns',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'sectionBlockColumn',
                  title: 'Column',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'items',
                      title: 'Items',
                      type: 'array',
                      of: [{ type: 'string' }],
                      options: {
                        layout: 'tags',
                      },
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      items: 'items',
                    },
                    prepare({ title, items }) {
                      const count = items?.length || 0
                      return {
                        title: title || 'Column',
                        subtitle: count ? `${count} Items` : 'No items',
                        media: ListIcon,
                      }
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.min(1).error('Mindestens eine Spalte erforderlich'),
            }),
          ],
          preview: {
            select: {
              columns: 'columns',
            },
            prepare({ columns }) {
              const count = columns?.length || 0
              return {
                title: `Columns (${count})`,
                subtitle: 'Column Block',
                media: ListIcon,
              }
            },
          },
        }),
        defineArrayMember({
          name: 'sectionBlockRows',
          title: 'Row Block',
          type: 'object',
          icon: ListIcon,
          fields: [
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'sectionBlockRow',
                  title: 'Row',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'items',
                      title: 'Items',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          name: 'sectionBlockRowItem',
                          title: 'Item',
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'label',
                              title: 'Label',
                              type: 'string',
                            }),
                            defineField({
                              name: 'href',
                              title: 'Link (optional)',
                              type: 'string',
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'label',
                              subtitle: 'href',
                            },
                          },
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      items: 'items',
                    },
                    prepare({ title, items }) {
                      const count = items?.length || 0
                      return {
                        title: title || 'Row',
                        subtitle: count ? `${count} Items` : 'No items',
                        media: ListIcon,
                      }
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.min(1).error('Mindestens eine Row erforderlich'),
            }),
          ],
          preview: {
            select: {
              rows: 'rows',
            },
            prepare({ rows }) {
              const count = rows?.length || 0
              return {
                title: `Rows (${count})`,
                subtitle: 'Row Block',
                media: ListIcon,
              }
            },
          },
        }),
        defineArrayMember({
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
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      contentBlocks: 'contentBlocks',
    },
    prepare({ title, contentBlocks }) {
      const text = title
        ? title
            .filter((block: any) => block._type === 'block')
            .map((block: any) => block.children?.map((child: any) => child.text).join(''))
            .join(' ')
            .slice(0, 60)
        : ''
      const count = contentBlocks?.length || 0
      return {
        title: text || 'Section Block',
        subtitle: `${count} Content Blocks`,
        media: BlockContentIcon,
      }
    },
  },
})
