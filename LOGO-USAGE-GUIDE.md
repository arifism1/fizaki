# fizaki Logo & Branding Guide

## Summary

A complete professional logo system has been created for fizaki and is now ready to use across all platforms.

### What Was Created

✅ **Logo Assets** - 5 SVG logo variants designed for different use cases
✅ **Updated Favicon** - Modern funnel-based icon in app/icon.svg  
✅ **React Component** - Reusable Logo component for easy integration
✅ **Brand Documentation** - Comprehensive guidelines and usage instructions

---

## Logo Files Location

All logo files are stored in: `/public/logos/`

### Available Logo Files

1. **logo-mark.svg** - Icon-only version (64×64px) - Best for small UI elements and favicons
2. **logo-horizontal.svg** - Horizontal layout with text (240×64px) - Best for headers and navigation
3. **logo-wordmark.svg** - Wordmark with tagline (320×80px) - Best for large displays and documentation
4. **logo-icon-white.svg** - White icon for dark backgrounds - Best for dark mode and footers
5. **logo-icon-dark.svg** - Dark green icon for light backgrounds - Best for light mode
6. **logo-app-icon.svg** - Full app icon with rounded background (192×192px) - Best for app stores
7. **app/icon.svg** - Updated favicon (already integrated)

---

## Design Concept

The logo features a **funnel icon** that represents fizaki's core mission:

- 🔻 **Wide Top**: Captures all incoming leads
- 🔄 **Middle Section**: Filters and qualifies leads  
- ✅ **Pointed Bottom**: Delivers qualified, ready-to-close opportunities

This visual metaphor reinforces the tagline: **"No Leads Slip Away"**

---

## How to Use the Logo Component

A reusable React component is available at: `/components/ui/logo.tsx`

### Basic Usage

```tsx
import { Logo, LogoMark, LogoHorizontal, LogoWordmark } from "@/components/ui/logo";

// Simple usage
<LogoMark size="md" />

// Horizontal layout (great for headers)
<LogoHorizontal size="lg" />

// Wordmark (great for hero sections)
<LogoWordmark size="xl" />

// Custom variant and size
<Logo variant="mark" size="lg" className="custom-class" />
```

### Available Sizes

- `sm` - Small (24-32px)
- `md` - Medium (32-48px) - Default
- `lg` - Large (48-64px)
- `xl` - Extra Large (64-80px+)

### Component Props

```tsx
interface LogoProps {
  variant?: "mark" | "icon" | "horizontal" | "wordmark" | "app-icon";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
}
```

---

## Brand Colors

- **Primary Green**: `#10B981` - Main brand color
- **Dark Green**: `#059669` - Accent and gradient end
- **Text Color**: `#1F2937` - Dark gray for text

---

## Current Implementation

### Favicon
✅ Updated `app/icon.svg` with new funnel logo (automatically used by Next.js)

### Navigation & Footer
The current nav/footer components still use the Lucide `Zap` icon. To update them to use the new logo component:

**Option 1: Replace with Logo Component**
```tsx
// In components/sections/nav.tsx and footer.tsx
import { LogoMark } from "@/components/ui/logo";

// Replace the Zap icon
<LogoMark size="sm" />
```

**Option 2: Keep Current Implementation**
The Zap icon is simple and works well - you can leave it as is or gradually migrate when refreshing the component.

---

## Next Steps (Optional Enhancements)

### 1. Update Navigation Component
Replace the Zap icon with:
```tsx
import { LogoMark } from "@/components/ui/logo";

// In nav.tsx, replace:
// <Zap size={17} className="fill-white text-white" aria-hidden />
// With:
<LogoMark size="sm" />
```

### 2. Add Logo to Hero Section
Add the wordmark as a decorative element in the hero section

### 3. Social Media Assets
Export PNG versions at:
- 1024×1024px for profiles
- 400×400px for thumbnails
- 1200×630px for social cards

### 4. Favicon Variants
For iOS app home screen:
```tsx
// In layout.tsx metadata
apple: {
  sizes: "180x180",
  url: "/logos/logo-app-icon.svg",
},
```

---

## SVG Optimization

All SVG files are already optimized for web delivery. No additional compression is needed, but if you use a build tool:

```bash
# Using ImageOptim or similar
svgo /public/logos/*.svg --multipass
```

---

## Accessibility

- ✅ Logo maintains sufficient contrast in all color modes
- ✅ WCAG AA compliant text contrast
- ✅ Tested for color-blind accessibility
- ✅ Includes proper `alt` attributes when used as images

---

## Favicon Update Confirmation

The favicon has been successfully updated in `app/icon.svg`. 

You'll see the new funnel logo:
- In the browser tab 🟢
- When bookmarking pages
- In browser history
- As the app icon when saved as web app

To force a refresh on your device:
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear browser cache
- Close and reopen browser

---

## Support & Modifications

If you need to:
- **Change brand colors** - Edit the hex values in each SVG file
- **Adjust logo size** - All SVGs are vector-based and scale infinitely
- **Create new variants** - Edit the SVG files directly or use the component
- **Export as PNG** - Use any SVG to PNG converter (most browsers support this)

---

## File Structure

```
/public/logos/
├── logo-mark.svg           # Icon only
├── logo-horizontal.svg     # With text
├── logo-wordmark.svg       # Text with tagline
├── logo-icon-white.svg     # White variant
├── logo-icon-dark.svg      # Dark variant
├── logo-app-icon.svg       # Full rounded square
└── README.md               # Detailed documentation

/components/ui/
└── logo.tsx                # React component

/app/
└── icon.svg                # Favicon (updated)
```

---

## Quick Reference

| Use Case | Logo File | Size | Notes |
|----------|-----------|------|-------|
| Favicon | app/icon.svg | 64×64 | Already integrated |
| Header/Nav | logo-mark.svg | 32px | Use via LogoMark component |
| Hero Section | logo-horizontal.svg | 240×64 | Use via LogoHorizontal component |
| Footer | logo-mark.svg | 24-32px | White variant for dark backgrounds |
| App Store | logo-app-icon.svg | 192×192 | Scale up to 512×512 if needed |
| Social Media | logo-wordmark.svg | 1024×1024 | Export as PNG |
| Print Media | logo-horizontal.svg | 300dpi | SVG is scalable for any print size |

---

**Logo Design Date**: August 2026  
**Version**: 1.0  
**Status**: Ready for Production ✅
