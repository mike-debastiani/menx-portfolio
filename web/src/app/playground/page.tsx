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
      </div>
    </div>
  );
}

