import { Pill, Button } from '@/components/atoms';

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
      </div>
    </div>
  );
}

