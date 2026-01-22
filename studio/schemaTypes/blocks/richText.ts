import { defineArrayMember, defineField } from 'sanity'

export const coloredTextBlock = defineArrayMember({
  type: 'block',
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' },
      { title: 'Code', value: 'code' },
    ],
    annotations: [
      defineArrayMember({
        name: 'textColor',
        title: 'Text Color',
        type: 'object',
        fields: [
          defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            options: {
              list: [
                { title: 'Primary 50', value: 'text-primary-50' },
                { title: 'Primary 100', value: 'text-primary-100' },
                { title: 'Primary 200', value: 'text-primary-200' },
                { title: 'Primary 300', value: 'text-primary-300' },
                { title: 'Primary 400', value: 'text-primary-400' },
                { title: 'Primary 500', value: 'text-primary-500' },
                { title: 'Primary 600', value: 'text-primary-600' },
                { title: 'Primary 700', value: 'text-primary-700' },
                { title: 'Primary 800', value: 'text-primary-800' },
                { title: 'Primary 900', value: 'text-primary-900' },
                { title: 'Primary 950', value: 'text-primary-950' },
                { title: 'White', value: 'text-white' },
              ],
            },
          }),
          defineField({
            name: 'customColor',
            title: 'Custom Color',
            type: 'string',
            description: 'Optional CSS color (e.g. #ff00aa or rgb(0,0,0))',
          }),
        ],
      }),
      defineArrayMember({
        name: 'textFont',
        title: 'Font',
        type: 'object',
        fields: [
          defineField({
            name: 'font',
            title: 'Font',
            type: 'string',
            options: {
              list: [
                { title: 'Sans', value: 'font-sans' },
                { title: 'Mono', value: 'font-mono' },
              ],
            },
          }),
        ],
      }),
      defineArrayMember({
        name: 'textWeight',
        title: 'Weight',
        type: 'object',
        fields: [
          defineField({
            name: 'weight',
            title: 'Weight',
            type: 'string',
            options: {
              list: [
                { title: 'Regular', value: 'font-normal' },
                { title: 'Medium', value: 'font-medium' },
                { title: 'Strong', value: 'font-bold' },
              ],
            },
          }),
        ],
      }),
    ],
  },
})
