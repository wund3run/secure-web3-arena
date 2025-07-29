# Hawkly UI Components Documentation

This document outlines the custom UI components created for the Hawkly design system, with a focus on those used in the Dashboard implementation.

## Core Components

### HawklyCard

A versatile card component with multiple variants for different visual treatments.

```tsx
<HawklyCard 
  variant="glass" | "highlighted" | "standard"
  elevation="none" | "subtle" | "medium" | "high"
  interactive={boolean}
  glow={boolean}
  className="optional-additional-classes"
>
  {children}
</HawklyCard>
```

#### Variants

- **glass**: Translucent background with subtle backdrop blur
- **highlighted**: Special highlight styling with brand color accents
- **standard**: Solid background with standard styling

#### Elevation

- **none**: No shadow effect
- **subtle**: Very light shadow for subtle depth
- **medium**: Standard elevation for card components
- **high**: Higher elevation for floating/important cards

#### Interactive

Boolean flag that adds hover effects for clickable cards

#### Glow

Boolean flag that adds a subtle glow effect with brand colors

### SecurityBadge

A component that displays the security level/verification status of a user or project.

```tsx
<SecurityBadge 
  level="basic" | "advanced" | "enterprise"
  verified={boolean}
  size="sm" | "md" | "lg"
/>
```

#### Level

- **basic**: Standard security level (blue styling)
- **advanced**: Enhanced security (purple styling)
- **enterprise**: Highest security tier (gold styling)

#### Verified

Boolean that adds a verification check mark

#### Size

- **sm**: Small badge size
- **md**: Medium badge size (default)
- **lg**: Large badge size

### ProgressIndicator

A visual indicator for displaying progress percentages.

```tsx
<ProgressIndicator 
  value={number}
  max={number}
  glowEffect={boolean}
/>
```

#### Value

Current progress value

#### Max

Maximum possible value (100 is default)

#### GlowEffect

Boolean flag that adds a glowing effect to the progress bar

### LiveMetric

A component for displaying real-time metrics with trend indicators.

```tsx
<LiveMetric
  label="Label"
  value="Value"
  trend="up" | "down" | "neutral"
/>
```

#### Label

Text label for the metric

#### Value

Current value of the metric

#### Trend

Direction of change for the metric:

- **up**: Positive trend (green styling)
- **down**: Negative trend (red styling)
- **neutral**: No change (gray styling)

## Integration Guidelines

When integrating these components into pages, follow these guidelines:

1. **Consistency**: Use the same variant of HawklyCard for similar content types
2. **Elevation Logic**: Apply higher elevation to more important/interactive elements
3. **Color Usage**: Maintain the brand color palette (purple #a879ef, blue #32d9fa, dark backgrounds)
4. **Spacing**: Use consistent spacing between components (e.g., space-y-6, gap-4)
5. **Text Hierarchy**: Follow text size and weight standards for different content types

## Component Structure

Components are organized in:
- `@/components/ui/hawkly-components.ts`: Core Hawkly UI components
- `@/components/ui/button.tsx`: Standard button component
- `@/components/ui/tabs.tsx`: Tab components

## Implementation Example

```tsx
<HawklyCard variant="glass" elevation="subtle">
  <div className="p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[#8391ad] text-sm">Active Projects</p>
        <p className="text-2xl font-bold text-white mt-1">3</p>
      </div>
      <div className="rounded-full p-2 bg-[#272e43]">
        <Activity size={20} className="text-[#32d9fa]" />
      </div>
    </div>
    <div className="mt-4">
      <ProgressIndicator value={3} max={12} />
    </div>
  </div>
</HawklyCard>
```

## Custom Color Palette

- Background: `bg-[#0a0d16]`
- Card backgrounds: `bg-[#1e2332]`
- Secondary backgrounds: `bg-[#272e43]`
- Borders: `border-[#23283e]`
- Primary text: `text-white`
- Secondary text: `text-[#8391ad]`
- Accent purple: `text-[#a879ef]`
- Accent blue: `text-[#32d9fa]`
- Success green: `text-[#2de08e]`
- Error red: `text-[#fc3574]`
- Warning yellow: `text-[#ffd553]`
