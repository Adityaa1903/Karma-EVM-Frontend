# Karma Protocol Brand Kit

This folder is the canonical source for Karma Protocol's visual identity: the master logo artwork,
web logo, favicons, app icons, social preview, colour palette, and typography. The original artwork
is [`image.png`](./image.png); the generated size variants live here, and byte-identical copies in
`public/` are served by the application.

The Stability Nexus organisation logo is separate from the Karma Protocol product mark. The footer
continues to use the organisation's animated logo from `public/Animated/logo-animated.gif`.

## Logo

| Asset | File |
| --- | --- |
| Original master artwork (1254×1254) | [`image.png`](./image.png) |
| Standard web and PWA logo (512×512 PNG) | [`logo.png`](./logo.png) |
| Social preview card (1200×630) | [`og-image.png`](./og-image.png) |

The mark shows a Bull and Bear facing each other around a shared center, framed by a circular orbit
and antique-gold markers. The detailed pen-and-ink illustration represents balanced opposing market
views contributing to shared oracle consensus. Keep the source art intact; the icon files are
proportion-preserving size variants, while the social preview card pairs the scaled mark with text.

### Using the mark on a background

The artwork includes a warm-ivory square background. Prefer light surfaces; on dark surfaces, place
the image on a clearly bounded ivory tile, as the navbar does. Do not remove the background or
recolour the engraving: the Bull, Bear, and fine gold linework rely on those original tones.

## Favicons & Icons

Generated from the master artwork at the sizes browsers and mobile platforms request:

| File | Size | Use |
| --- | --- | --- |
| [`favicon.ico`](./favicon.ico) | 16 / 32 / 48 (multi-res) | Classic browser favicon |
| [`apple-touch-icon.png`](./apple-touch-icon.png) | 180×180 | iOS home screen |
| [`icon-192.png`](./icon-192.png) | 192×192 | PWA manifest, Android |
| [`logo.png`](./logo.png) | 512×512 | PWA manifest, splash, navbar |
| [`og-image.png`](./og-image.png) | 1200×630 | Social sharing preview |

`favicon.ico` is a three-entry ICO container. The PWA manifest provides 192 and 512 PNG icons for
installability, with the 512 image shared with the navbar logo.

The ICO frames use the full square artwork. Fine engraving naturally becomes less distinct at 16px;
keep the source unchanged rather than inventing a separate symbol.

## Colour Palette

### Mark palette

Sourced from the master artwork. The mark uses deep navy ink, warm ivory, and antique gold; muted
olive appears in the lower orbit accents.

| Swatch | Name | Hex | Usage in mark |
| --- | --- | --- | --- |
| ⬛ | Deep ink | `#111A20` | Bull and illustration linework |
| 🟨 | Antique gold | `#A87832` | Orbits, stars, and center accents |
| ⬜ | Warm ivory | `#FDFCEE` | Artwork background and Bear highlights |
| 🟩 | Muted olive | `#4B5039` | Lower orbit accents |

### Application palette

What the interface actually renders. Colour here is **semantic, not decorative**: green and red
carry directional meaning and must not be used for ornament.

| Swatch | Role | Light | Dark |
| --- | --- | --- | --- |
| 🟩 | Bull, gains, upward movement | `#16a34a` (green-600) | `#4ade80` (green-400) |
| 🟥 | Bear, losses, downward movement | `#ef4444` (red-500) | `#f87171` (red-400) |
| 🟨 | Accent, active state, warnings | `#eab308` (yellow-500) | `#eab308` |
| ⬜ | Page background | `#FFFFFF` | `#0A0A0A` |
| ⬛ | Body text | `#171717` | `#EDEDED` |
| ⬛ | Mobile navigation bar | `#1A1B1F` | `#1A1B1F` |

Surfaces, borders and secondary text use Tailwind's `gray` and `neutral` scales (Tailwind v3.4
defaults). Both scales are currently in use across the codebase; new work should prefer `neutral`
and existing `gray` usage should migrate as files are touched.

### Organisation accents

Inherited from Stability Nexus and used where Karma appears as part of the wider organisation, such
as the README badge and other cross-brand materials.

| Swatch | Name | Hex |
| --- | --- | --- |
| 🟨 | Stability Gold | `#FFC517` |
| 🟩 | Forest Green | `#228B22` |

### Contrast requirement

All text pairings must meet WCAG 2.1 AA, 4.5 : 1 for body text and 3 : 1 for large text and
non-text indicators. `#171717` on `#FFFFFF` gives 17.93 : 1 and `#EDEDED` on `#0A0A0A` gives
16.91 : 1, so both defaults have ample headroom. Take care with the yellow accent: `#eab308` on
white is only 1.92 : 1, so it must be reserved for icons, borders and fills, never for small text on
a light ground.

## Typography

**Brand typeface: Geist.** Loaded through `next/font/google` in `src/app/layout.tsx`, which exposes
it as the CSS variables `--font-geist-sans` and `--font-geist-mono`.

| Role | Face | Use |
| --- | --- | --- |
| Interface | Geist | All UI text, headings, body, labels |
| Numeric and code | Geist Mono | Addresses, hashes, contract values |
| Fallback stack | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | When Geist is unavailable |

Guidance: headings bold and tight; body regular; monospace with tabular figures for any column of
token amounts or prices, so digits align.

> **Known gap.** Geist is loaded but not yet applied. `tailwind.config.ts` has no `fontFamily`
> extension consuming the two CSS variables, and `src/app/globals.css` sets
> `body { font-family: Arial, Helvetica, sans-serif; }`, which wins. The deployed app therefore
> renders Arial today. Closing this is a two-line change and is tracked separately, so that the
> visual change is reviewed on its own rather than inside this brand kit.

The social preview card uses Arial Bold for its baked-in wordmark, so it renders consistently when
shared outside the application.
