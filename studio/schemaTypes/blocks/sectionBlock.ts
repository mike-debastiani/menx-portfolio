import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'
import { paddingField } from './padding'
import { coloredTextBlock } from './richText'
import RichTextInput from '../../components/RichTextInput'

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
      of: [coloredTextBlock],
      components: { input: RichTextInput },
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        defineArrayMember({ type: 'sectionBlockText' }),
        defineArrayMember({ type: 'sectionBlockColumns' }),
        defineArrayMember({ type: 'sectionBlockRows' }),
        defineArrayMember({ type: 'sectionBlockDetailedRows' }),
        defineArrayMember({ type: 'sectionBlockAccordion' }),
        defineArrayMember({ type: 'sectionBlockImage' }),
      ],
    }),
    paddingField,
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
