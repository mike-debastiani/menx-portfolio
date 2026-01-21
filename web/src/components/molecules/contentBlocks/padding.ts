import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib'

export type BlockPadding = {
  base?: { pt?: string; pb?: string }
  md?: { pt?: string; pb?: string }
  xl?: { pt?: string; pb?: string }
}

const PADDING_CLASS_SAFELIST = [
  'pt-0',
  'pt-2',
  'pt-4',
  'pt-6',
  'pt-8',
  'pt-10',
  'pt-12',
  'pt-14',
  'pt-16',
  'pt-20',
  'pt-24',
  'pt-28',
  'pt-32',
  'pt-36',
  'pt-40',
  'pt-48',
  'pb-0',
  'pb-2',
  'pb-4',
  'pb-6',
  'pb-8',
  'pb-10',
  'pb-12',
  'pb-14',
  'pb-16',
  'pb-20',
  'pb-24',
  'pb-28',
  'pb-32',
  'pb-36',
  'pb-40',
  'pb-48',
  'md:pt-0',
  'md:pt-2',
  'md:pt-4',
  'md:pt-6',
  'md:pt-8',
  'md:pt-10',
  'md:pt-12',
  'md:pt-14',
  'md:pt-16',
  'md:pt-20',
  'md:pt-24',
  'md:pt-28',
  'md:pt-32',
  'md:pt-36',
  'md:pt-40',
  'md:pt-48',
  'md:pb-0',
  'md:pb-2',
  'md:pb-4',
  'md:pb-6',
  'md:pb-8',
  'md:pb-10',
  'md:pb-12',
  'md:pb-14',
  'md:pb-16',
  'md:pb-20',
  'md:pb-24',
  'md:pb-28',
  'md:pb-32',
  'md:pb-36',
  'md:pb-40',
  'md:pb-48',
  'xl:pt-0',
  'xl:pt-2',
  'xl:pt-4',
  'xl:pt-6',
  'xl:pt-8',
  'xl:pt-10',
  'xl:pt-12',
  'xl:pt-14',
  'xl:pt-16',
  'xl:pt-20',
  'xl:pt-24',
  'xl:pt-28',
  'xl:pt-32',
  'xl:pt-36',
  'xl:pt-40',
  'xl:pt-48',
  'xl:pb-0',
  'xl:pb-2',
  'xl:pb-4',
  'xl:pb-6',
  'xl:pb-8',
  'xl:pb-10',
  'xl:pb-12',
  'xl:pb-14',
  'xl:pb-16',
  'xl:pb-20',
  'xl:pb-24',
  'xl:pb-28',
  'xl:pb-32',
  'xl:pb-36',
  'xl:pb-40',
  'xl:pb-48',
]

void PADDING_CLASS_SAFELIST

const DEFAULT_PADDING = {
  base: { pt: 'pt-8', pb: 'pb-8' },
  md: { pt: 'md:pt-12', pb: 'md:pb-12' },
  xl: { pt: 'xl:pt-16', pb: 'xl:pb-16' },
}

const normalizePaddingValue = (value?: string) => {
  const clean = stegaClean(value)
  return clean ? clean.trim() : undefined
}

const prefixPaddingValue = (value: string | undefined, prefix?: 'md' | 'xl') => {
  if (!value) return undefined
  if (!prefix) return value
  if (value.includes(':')) return value
  return `${prefix}:${value}`
}

export const getBlockPaddingClasses = (padding?: BlockPadding) => {
  const basePt = normalizePaddingValue(padding?.base?.pt)
  const basePb = normalizePaddingValue(padding?.base?.pb)
  const mdPt = prefixPaddingValue(normalizePaddingValue(padding?.md?.pt), 'md')
  const mdPb = prefixPaddingValue(normalizePaddingValue(padding?.md?.pb), 'md')
  const xlPt = prefixPaddingValue(normalizePaddingValue(padding?.xl?.pt), 'xl')
  const xlPb = prefixPaddingValue(normalizePaddingValue(padding?.xl?.pb), 'xl')

  return cn(
    basePt || DEFAULT_PADDING.base.pt,
    basePb || DEFAULT_PADDING.base.pb,
    mdPt || DEFAULT_PADDING.md.pt,
    mdPb || DEFAULT_PADDING.md.pb,
    xlPt || DEFAULT_PADDING.xl.pt,
    xlPb || DEFAULT_PADDING.xl.pb
  )
}
