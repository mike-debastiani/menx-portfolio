import React from 'react'
import type {ArrayOfPrimitivesInputProps, ArraySchemaType, PortableTextInputProps} from 'sanity'
import {PortableTextInput} from 'sanity'

const COLOR_MAP: Record<string, string> = {
  'text-primary-50': '#f6f6f6',
  'text-primary-100': '#e7e7e7',
  'text-primary-200': '#d1d1d1',
  'text-primary-350': '#9c9c9c',
  'text-primary-400': '#888888',
  'text-primary-500': '#6d6d6d',
  'text-primary-600': '#5d5d5d',
  'text-primary-700': '#4f4f4f',
  'text-primary-800': '#454545',
  'text-primary-900': '#3d3d3d',
  'text-primary-950': '#0a0a0a',
  'text-white': '#ffffff',
}

const FONT_MAP: Record<string, string> = {
  'font-sans': 'Inter, ui-sans-serif, system-ui, sans-serif',
  'font-mono':
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

const WEIGHT_MAP: Record<string, number> = {
  'font-normal': 400,
  'font-medium': 500,
  'font-bold': 700,
}

const SIZE_MAP: Record<string, string> = {
  'text-xs': '0.75rem',
  'text-sm': '0.875rem',
  'text-base': '1rem',
  'text-lg': '1.125rem',
  'text-xl': '1.25rem',
  'text-2xl': '1.5rem',
  'text-3xl': '1.875rem',
  'text-4xl': '2.25rem',
}

const richTextComponents: PortableTextInputProps['components'] = {
  block: {
    normal: ({children}) => (
      <p style={{margin: '0 0 0.5rem', fontSize: '1rem', lineHeight: 1.5}}>{children}</p>
    ),
    h1: ({children}) => (
      <h1 style={{margin: '0 0 0.5rem', fontSize: '2.25rem', fontWeight: 500, lineHeight: 1.2}}>
        {children}
      </h1>
    ),
    h2: ({children}) => (
      <h2 style={{margin: '0 0 0.5rem', fontSize: '1.875rem', fontWeight: 500, lineHeight: 1.2}}>
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 style={{margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2}}>
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 style={{margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2}}>
        {children}
      </h4>
    ),
  },
  marks: {
    textColor: ({children, value}) => {
      const colorClass = value?.color as string | undefined
      const customColor = value?.customColor as string | undefined
      const color = customColor || (colorClass ? COLOR_MAP[colorClass] : undefined)
      return <span style={color ? {color} : undefined}>{children}</span>
    },
    textFont: ({children, value}) => {
      const fontClass = value?.font as string | undefined
      const fontFamily = fontClass ? FONT_MAP[fontClass] : undefined
      return <span style={fontFamily ? {fontFamily} : undefined}>{children}</span>
    },
    textWeight: ({children, value}) => {
      const weightClass = value?.weight as string | undefined
      const fontWeight = weightClass ? WEIGHT_MAP[weightClass] : undefined
      return <span style={fontWeight ? {fontWeight} : undefined}>{children}</span>
    },
    textSize: ({children, value}) => {
      const sizeClass = value?.size as string | undefined
      const fontSize = sizeClass ? SIZE_MAP[sizeClass] : undefined
      return <span style={fontSize ? {fontSize} : undefined}>{children}</span>
    },
    textLineHeight: ({children, value}) => {
      const lineHeight = value?.lineHeight as number | undefined
      return <span style={lineHeight ? {lineHeight} : undefined}>{children}</span>
    },
  },
}

type RichTextInputProps =
  | PortableTextInputProps
  | ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>

export default function RichTextInput(props: RichTextInputProps) {
  return <PortableTextInput {...(props as PortableTextInputProps)} components={richTextComponents} />
}
