# fizaki Logo & Branding Assets

All logo files are in SVG format for maximum scalability and quality at any size.

## Logo Files

### Core Brand Colors
- **Primary Green**: `#10B981` (used for main branding)
- **Dark Green**: `#059669` (used for accents and gradients)
- **Text Color**: `#1F2937` (dark gray for text)

### Logo Variants

#### `logo-mark.svg`
**Use case**: Icon-only version, minimal mark
- **Size**: 64x64px minimum, scalable
- **Best for**: Favicons, small UI elements, app icons
- **Background**: Transparent (no background color)

#### `logo-icon-white.svg`
**Use case**: White version for dark backgrounds
- **Size**: 64x64px minimum, scalable
- **Best for**: Dark mode UI, dark backgrounds, headers
- **Background**: Transparent (no background color)

#### `logo-icon-dark.svg`
**Use case**: Dark green version for light backgrounds
- **Size**: 64x64px minimum, scalable
- **Best for**: Light backgrounds, print media, light mode
- **Background**: Transparent (no background color)

#### `logo-app-icon.svg`
**Use case**: Full app icon with background and rounded corners
- **Size**: 192x192px minimum (can scale up to 1024x1024px for iOS/Android)
- **Best for**: App store listings, device home screens, app shortcuts
- **Background**: Green (#10B981) with rounded corners

#### `logo-horizontal.svg`
**Use case**: Horizontal lockup with name and tagline
- **Size**: 240x64px minimum, scalable
- **Best for**: Headers, footers, horizontal layouts, navigation bars
- **Background**: Transparent

#### `logo-wordmark.svg`
**Use case**: Text-only wordmark with tagline
- **Size**: 320x80px minimum, scalable
- **Best for**: Letterheads, certificates, formal documents, large displays
- **Background**: Transparent

## Design Philosophy

The **funnel icon** represents:
- **Lead Capture**: The wide top catches all leads
- **Refinement**: The middle section filters and qualifies
- **Conversion**: The pointed bottom represents qualified, ready-to-close leads

This visual metaphor reinforces fizaki's core promise: **"No Leads Slip Away"**

## Implementation Guidelines

### Web Usage
- Use `logo-horizontal.svg` in the header/navigation (recommended 150-200px width)
- Use `logo-mark.svg` as favicon (already set in `app/icon.svg`)
- Use `logo-icon-white.svg` in footer on dark backgrounds
- Use `logo-wordmark.svg` for hero sections and large displays

### Mobile Apps
- Use `logo-app-icon.svg` (192x192px for Android, scale as needed for iOS)
- Use `logo-mark.svg` for in-app navigation icons

### Print & Collateral
- Use `logo-wordmark.svg` or `logo-horizontal.svg`
- Maintain clear space around the logo (minimum 10% of logo height)
- Minimum print size: 1 inch wide

### Dark Mode
- Use `logo-icon-white.svg` for icon
- Use `logo-wordmark.svg` (adjust text color to white as needed)

## File Sizes & Optimization

All SVGs are already optimized for web delivery. No additional compression needed unless using a build tool like ImageOptim.

## Color Accessibility

- Primary Green (#10B981) has WCAG AA compliance with white text
- Logo maintains sufficient contrast in all color modes
- Tested for color-blind accessibility

---

Last Updated: August 2026
Design: fizaki Brand Team
