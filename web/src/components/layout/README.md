# Layout System

A consistent, responsive grid-based layout system using CSS variables and React components.

## Overview

The layout system provides a single source of truth for columns, margins, and gutters across all breakpoints. It uses Tailwind's conventional breakpoints and follows a mobile-first approach.

## Layout Tokens

### Breakpoints & Column System

- **Mobile (base → < 768px)**: 4 columns, 16px margin, 16px gutter
- **Tablet (≥ 768px → < 1280px)**: 6 columns, 32px margin, 16px gutter
- **Desktop (≥ 1280px)**: 12 columns, 32px margin, 16px gutter

### CSS Variables

The layout tokens are defined as CSS variables in `globals.css`:

```css
--layout-columns: 4;        /* Responsive: 4 → 6 → 12 */
--layout-margin: 16px;       /* Responsive: 16px → 32px → 32px */
--layout-gutter: 16px;      /* Consistent: 16px across all breakpoints */
--layout-max-width: 1440px;  /* Maximum container width */
```

## Components

### Container

Wraps content with consistent horizontal margins and max-width.

```tsx
import { Container } from '@/components/layout';

<Container>
  <p>Content with consistent margins</p>
</Container>

// Use semantic HTML elements
<Container as="main">
  <h1>Main content</h1>
</Container>

// Add custom classes
<Container className="py-8">
  <p>Content with padding</p>
</Container>
```

**Props:**
- `children`: ReactNode - Content to wrap
- `as?: ElementType` - HTML element to render (default: `'div'`)
- `className?: string` - Additional CSS classes

### Grid

Creates a responsive grid using the layout column system.

```tsx
import { Grid, Col } from '@/components/layout';

<Grid>
  <Col span={12}>Full width</Col>
  <Col span={6}>Half width</Col>
  <Col span={3}>Quarter width</Col>
</Grid>

// With row gap
<Grid rowGap={24}>
  <Col span={4}>Item 1</Col>
  <Col span={4}>Item 2</Col>
  <Col span={4}>Item 3</Col>
</Grid>
```

**Props:**
- `children`: ReactNode - Grid items (typically `Col` components)
- `className?: string` - Additional CSS classes
- `rowGap?: string | number` - Row gap (in pixels if number, or CSS value if string)

### Col

Defines a column span within a `Grid`.

```tsx
import { Grid, Col } from '@/components/layout';

<Grid>
  <Col span={12}>Spans all 12 columns (desktop)</Col>
  <Col span={6}>Spans 6 columns (desktop), 3 columns (tablet), 2 columns (mobile)</Col>
  <Col span={4}>Spans 4 columns (desktop), 2 columns (tablet), 1 column (mobile)</Col>
</Grid>
```

**Props:**
- `children`: ReactNode - Content to render
- `span`: number - Number of columns to span (1-12, will be clamped)
- `className?: string` - Additional CSS classes

**Note:** The `span` prop works across all breakpoints. The grid automatically adjusts:
- On mobile (4 cols): `span={4}` = full width, `span={2}` = half width
- On tablet (6 cols): `span={6}` = full width, `span={3}` = half width
- On desktop (12 cols): `span={12}` = full width, `span={6}` = half width

## Usage Patterns

### Basic Page Layout

```tsx
import { Container } from '@/components/layout';

export default function Page() {
  return (
    <main>
      <Container>
        <h1>Page Title</h1>
        <p>Page content...</p>
      </Container>
    </main>
  );
}
```

### Grid Layout

```tsx
import { Container, Grid, Col } from '@/components/layout';

export default function GridPage() {
  return (
    <main>
      <Container>
        <Grid>
          <Col span={12}>
            <h1>Full Width Header</h1>
          </Col>
          <Col span={6}>
            <p>Left Column</p>
          </Col>
          <Col span={6}>
            <p>Right Column</p>
          </Col>
        </Grid>
      </Container>
    </main>
  );
}
```

### Responsive Column Spans

For responsive column spans, you can use Tailwind classes alongside the `Col` component:

```tsx
<Grid>
  <Col span={12} className="md:col-span-6 xl:col-span-4">
    Responsive column
  </Col>
</Grid>
```

However, note that the grid uses CSS variables, so manual Tailwind classes may not work as expected. It's recommended to use the `span` prop and let the grid system handle responsiveness, or create wrapper components for common patterns.

## Migration Guide

### Replacing Custom Containers

**Before:**
```tsx
<div className="mx-auto max-w-7xl px-6 lg:px-8">
  Content
</div>
```

**After:**
```tsx
<Container>
  Content
</Container>
```

### Replacing Custom Grids

**Before:**
```tsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-6">Content</div>
</div>
```

**After:**
```tsx
<Grid>
  <Col span={6}>Content</Col>
</Grid>
```

## Best Practices

1. **Always use `Container`** for page-level content to ensure consistent margins
2. **Use `Grid` + `Col`** for multi-column layouts instead of flexbox when alignment matters
3. **Keep spans semantic**: Use `span={12}` for full width, `span={6}` for half, etc.
4. **Don't mix** the layout system with custom padding/margin utilities that conflict with the margin system
5. **Test across breakpoints**: Verify layouts at 375px, 768px, and 1280px viewport widths

## Testing

Verify the layout system works correctly at these viewport widths:

- **375px** (mobile): 4 columns, 16px margin, 16px gutter
- **768px** (tablet threshold): 6 columns, 32px margin, 16px gutter
- **1280px** (desktop threshold): 12 columns, 32px margin, 16px gutter
- **1440px+** (large desktop): Container max-width should be respected
