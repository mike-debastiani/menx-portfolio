'use client';

import { useState } from 'react';
import { Pill, Button, StatItem, SubInfo } from '@/components/atoms';
import { SegmentedControl, AccordionItem, SectionDescription, InfoRows } from '@/components/molecules';

export default function PlaygroundPage() {
  const primaryColors = [
    { name: 'primary-50', value: '50', bg: 'bg-primary-50', text: 'text-primary-950' },
    { name: 'primary-100', value: '100', bg: 'bg-primary-100', text: 'text-primary-950' },
    { name: 'primary-200', value: '200', bg: 'bg-primary-200', text: 'text-primary-950' },
    { name: 'primary-300', value: '300', bg: 'bg-primary-300', text: 'text-primary-950' },
    { name: 'primary-400', value: '400', bg: 'bg-primary-400', text: 'text-white' },
    { name: 'primary-500', value: '500', bg: 'bg-primary-500', text: 'text-white' },
    { name: 'primary-600', value: '600', bg: 'bg-primary-600', text: 'text-white' },
    { name: 'primary-700', value: '700', bg: 'bg-primary-700', text: 'text-white' },
    { name: 'primary-800', value: '800', bg: 'bg-primary-800', text: 'text-white' },
    { name: 'primary-900', value: '900', bg: 'bg-primary-900', text: 'text-white' },
    { name: 'primary-950', value: '950', bg: 'bg-primary-950', text: 'text-white' },
  ];

  const accentColors = [
    { name: 'accent-blue', bg: 'bg-accent-blue', text: 'text-white' },
    { name: 'accent-purple', bg: 'bg-accent-purple', text: 'text-white' },
    { name: 'accent-magenta', bg: 'bg-accent-magenta', text: 'text-white' },
    { name: 'accent-orange', bg: 'bg-accent-orange', text: 'text-white' },
    { name: 'accent-green', bg: 'bg-accent-green', text: 'text-white' },
    { name: 'accent-darkgrey', bg: 'bg-accent-darkgrey', text: 'text-white' },
  ];

  const baseColors = [
    { name: 'white', bg: 'bg-white', text: 'text-primary-950', border: 'border-primary-100' },
    { name: 'transparent', bg: 'bg-transparent', text: 'text-primary-950', border: 'border-primary-100' },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-primary-950 mb-8">Color Palette Preview</h1>

        {/* Primary Colors */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Primary Scale</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-4">
            {primaryColors.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div className={`${color.bg} ${color.text} h-32 rounded-lg flex items-center justify-center border-2 border-primary-100`}>
                  <span className="font-mono text-sm font-medium">{color.value}</span>
                </div>
                <p className="font-mono text-xs text-primary-700">{color.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accent Colors */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Accent Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {accentColors.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div className={`${color.bg} ${color.text} h-32 rounded-lg flex items-center justify-center border-2 border-primary-100`}>
                  <span className="font-mono text-sm font-medium">{color.name.split('-')[1]}</span>
                </div>
                <p className="font-mono text-xs text-primary-700">{color.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Base Colors */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Base Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            {baseColors.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div className={`${color.bg} ${color.text} h-32 rounded-lg flex items-center justify-center border-2 ${color.border}`}>
                  <span className="font-mono text-sm font-medium">{color.name}</span>
                </div>
                <p className="font-mono text-xs text-primary-700">{color.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Atoms / Pill */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Atoms / Pill</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The Pill component is a small, rounded badge used to display labels, tags, or status indicators. 
                It features soft, washed background colors with readable text and comes in multiple color variants 
                and two sizes.
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        children
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ReactNode
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Content to display inside the pill
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        variant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        PillVariant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "default"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Color variant: default, blue, purple, magenta, orange, green, darkgrey
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        size
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        PillSize
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "sm"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Size variant: sm, xs
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* All Variants - sm size */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: sm (default)</h4>
                <div className="flex flex-wrap gap-3">
                  <Pill variant="default" size="sm">Default</Pill>
                  <Pill variant="blue" size="sm">Blue</Pill>
                  <Pill variant="purple" size="sm">Purple</Pill>
                  <Pill variant="magenta" size="sm">Magenta</Pill>
                  <Pill variant="orange" size="sm">Orange</Pill>
                  <Pill variant="green" size="sm">Green</Pill>
                  <Pill variant="darkgrey" size="sm">Dark Grey</Pill>
                </div>
              </div>

              {/* All Variants - xs size */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: xs</h4>
                <div className="flex flex-wrap gap-3">
                  <Pill variant="default" size="xs">Default</Pill>
                  <Pill variant="blue" size="xs">Blue</Pill>
                  <Pill variant="purple" size="xs">Purple</Pill>
                  <Pill variant="magenta" size="xs">Magenta</Pill>
                  <Pill variant="orange" size="xs">Orange</Pill>
                  <Pill variant="green" size="xs">Green</Pill>
                  <Pill variant="darkgrey" size="xs">Dark Grey</Pill>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atoms / Button */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Atoms / Button</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The Button component is a versatile interactive element used for actions and navigation. 
                It supports two variants (primary and secondary), two sizes (base and sm), and an optional 
                icon. Buttons can render as either a button element or a Next.js Link when an href is provided.
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        children
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ReactNode
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Button label text
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        variant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ButtonVariant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "primary"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Style variant: primary (filled dark), secondary (outlined)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        size
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ButtonSize
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "base"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Size variant: base, sm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        icon
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        "none" | "right"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "none"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Show arrow icon on the right side
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        disabled
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        boolean
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        false
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Disable button interaction
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        href
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        If provided, renders as Next.js Link instead of button
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        onClick
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        () =&gt; void
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Click handler (only for button element)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        type
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        "button" | "submit" | "reset"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "button"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Button type (only for button element)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* States Note */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-700">
                <strong className="font-medium text-primary-950">States:</strong> Buttons support hover, active, focus, and disabled states. 
                Hover and active states show subtle color changes. Focus state displays a ring outline for accessibility. 
                Disabled buttons are visually muted and non-interactive.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Primary - base size */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Primary / base</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" size="base" icon="none">View All Projects</Button>
                  <Button variant="primary" size="base" icon="right">View All Projects</Button>
                  <Button variant="primary" size="base" icon="none" disabled>View All Projects</Button>
                  <Button variant="primary" size="base" icon="right" disabled>View All Projects</Button>
                </div>
              </div>

              {/* Primary - sm size */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Primary / sm</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary" size="sm" icon="none">View All Projects</Button>
                  <Button variant="primary" size="sm" icon="right">View All Projects</Button>
                  <Button variant="primary" size="sm" icon="none" disabled>View All Projects</Button>
                  <Button variant="primary" size="sm" icon="right" disabled>View All Projects</Button>
                </div>
              </div>

              {/* Secondary - base size */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Secondary / base</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="secondary" size="base" icon="none">View All Projects</Button>
                  <Button variant="secondary" size="base" icon="right">View All Projects</Button>
                  <Button variant="secondary" size="base" icon="none" disabled>View All Projects</Button>
                  <Button variant="secondary" size="base" icon="right" disabled>View All Projects</Button>
                </div>
              </div>

              {/* Secondary - sm size */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Secondary / sm</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="secondary" size="sm" icon="none">View All Projects</Button>
                  <Button variant="secondary" size="sm" icon="right">View All Projects</Button>
                  <Button variant="secondary" size="sm" icon="none" disabled>View All Projects</Button>
                  <Button variant="secondary" size="sm" icon="right" disabled>View All Projects</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atoms / StatItem */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Atoms / StatItem</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The StatItem component displays statistical information in two variants. The large "section" variant 
                is used in StatsGroup components at the beginning of sections as a metrics summary. The small "meta" 
                variant is used for compact metadata contexts like CaseStudyMeta, with two text-size options (lg and base).
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        value
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Main value to display (for section variant) or fallback for meta variant
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        label
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Label text (for section variant) or fallback for meta variant
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        metaLabel
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional label for meta variant (falls back to label if not provided)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        metaValue
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional value for meta variant (falls back to value if not provided)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        variant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        StatItemVariant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "section"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Variant: section (large, for StatsGroup) or meta (small, for CaseStudyMeta)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        size
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        StatItemSize
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "base"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Size: lg or base (only applies when variant="meta", ignored for section variant)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Section Variant */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Variant: section (large)</h4>
                <div className="flex flex-wrap gap-6">
                  <StatItem variant="section" value="130+" label="Application examples" />
                </div>
              </div>

              {/* Meta Variant - lg */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Variant: meta / size: lg</h4>
                <div className="flex flex-wrap gap-6">
                  <StatItem 
                    variant="meta" 
                    size="lg" 
                    value="Product Design"
                    label="Scope of Work"
                    metaLabel="Scope of Work" 
                    metaValue="Product Design" 
                  />
                </div>
              </div>

              {/* Meta Variant - base */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Variant: meta / size: base</h4>
                <div className="flex flex-wrap gap-6">
                  <StatItem 
                    variant="meta" 
                    size="base" 
                    value="Product Design"
                    label="Scope of Work"
                    metaLabel="Scope of Work" 
                    metaValue="Product Design" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atoms / SubInfo */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Atoms / SubInfo</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The SubInfo component displays a single key/value pair with a monospace label and Inter value. 
                It features two size variants (lg and base) that affect both the label and value font sizes.
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        label
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Label text (e.g., "Location:")
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        value
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Value text (e.g., "Canton of Aargau, Switzerland")
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        size
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        SubInfoSize
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "base"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Size variant: lg or base (affects both label and value font sizes)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Base size */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: base (default)</h4>
                <div className="flex flex-wrap gap-6">
                  <SubInfo 
                    size="base" 
                    label="Location:" 
                    value="Canton of Aargau, Switzerland" 
                  />
                </div>
              </div>

              {/* Large size */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: lg</h4>
                <div className="flex flex-wrap gap-6">
                  <SubInfo 
                    size="lg" 
                    label="Location:" 
                    value="Canton of Aargau, Switzerland" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / SegmentedControl */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / SegmentedControl</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The SegmentedControl component displays a horizontal group of selectable segments, allowing users 
                to choose a single option from multiple choices. It features active and inactive states with hover 
                effects, keyboard navigation support, and two size variants (base and sm).
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        items
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        SegmentedControlItem[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of segment items with id and label
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        value
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ID of the currently selected segment
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        onChange
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        (id: string) =&gt; void
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Callback fired when a segment is selected
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        size
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        SegmentedControlSize
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "base"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Size variant: base or sm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* States Note */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-700">
                <strong className="font-medium text-primary-950">States:</strong> The component implements four visual states: 
                <strong className="font-medium"> inactive</strong> (transparent background, muted text), 
                <strong className="font-medium"> inactive:hover</strong> (light background, darker text), 
                <strong className="font-medium"> active</strong> (gray background, dark text), and 
                <strong className="font-medium"> active:hover</strong> (darker gray background, dark text). 
                All states use CSS hover pseudo-classes for smooth transitions.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Base size */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: base (default)</h4>
                <SegmentedControlExample size="base" />
              </div>

              {/* Small size */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: sm</h4>
                <SegmentedControlExample size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / AccordionItem */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / AccordionItem</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The AccordionItem component displays collapsible content with a header and expandable body. 
                It features smooth animations for height expansion, content fade-in, and icon rotation. 
                Supports both controlled and uncontrolled modes for flexible usage.
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        title
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Header text displayed in the accordion button
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        children
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ReactNode
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Content displayed when accordion is expanded
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        defaultOpen
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        boolean
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        false
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Initial open state (uncontrolled mode)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        open
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        boolean
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Controlled open state (when provided, component becomes controlled)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        onOpenChange
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        (open: boolean) =&gt; void
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Callback fired when open state changes
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        id
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional ID for ARIA attributes
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Behavior Note */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-700">
                <strong className="font-medium text-primary-950">Animations:</strong> The component features smooth 300ms transitions for height expansion, 
                content opacity fade-in, and icon rotation. The height is dynamically calculated based on content size, 
                and automatically adjusts when content changes while open.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Default closed */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Default closed</h4>
                <div className="max-w-2xl">
                  <AccordionItem title="Accordion Header">
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et 
                      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata 
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                  </AccordionItem>
                </div>
              </div>

              {/* Default open */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Default open</h4>
                <div className="max-w-2xl">
                  <AccordionItem title="Accordion Header" defaultOpen>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et 
                      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata 
                      sanctus est Lorem ipsum dolor sit amet.
                    </p>
                  </AccordionItem>
                </div>
              </div>

              {/* Controlled example */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Controlled example</h4>
                <div className="max-w-2xl space-y-4">
                  <AccordionItem
                    title="Controlled Accordion"
                    open={true}
                    onOpenChange={(open) => console.log('Open state:', open)}
                  >
                    <p>
                      This accordion is controlled externally. The open state is managed by the parent component.
                    </p>
                  </AccordionItem>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / SectionDescription */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / SectionDescription</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The SectionDescription component displays a section title with optional description text and 
                an optional call-to-action button. The title is always shown, while the description and CTA 
                button can be independently included or omitted.
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        title
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Section title (always displayed)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        description
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional description text (muted color)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        cta
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        SectionDescriptionCTA
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional CTA button with label, href, and/or onClick
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA Type Note */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-700">
                <strong className="font-medium text-primary-950">CTA Behavior:</strong> If both <code className="font-mono text-xs">href</code> and <code className="font-mono text-xs">onClick</code> are provided, 
                <code className="font-mono text-xs">href</code> takes precedence (renders as Link). The CTA button uses the Button atom with 
                variant="primary", size="base", and icon="none".
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Title only */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Title only</h4>
                <div className="max-w-2xl">
                  <SectionDescription
                    title="Sparked your interest? Let's turn that into a conversation."
                  />
                </div>
              </div>

              {/* Title + description */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Title + description</h4>
                <div className="max-w-2xl">
                  <SectionDescription
                    title="Sparked your interest? Let's turn that into a conversation."
                    description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
                  />
                </div>
              </div>

              {/* Full example */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Title + description + CTA button (full)</h4>
                <div className="max-w-2xl">
                  <SectionDescription
                    title="Sparked your interest? Let's turn that into a conversation."
                    description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
                    cta={{ label: 'CONTACT ME' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / InfoRows */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / InfoRows</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The InfoRows component displays stacked rows of information, each with a left label column and 
                a right content column. Each row has a top border, and items in the right column can optionally 
                be links. Perfect for contact information, social media links, and similar structured data.
              </p>
            </div>

            {/* Props Table */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-primary-200 rounded-lg">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Prop
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Default
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-primary-950 border-b border-primary-200">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        rows
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        InfoRow[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of rows, each with a label and items array
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        size
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        InfoRowsSize
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "lg"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Size variant: lg (18px) or base (16px)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Additional CSS classes
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Type Definitions */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-700 mb-2">
                <strong className="font-medium text-primary-950">Type Definitions:</strong>
              </p>
              <div className="text-xs font-mono text-primary-700 space-y-1">
                <div>InfoRow: {'{ label: string; items: InfoRowItem[] }'}</div>
                <div>InfoRowItem: {'{ label: string; href?: string }'}</div>
              </div>
              <p className="text-sm text-primary-700 mt-3">
                Items with <code className="font-mono text-xs">href</code> are rendered as links. External URLs 
                (http/https) open in a new tab with <code className="font-mono text-xs">rel="noreferrer"</code>. 
                Internal URLs use Next.js Link.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Size: lg (default) */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: lg (default)</h4>
                <div className="max-w-2xl">
                  <InfoRows
                    size="lg"
                    rows={[
                      {
                        label: 'Connect',
                        items: [
                          { label: 'Behance', href: 'https://behance.net' },
                          { label: 'LinkedIn', href: 'https://linkedin.com' },
                          { label: 'Dribbble', href: 'https://dribbble.com' },
                        ],
                      },
                      {
                        label: 'Write me',
                        items: [
                          { label: 'hello@mikedebastiani.ch', href: 'mailto:hello@mikedebastiani.ch' },
                          { label: 'Book a Call', href: '/contact' },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>

              {/* Size: base */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: base</h4>
                <div className="max-w-2xl">
                  <InfoRows
                    size="base"
                    rows={[
                      {
                        label: 'Connect',
                        items: [
                          { label: 'Behance', href: 'https://behance.net' },
                          { label: 'LinkedIn', href: 'https://linkedin.com' },
                          { label: 'Dribbble', href: 'https://dribbble.com' },
                        ],
                      },
                      {
                        label: 'Write me',
                        items: [
                          { label: 'hello@mikedebastiani.ch', href: 'mailto:hello@mikedebastiani.ch' },
                          { label: 'Book a Call', href: '/contact' },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SegmentedControlExample({ size }: { size: 'base' | 'sm' }) {
  const [value, setValue] = useState('segment-1');
  
  const items = [
    { id: 'segment-1', label: 'Segment 1' },
    { id: 'segment-2', label: 'Segment 2' },
    { id: 'segment-3', label: 'Segment 3' },
    { id: 'segment-4', label: 'Segment 4' },
  ];

  return (
    <SegmentedControl
      items={items}
      value={value}
      onChange={setValue}
      size={size}
    />
  );
}

