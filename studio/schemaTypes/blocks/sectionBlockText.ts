import type { ArrayOfPrimitivesInputProps, ArraySchemaType } from 'sanity'
import { defineType, defineField } from 'sanity'
import { TextIcon } from '@sanity/icons'
import { coloredTextBlock } from './richText'
import RichTextInput from '../../components/RichTextInput'
import type { ComponentType } from 'react'
import { paddingField } from './padding'

export default defineType({
  name: 'sectionBlockText',
  title: 'Rich Text Block',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [coloredTextBlock],
      components: {
        input: RichTextInput as ComponentType<
          ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>
        >,
      },
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
})
