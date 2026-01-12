'use client';

import { useState } from 'react';
import { Pill, Button, StatItem, SubInfo } from '@/components/atoms';
import { SegmentedControl, AccordionItem, SectionDescription, InfoRows, InfoColumns, SubInfoGroup, CaseStudyDescription, CaseStudyMeta, ImpressionCard, ImpressionDetailCard } from '@/components/molecules';
import { RoleBasedHero, StatsGroup, AccordionGroup, ProjectCard, ImpressionItem, ImpressionGallery, WorkflowAtlasTimeline, type WorkflowSegment } from '@/components/organisms';

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

        {/* Layout / Header */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Layout / Header</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                Global header component with responsive navigation. Desktop view shows wordmark, navigation links, and CTA button 
                in a horizontal layout. Mobile view switches to a hamburger menu with slide-out panel. Includes full accessibility 
                support with ARIA attributes, focus trap, scroll lock, and keyboard navigation.
              </p>
              <ul className="list-disc list-inside text-sm text-primary-700 mt-3 space-y-1">
                <li>Desktop: wordmark left, nav links center-right, CTA button far right</li>
                <li>Mobile: hamburger menu with slide-out panel</li>
                <li>Active route highlighting</li>
                <li>Accessibility: ARIA labels, focus trap, scroll lock, ESC key support</li>
                <li>Smooth animations for menu open/close</li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Features</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 space-y-3">
                <div>
                  <strong className="font-medium text-primary-950">Responsive Design:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    Automatically switches between desktop and mobile layouts based on viewport width (breakpoint: lg/1024px).
                  </p>
                </div>
                <div>
                  <strong className="font-medium text-primary-950">Accessibility:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    Full ARIA support, focus trap in mobile menu, body scroll lock when menu is open, keyboard navigation 
                    (ESC to close, Tab navigation), and click-outside-to-close functionality.
                  </p>
                </div>
                <div>
                  <strong className="font-medium text-primary-950">Active State:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    Automatically highlights the active route using Next.js usePathname hook. Active links have darker text color.
                  </p>
                </div>
                <div>
                  <strong className="font-medium text-primary-950">Smooth Animations:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    Menu panel slides in from the right with fade, backdrop fades in/out, and hamburger icon animates to X.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Demo</h3>
              <p className="text-sm text-primary-600 italic mb-4">
                Note: The Header is integrated into the global layout and appears at the top of all pages. 
                Resize your viewport to see the hamburger menu on mobile/tablet sizes.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-700">
                  The Header component is automatically rendered in the root layout. To see it in action, 
                  navigate to any page in the application. The header will appear at the top with:
                </p>
                <ul className="list-disc list-inside text-sm text-primary-700 mt-2 space-y-1">
                  <li>Wordmark linking to home page</li>
                  <li>Navigation links (Work, Lab, Workflow, About)</li>
                  <li>CONTACT button with arrow icon</li>
                  <li>Hamburger menu on mobile/tablet (below 1024px width)</li>
                </ul>
              </div>
            </div>

            {/* Usage */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Usage</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-700 mb-2">
                  The Header is integrated into the root layout (<code className="font-mono text-xs">app/layout.tsx</code>):
                </p>
                <pre className="text-sm text-primary-700 font-mono overflow-x-auto">
{`import { Header } from '@/components/layout/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}`}
                </pre>
              </div>
            </div>

            {/* Navigation Items */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Navigation Items</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-700 mb-2">
                  Current navigation structure (defined in Header component):
                </p>
                <ul className="list-disc list-inside text-sm text-primary-700 space-y-1">
                  <li><strong>Work</strong> → <code className="font-mono text-xs">/</code> (home page)</li>
                  <li><strong>Lab</strong> → <code className="font-mono text-xs">/lab</code></li>
                  <li><strong>Workflow</strong> → <code className="font-mono text-xs">/workflow</code></li>
                  <li><strong>About</strong> → <code className="font-mono text-xs">/about</code></li>
                  <li><strong>CONTACT</strong> → <code className="font-mono text-xs">/contact</code> (CTA button)</li>
                </ul>
              </div>
            </div>
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

        {/* Molecules / InfoColumns */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / InfoColumns</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The InfoColumns component displays an optional description text at the top, followed by 1–4 columns 
                of information. Each column has a title with a divider line and a list of items. Supports size variants 
                (lg and base) and items can optionally be links.
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
                        description
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional description text displayed at the top (full width)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        columns
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        InfoColumn[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of 1–4 columns, each with a title and items array
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        size
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        InfoColumnsSize
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
                <div>InfoColumn: {'{ title: string; items: InfoColumnItem[] }'}</div>
                <div>InfoColumnItem: {'{ label: string; href?: string }'}</div>
              </div>
              <p className="text-sm text-primary-700 mt-3">
                Items with <code className="font-mono text-xs">href</code> are rendered as links. External URLs 
                (http/https) open in a new tab with <code className="font-mono text-xs">rel="noreferrer"</code>. 
                Internal URLs use Next.js Link. Columns automatically adjust to 1–4 columns based on the array length.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Size: lg with description + 2 columns */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: lg with description + 2 columns</h4>
                <div className="max-w-2xl">
                  <InfoColumns
                    size="lg"
                    description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
                    columns={[
                      {
                        title: 'Skills',
                        items: [
                          { label: 'UX Research' },
                          { label: 'Analysis & Synthesis' },
                          { label: 'Personas & User Journeys' },
                          { label: 'Design Thinking & Ideation' },
                          { label: 'Low - High Fidelity Prototyping' },
                          { label: 'Design Systems' },
                          { label: 'Testing & Validation' },
                          { label: 'Agile Product Development' },
                          { label: 'Presentation & Communication' },
                        ],
                      },
                      {
                        title: 'Tools & Technologies',
                        items: [
                          { label: 'Figma' },
                          { label: 'Adobe Creative Suite' },
                          { label: 'HTML, CSS, JavaScript' },
                          { label: 'Next.js' },
                          { label: 'Webflow' },
                          { label: 'GitHub' },
                          { label: 'Jira' },
                          { label: 'Notion' },
                          { label: 'v0, Lovable, Bolt' },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>

              {/* Size: base with description + 4 columns */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Size: base with description + 4 columns</h4>
                <div className="max-w-2xl">
                  <InfoColumns
                    size="base"
                    columns={[
                      {
                        title: 'Col 1',
                        items: [
                          { label: 'Item 1' },
                          { label: 'Item 2' },
                        ],
                      },
                      {
                        title: 'Col 2',
                        items: [
                          { label: 'Item 1' },
                          { label: 'Item 2' },
                        ],
                      },
                      {
                        title: 'Col 3',
                        items: [
                          { label: 'Item 1' },
                          { label: 'Item 2' },
                        ],
                      },
                      {
                        title: 'Col 4',
                        items: [
                          { label: 'Item 1' },
                          { label: 'Item 2' },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / SubInfoGroup */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / SubInfoGroup</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The SubInfoGroup component composes multiple SubInfo atoms in either a row or column layout. 
                It forwards the size prop to each SubInfo atom and supports an optional status dot for specific items 
                (e.g., Status rows). Perfect for displaying related metadata in a structured format.
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
                        SubInfoGroupItem[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of items, each with label, value, and optional showDot
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        variant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        SubInfoGroupVariant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "row"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Layout variant: row (horizontal) or column (vertical)
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
                        Size variant: lg (18px) or base (16px), forwarded to SubInfo atoms
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
                <div>SubInfoGroupItem: {'{ label: string; value: string; showDot?: boolean }'}</div>
              </div>
              <p className="text-sm text-primary-700 mt-3">
                When <code className="font-mono text-xs">showDot</code> is true, a blue status dot is displayed 
                between the label and value. The dot uses accent-blue with a soft outer circle and solid inner dot.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Row, size="base" */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Row, size="base"</h4>
                <div className="max-w-2xl">
                  <SubInfoGroup
                    variant="row"
                    size="base"
                    items={[
                      { label: 'Location:', value: 'Canton of Aargau, Switzerland' },
                      { label: 'Status:', value: 'Available for Work', showDot: true },
                    ]}
                  />
                </div>
              </div>

              {/* Row, size="lg" */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Row, size="lg"</h4>
                <div className="max-w-2xl">
                  <SubInfoGroup
                    variant="row"
                    size="lg"
                    items={[
                      { label: 'Location:', value: 'Canton of Aargau, Switzerland' },
                      { label: 'Status:', value: 'Available for Work', showDot: true },
                    ]}
                  />
                </div>
              </div>

              {/* Column, size="base" */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Column, size="base"</h4>
                <div className="max-w-2xl">
                  <SubInfoGroup
                    variant="column"
                    size="base"
                    items={[
                      { label: 'Location:', value: 'Zürich, Switzerland' },
                      { label: 'Status:', value: 'Available for Work', showDot: true },
                    ]}
                  />
                </div>
              </div>

              {/* Column, size="lg" */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">Column, size="lg"</h4>
                <div className="max-w-2xl">
                  <SubInfoGroup
                    variant="column"
                    size="lg"
                    items={[
                      { label: 'Location:', value: 'Zürich, Switzerland' },
                      { label: 'Status:', value: 'Available for Work', showDot: true },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / CaseStudyDescription */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / CaseStudyDescription</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                CMS-driven case study header block. Displays a project title, statement headline, description paragraph, 
                and optional attribute pills. Perfect for introducing case studies with a clear visual hierarchy.
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
                        projectTitle
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Small muted project title displayed at the top
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        statement
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Large statement/headline text (multi-line supported)
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
                        Paragraph description text
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        attributes
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        undefined
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional array of attribute tags rendered as Pill components
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
              
              <div>
                <div className="max-w-3xl">
                  <CaseStudyDescription
                    projectTitle="Adjusto"
                    statement="Automating price discovery in the secondhand market through Dutch Auction mechanics."
                    description="Adjusto addresses the inherent inefficiency of C2C marketplaces: the friction of negotiation. By implementing a Dutch Auction mechanic where prices decay over time, the app replaces manual haggling with algorithmic price discovery. This shifts the user experience from social confrontation to strategic timing, ensuring items find their true market equilibrium while maximizing the clearance rate for sellers."
                    attributes={['User Experience', 'Prototyping', 'Testing', 'Innovation']}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / CaseStudyMeta */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / CaseStudyMeta</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                CMS-driven case study metadata block. Displays a vertical list of five fixed meta fields (Role, Context, Timeline, Team, Outcome) 
                using StatItem atoms with meta variant. Perfect for presenting structured project metadata in a consistent format.
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
                        role
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Role value displayed in the first StatItem
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        context
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Context value displayed in the second StatItem
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        timeline
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Timeline value displayed in the third StatItem
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        team
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Team value displayed in the fourth StatItem
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        outcome
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Outcome value displayed in the fifth StatItem
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
                <strong className="font-medium text-primary-950">Composition:</strong>
              </p>
              <p className="text-sm text-primary-700">
                This component is composed of 5 <code className="font-mono text-xs">StatItem</code> atoms, each with 
                <code className="font-mono text-xs"> variant="meta"</code> and <code className="font-mono text-xs">size="base"</code>. 
                The fields are always rendered in the same order: Role, Context, Timeline, Team, Outcome.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              <div>
                <div className="max-w-md">
                  <CaseStudyMeta
                    role="Innovation & UX/UI Designer"
                    context="Student project supported by Swiss Post"
                    timeline="12 weeks in 2025"
                    team="3 Designer (Co-Students)"
                    outcome="High Fidelity Prototype"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organisms / RoleBasedHero */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Organisms / RoleBasedHero</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                A segmented role selector with dynamic hero content. Selecting a role updates the content below. 
                The first four roles display headline-style text, while the Engineers role shows a fake code snippet 
                with syntax-like coloring. Perfect for personalized messaging based on audience type.
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
                        defaultRoleId
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        RoleId
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "for-anyone"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Initial role to display
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        tabs
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        RoleTab[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        defaultTabs
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional override for role tabs (defaults to 5 standard roles)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        contentByRole
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Record&lt;RoleId, RoleHeroContent&gt;
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        defaultContent
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional override for role content (defaults to Figma text)
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
                <div>RoleId: "for-anyone" | "recruiters" | "hiring-managers" | "product-designers" | "engineers"</div>
                <div>RoleTab: {'{ id: RoleId; label: string }'}</div>
                <div>RoleHeroContent: {'{ type: "headline"; text: string } | { type: "code"; lines: Array&lt;...&gt; }'}</div>
              </div>
              <p className="text-sm text-primary-700 mt-3">
                Headline content displays large text (40px, Inter Medium). Code content renders a fake code snippet 
                with syntax-like coloring (purple for keywords, green for strings, orange for variables, etc.) and line numbers.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Interactive Example */}
              <div>
                <div className="max-w-5xl">
                  <RoleBasedHero />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organisms / StatsGroup */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Organisms / StatsGroup</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                A horizontal group of 2–4 statistics, evenly distributed across full width. Built from StatItem 
                components with the section variant. Perfect for displaying key metrics or achievements in a 
                balanced, scannable layout.
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
                        StatsGroupItem[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of 2–4 stat items, each with value and label (subLabel and subValue are optional)
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
                <div>StatsGroupItem: {'{ value: string; label: string; subLabel?: string; subValue?: string }'}</div>
              </div>
              <p className="text-sm text-primary-700 mt-3">
                The component automatically adjusts grid columns based on item count (2 items = 2 columns, 3 items = 3 columns, 4 items = 4 columns). 
                In development mode, a console warning is shown if the item count is outside the 2–4 range, but the component will still render.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* 4-item example */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">4-item example</h4>
                <div className="max-w-4xl">
                  <StatsGroup
                    items={[
                      { value: '130+', label: 'Application examples' },
                      { value: '37', label: 'Methods' },
                      { value: '6', label: 'Phases' },
                      { value: '7', label: 'Projects' },
                    ]}
                  />
                </div>
                </div>

              {/* 2-item example */}
              <div>
                <h4 className="text-sm font-medium text-primary-600 mb-3">2-item example</h4>
                  <StatsGroup
                    items={[
                      { value: '50+', label: 'Projects completed' },
                      { value: '5', label: 'Years experience' },
                    ]}
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Organisms / AccordionGroup */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Organisms / AccordionGroup</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                A single-open accordion group where only one item can be open at a time. Built from AccordionItem 
                molecules with automatic state management. Opening a new item automatically closes the previously 
                open item. Supports both controlled and uncontrolled modes.
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
                        AccordionGroupItem[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of accordion items, each with id, title, and content
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        defaultOpenId
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        undefined
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Initial open item ID for uncontrolled mode
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        openId
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        undefined
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Controlled open item ID (use with onOpenIdChange)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        onOpenIdChange
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        (id: string | null) =&gt; void
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        undefined
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Callback when open item changes (id is null when all closed)
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
                <div>AccordionGroupItem: {'{ id: string; title: string; content: React.ReactNode }'}</div>
              </div>
              <p className="text-sm text-primary-700 mt-3">
                The component automatically ensures only one item is open at a time. When an item is opened, 
                any previously open item is automatically closed. Use <code className="font-mono text-xs">openId</code> and 
                <code className="font-mono text-xs">onOpenIdChange</code> for controlled mode, or 
                <code className="font-mono text-xs">defaultOpenId</code> for uncontrolled mode.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* 5-item example */}
              <div>
                <div className="max-w-2xl">
                  <AccordionGroup
                    defaultOpenId="item-1"
                    items={[
                      {
                        id: 'item-1',
                        title: 'Accordion Header One',
                        content: (
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                          </p>
                        ),
                      },
                      {
                        id: 'item-2',
                        title: 'Accordion Header Two',
                        content: (
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                          </p>
                        ),
                      },
                      {
                        id: 'item-3',
                        title: 'Accordion Header Three',
                        content: (
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                          </p>
                        ),
                      },
                      {
                        id: 'item-4',
                        title: 'Accordion Header Four',
                        content: (
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
                          </p>
                        ),
                      },
                      {
                        id: 'item-5',
                        title: 'Accordion Header Five',
                        content: (
                          <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.
                          </p>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organisms / ProjectCard */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Organisms / ProjectCard</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The ProjectCard component is a CMS-driven project preview card that displays project information with an image, tags, title, and description. 
                The entire card is clickable and navigates to the project detail page. On hover or focus, a button overlay appears in the top-right of the image area.
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
                        project
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ProjectCardData
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Project data object containing slug, title, excerpt, tags, and image
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
                <div>ProjectCardData: {'{'}</div>
                <div className="pl-4">slug: string;</div>
                <div className="pl-4">title: string;</div>
                <div className="pl-4">excerpt: string;</div>
                <div className="pl-4">tags?: string[];</div>
                <div className="pl-4">image?: {'{'} src: string; alt?: string; {'}'} | null;</div>
                <div>{'}'}</div>
              </div>
              <p className="text-sm text-primary-700 mt-3">
                The component uses a Next.js Link wrapper to make the entire card clickable, navigating to <code className="font-mono text-xs">/projects/[slug]</code>. 
                The hover button is a visual overlay and does not create a separate link—clicking it still navigates via the card link.
              </p>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Sample project card */}
              <div className="max-w-2xl">
                <p className="text-sm text-primary-600 mb-4 italic">
                  Hover or focus the card to see the button overlay appear in the top-right of the image area.
                </p>
                <ProjectCard
                  project={{
                    slug: 'ux-meets-web-penda',
                    title: 'UX meets Web – Penda',
                    excerpt: 'A student carpooling platform built from scratch. I bridged the gap between UX and Engineering by delivering a scalable design system, validated prototypes, and a fully functional frontend implementation.',
                    tags: ['User Experience', 'UI Design', 'Design System', 'Frontend Development'],
                    image: null,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Molecules / ImpressionCard */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / ImpressionCard</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                Collapsed preview of an impression. Displays an image container with rounded corners and a method pill underneath. 
                The pill does not scale when used in galleries—only the image container scales. This is a presentational component with no click or state logic.
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
                        image
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        {'{'} src: string; alt: string {'}'} | undefined
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        undefined
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional image object with source and alt text. Shows placeholder if not provided.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        methodLabel
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Method name displayed in the pill (e.g., "User Interviews", "Prototyping")
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        methodColorVariant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        MethodColorVariant
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        "default"
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Color variant for the pill: default, blue, purple, magenta, orange, green, darkgrey
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
              
              {/* color variants */}
              <div className="space-y-4 mb-6">
                <h4 className="text-base font-medium text-primary-950">Method color variants</h4>
                <div className="flex flex-wrap gap-6">
                  <ImpressionCard
                    methodLabel="Default Method"
                    methodColorVariant="default"
                  />
                  <ImpressionCard
                    methodLabel="Blue Method"
                    methodColorVariant="blue"
                  />
                  <ImpressionCard
                    methodLabel="Purple Method"
                    methodColorVariant="purple"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Molecules/ ImpressionDetailCard */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Molecules / ImpressionDetailCard</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                Expanded detail panel shown when an ImpressionItem is opened. Displays project label, title, description, 
                and a primary button. This component is used inside ImpressionItem and has no internal expand/collapse logic.
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
                        projectLabel
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Project name displayed in the label (e.g., "Adjusto")
                      </td>
                    </tr>
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
                        Main title/heading for the impression (e.g., "Method Card Title")
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
                        Description paragraph text for the impression
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        buttonLabel
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Label text for the primary button
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        buttonHref
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        URL for the button link (e.g., "/projects/adjusto")
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
              
              {/* Default example */}
              <div className="space-y-4">
                <h4 className="text-base font-medium text-primary-950">Default detail card</h4>
                <div className="w-fit">
                  <ImpressionDetailCard
                    projectLabel="Adjusto"
                    title="Method Card Title"
                    description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                    buttonLabel="View Project"
                    buttonHref="/projects/adjusto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organisms / ImpressionItem */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Organisms / ImpressionItem</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                Interactive wrapper that combines ImpressionCard and ImpressionDetailCard. The entire item is clickable and toggles 
                between collapsed and expanded states. When expanded, the detail card animates open with smooth transitions. 
                Supports keyboard interaction (Enter/Space) and includes proper ARIA attributes for accessibility.
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
                        id
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Unique identifier for the impression item (used for ARIA attributes)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        card
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ImpressionCardProps
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Props for the ImpressionCard component (image, methodLabel, methodColorVariant)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        detail
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        ImpressionDetailCardProps
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Props for the ImpressionDetailCard component (projectLabel, title, description, buttonLabel, buttonHref)
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
                        Initial expanded state
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        onToggleOpen
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        (open: boolean) =&gt; void
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional callback function called when item is toggled
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

            {/* States */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">States</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 space-y-2">
                <div>
                  <strong className="font-medium text-primary-950">Collapsed:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    Shows only the ImpressionCard (image + method pill). Detail card is hidden.
                  </p>
              </div>
                <div>
                  <strong className="font-medium text-primary-950">Expanded:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    Shows ImpressionCard on the left and ImpressionDetailCard on the right. 
                    Detail card animates in with smooth transitions (max-height, opacity, translateY).
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Accessibility</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-700">
                  The component uses <code className="font-mono text-xs">aria-expanded</code> to indicate the expanded state, 
                  <code className="font-mono text-xs">aria-controls</code> to link the button to the detail panel, and 
                  <code className="font-mono text-xs">aria-label</code> for screen reader descriptions. 
                  Keyboard interaction is supported: Enter or Space toggles the expansion state. 
                  Focus management is handled with visible focus rings.
                </p>
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Collapsed example */}
              <div className="space-y-4 mb-6">
                <h4 className="text-base font-medium text-primary-950">Collapsed (default)</h4>
                <p className="text-sm text-primary-600 italic">
                  Click anywhere on the item to expand it and see the detail card.
                </p>
                <div className="w-fit">
                  <ImpressionItem
                    id="impression-1"
                    card={{
                      methodLabel: 'User Research',
                      methodColorVariant: 'blue',
                    }}
                    detail={{
                      projectLabel: 'Adjusto',
                      title: 'Discovery Phase Insights',
                      description: 'Comprehensive user research and analysis to understand user needs and behaviors. This phase involved interviews, surveys, and data analysis.',
                      buttonLabel: 'View Project',
                      buttonHref: '/projects/adjusto',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organisms / ImpressionGallery */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Organisms / ImpressionGallery</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                A horizontally scrollable gallery of ImpressionItem components. Clicking an item smoothly scrolls it to the center 
                of the gallery and then expands it. Only one item can be expanded at a time. If a user manually scrolls while an item 
                is expanded, it automatically collapses to allow smooth scrolling. Items are bottom-aligned so that method pills sit 
                on the same baseline across the row.
              </p>
              <ul className="list-disc list-inside text-sm text-primary-700 mt-3 space-y-1">
                <li>Always maintains 24px gap between items (collapsed and expanded)</li>
                <li>Clicking an item: collapses any open item, scrolls clicked item to center, then opens it</li>
                <li>Manual scrolling automatically collapses the open item</li>
                <li>Bottom-aligned layout ensures pills align across all items</li>
                <li>Smooth transitions for both scrolling and expand/collapse animations</li>
              </ul>
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
                        ImpressionGalleryItem[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of impression items to display in the gallery. Each item includes id, card props, detail props, and optional imageScale.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        className
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100 font-mono">
                        ""
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Additional CSS classes for the gallery container
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 font-mono">
                        initialActiveId
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        string | null
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 font-mono">
                        null
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700">
                        Optional ID of the item that should be initially expanded
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Behavior */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Behavior</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 space-y-3">
                <div>
                  <strong className="font-medium text-primary-950">Click to Expand:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    When clicking an item, the gallery first collapses any currently open item, then smoothly scrolls the clicked item 
                    to the horizontal center of the viewport, and finally expands it. This sequence ensures no visual jumps.
                  </p>
                </div>
                <div>
                  <strong className="font-medium text-primary-950">Auto-Collapse on Scroll:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    If an item is expanded and the user manually scrolls (via mouse wheel, trackpad, or drag), the expanded item 
                    automatically collapses without blocking the scroll action. This allows users to freely browse the gallery.
                  </p>
                </div>
                <div>
                  <strong className="font-medium text-primary-950">Single Active Item:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    Only one item can be expanded at a time. Clicking a different item immediately collapses the previous one.
                  </p>
                </div>
                <div>
                  <strong className="font-medium text-primary-950">Bottom Alignment:</strong>
                  <p className="text-sm text-primary-700 mt-1">
                    All items are bottom-aligned so that method pills sit on the same baseline. When an item expands, it grows 
                    downward without affecting the alignment of other items.
                  </p>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-medium text-primary-950 mb-3">Examples</h3>
              
              {/* Default gallery */}
              <div className="space-y-4 mb-6">
                <h4 className="text-base font-medium text-primary-950">Default Gallery</h4>
                <p className="text-sm text-primary-600 italic">
                  Click any item to see it scroll to center and expand. Try scrolling manually while an item is open to see it auto-collapse.
                </p>
                <div className="w-full overflow-hidden">
                  <ImpressionGallery
                    items={[
                      {
                        id: 'gallery-1',
                        card: {
                          methodLabel: 'User Research',
                          methodColorVariant: 'blue',
                        },
                        detail: {
                          projectLabel: 'Adjusto',
                          title: 'Discovery Phase Insights',
                          description: 'Comprehensive user research and analysis to understand user needs and behaviors. This phase involved interviews, surveys, and data analysis to identify key pain points and opportunities.',
                          buttonLabel: 'View Project',
                          buttonHref: '/projects/adjusto',
                        },
                      },
                      {
                        id: 'gallery-2',
                        card: {
                          methodLabel: 'Data Analysis',
                          methodColorVariant: 'purple',
                        },
                        detail: {
                          projectLabel: 'TechFlow',
                          title: 'Quantitative Metrics Review',
                          description: 'Deep dive into user engagement metrics, conversion rates, and behavioral patterns. Analyzed over 10,000 user sessions to identify optimization opportunities.',
                          buttonLabel: 'Learn More',
                          buttonHref: '/projects/techflow',
                        },
                      },
                      {
                        id: 'gallery-3',
                        card: {
                          methodLabel: 'Ideation',
                          methodColorVariant: 'magenta',
                        },
                        detail: {
                          projectLabel: 'DesignSystem',
                          title: 'Concept Development Workshop',
                          description: 'Facilitated collaborative ideation sessions with cross-functional teams. Generated 50+ concepts, refined through rapid prototyping and user feedback loops.',
                          buttonLabel: 'Explore',
                          buttonHref: '/projects/designsystem',
                        },
                      },
                      {
                        id: 'gallery-4',
                        card: {
                          methodLabel: 'Prototyping',
                          methodColorVariant: 'orange',
                        },
                        detail: {
                          projectLabel: 'AppFlow',
                          title: 'Interactive Prototype Testing',
                          description: 'Created high-fidelity interactive prototypes using Figma and tested with 15 users. Iterated based on feedback to improve usability and reduce cognitive load.',
                          buttonLabel: 'View Case Study',
                          buttonHref: '/projects/appflow',
                        },
                      },
                      {
                        id: 'gallery-5',
                        card: {
                          methodLabel: 'User Testing',
                          methodColorVariant: 'green',
                        },
                        detail: {
                          projectLabel: 'DataViz',
                          title: 'Usability Testing Sessions',
                          description: 'Conducted moderated usability tests with 20 participants. Collected qualitative feedback and quantitative metrics to validate design decisions and identify areas for improvement.',
                          buttonLabel: 'Read Report',
                          buttonHref: '/projects/dataviz',
                        },
                      },
                      {
                        id: 'gallery-6',
                        card: {
                          methodLabel: 'Implementation',
                          methodColorVariant: 'darkgrey',
                        },
                        detail: {
                          projectLabel: 'CloudSync',
                          title: 'Development Handoff',
                          description: 'Collaborated with engineering team to ensure pixel-perfect implementation. Provided detailed specifications, design tokens, and interactive prototypes for seamless handoff.',
                          buttonLabel: 'See Details',
                          buttonHref: '/projects/cloudsync',
                        },
                      },
                      {
                        id: 'gallery-7',
                        card: {
                          methodLabel: 'User Research',
                          methodColorVariant: 'blue',
                        },
                        detail: {
                          projectLabel: 'MarketPlace',
                          title: 'Ethnographic Study',
                          description: 'Spent two weeks observing users in their natural environment. Documented workflows, pain points, and opportunities for innovation through contextual inquiry methods.',
                          buttonLabel: 'View Study',
                          buttonHref: '/projects/marketplace',
                        },
                      },
                      {
                        id: 'gallery-8',
                        card: {
                          methodLabel: 'Data Analysis',
                          methodColorVariant: 'purple',
                        },
                        detail: {
                          projectLabel: 'Analytics Pro',
                          title: 'A/B Testing Results',
                          description: 'Designed and analyzed A/B tests across multiple variants. Achieved 23% improvement in conversion rates through data-driven design decisions and iterative optimization.',
                          buttonLabel: 'View Results',
                          buttonHref: '/projects/analytics-pro',
                        },
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organisms / WorkflowAtlasTimeline */}
        <section>
          <h2 className="text-2xl font-semibold text-primary-950 mb-4">Organisms / WorkflowAtlasTimeline</h2>
          
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-primary-700 max-w-3xl">
                The WorkflowAtlasTimeline component renders a non-scrollable horizontal timeline made of many small segments. 
                Each segment represents a method, color-coded by phase. Segment width is proportional to the number of examples 
                for that method. One segment can be active at a time, with hover and active states for interaction.
              </p>
              <ul className="list-disc list-inside text-sm text-primary-700 mt-3 space-y-1">
                <li>Segments are color-coded by phase (research, analysis, ideation, design, testing, development)</li>
                <li>Width is proportional to count (number of CMS examples)</li>
                <li>Hover increases opacity; active segment has 100% opacity and is slightly taller</li>
                <li>Emits onSegmentSelect for future ImpressionGallery syncing</li>
              </ul>
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
                        segments
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        WorkflowSegment[]
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Array of segments, each with id, methodName, phase, count, and optional galleryIndex
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        defaultActiveId
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Initial active segment ID (uncontrolled mode)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        activeId
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        string
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Controlled active segment ID
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        onActiveChange
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        (id: string, segment: WorkflowSegment) =&gt; void
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Callback when active segment changes
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        onSegmentSelect
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        (segment: WorkflowSegment) =&gt; void
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Callback for segment selection (for future ImpressionGallery syncing)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100 font-mono">
                        phaseLabels
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Partial&lt;Record&lt;WorkflowPhaseKey, string&gt;&gt;
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-500 border-b border-primary-100">
                        —
                      </td>
                      <td className="px-4 py-2 text-sm text-primary-700 border-b border-primary-100">
                        Optional legend label overrides for phases
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
              
              {/* Default example */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-primary-600 mb-3">Default Example</h4>
                <p className="text-sm text-primary-500 mb-3">
                  Timeline with 30 segments across all phases, with mixed counts (1-12 examples per method).
                </p>
                <div className="w-full">
                  <WorkflowAtlasTimelineExample1 />
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

// WorkflowAtlasTimeline Example 1: Default with many segments
function WorkflowAtlasTimelineExample1() {
  const segments: WorkflowSegment[] = [
    // Research phase (blue)
    { id: 'r1', methodName: 'User Interviews', phase: 'research', count: 8 },
    { id: 'r2', methodName: 'Surveys', phase: 'research', count: 7 },
    { id: 'r3', methodName: 'Field Studies', phase: 'research', count: 4 },
    { id: 'r4', methodName: 'Competitive Analysis', phase: 'research', count: 5 },
    { id: 'r5', methodName: 'Stakeholder Interviews', phase: 'research', count: 3 },
    { id: 'r6', methodName: 'Desk Research', phase: 'research', count: 2 },
    { id: 'r7', methodName: 'Literature Review', phase: 'research', count: 1 },
    // Analysis phase (purple)
    { id: 'a1', methodName: 'Affinity Mapping', phase: 'analysis', count: 7 },
    { id: 'a2', methodName: 'Journey Mapping', phase: 'analysis', count: 6 },
    { id: 'a3', methodName: 'Persona Development', phase: 'analysis', count: 5 },
    { id: 'a4', methodName: 'Data Synthesis', phase: 'analysis', count: 4 },
    { id: 'a5', methodName: 'Problem Framing', phase: 'analysis', count: 5 },
    { id: 'a6', methodName: 'Insight Extraction', phase: 'analysis', count: 3 },
    { id: 'a7', methodName: 'Pattern Recognition', phase: 'analysis', count: 2 },
    // Ideation phase (magenta)
    { id: 'i1', methodName: 'Brainstorming', phase: 'ideation', count: 8 },
    { id: 'i2', methodName: 'Sketching', phase: 'ideation', count: 7 },
    { id: 'i3', methodName: 'Rapid Prototyping', phase: 'ideation', count: 3 },
    { id: 'i4', methodName: 'Concept Testing', phase: 'ideation', count: 2 },
    { id: 'i5', methodName: 'Storyboarding', phase: 'ideation', count: 1 },
    // Design phase (orange)
    { id: 'd1', methodName: 'Wireframing', phase: 'design', count: 7 },
    { id: 'd2', methodName: 'Visual Design', phase: 'design', count: 7 },
    { id: 'd3', methodName: 'Interaction Design', phase: 'design', count: 7 },
    { id: 'd4', methodName: 'Design System', phase: 'design', count: 5 },
    { id: 'd5', methodName: 'Prototype Refinement', phase: 'design', count: 2 },
    { id: 'd6', methodName: 'Usability Testing', phase: 'design', count: 1 },
    // Testing phase (green)
    { id: 't1', methodName: 'A/B Testing', phase: 'testing', count: 7 },
    { id: 't2', methodName: 'User Testing', phase: 'testing', count: 6 },
    { id: 't3', methodName: 'Accessibility Audit', phase: 'testing', count: 4 },
    { id: 't4', methodName: 'Performance Testing', phase: 'testing', count: 2 },
    { id: 't5', methodName: 'Quality Assurance', phase: 'testing', count: 1 },
    // Development phase (darkgrey)
    { id: 'dev1', methodName: 'Frontend Development', phase: 'development', count: 9 },
    { id: 'dev2', methodName: 'Backend Development', phase: 'development', count: 2 },
    { id: 'dev3', methodName: 'Deployment', phase: 'development', count: 1 },
    { id: 'dev4', methodName: 'Maintenance', phase: 'development', count: 1 },
  ];

  return <WorkflowAtlasTimeline segments={segments} defaultActiveId="d3" />;
}