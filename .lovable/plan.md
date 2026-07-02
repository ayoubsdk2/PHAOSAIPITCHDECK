# Plan

## 1. New default landing experience — "Standard View" (scroll-PDF)

Currently `/` and `/:prefix` mount the slide-editor `PresentationApp` immediately. Change the default so visitors land in a **Standard View**: a vertically scrolling page where every slide is rendered at full content (step = 999, all reveals shown), one slide per "page", no clicks required.

- Add a new `StandardDeckView` component:
  - Vertical stack of all 12 slides, each rendered through `ScaledSlide` at a viewport-fit width (16:9) so they look exactly like the live deck.
  - Sticky top bar always visible during scroll containing: Phaos logo/title on the left, slide counter ("1 / 12" updates as you scroll), and a large pronounced **PRESENTATION MODE** button on the right.
  - Each slide renders with `step={slide.totalSteps}` so every reveal/animation end-state is shown without interaction.
  - Mobile-optimized: slides scale down to viewport width, top bar collapses logo text but keeps the PRESENTATION MODE button prominent.
- `Index.tsx` and `ProspectDeck.tsx` render `StandardDeckView` by default. A query flag (`?mode=present`) or click of PRESENTATION MODE switches into `PresentationApp` (current click-by-click editor/presenter).
- Telemetry: keep `startSession` behavior; track scroll-based slide visibility for analytics, and a `presentation_mode_started` event when toggled.

## 2. PRESENTATION MODE button

Replace the small `▶ Present` pill in `PresentationApp` and add an equivalent button in `StandardDeckView`. New button styling:
- Desktop: bright gradient (Phaos purple → glow), `PRESENTATION MODE` label fully visible, larger padding, soft glow / pulse animation so it stands out.
- Mobile: same gradient, full `PRESENTATION MODE` label still shown (no hiding behind icon), tappable height ≥ 44px.
- Appears top-right in both Standard View (sticky bar) and Slide View (existing toolbar).

Clicking it from Standard View → navigates to Slide View starting on slide 1, step 0, and triggers `goLive()` fullscreen presenter mode.

## 3. Rename views

In `PresentationApp.tsx`:
- The grid-view top-bar button currently labeled `Normal View` → rename to **Slide View** (icon unchanged: `Columns2`).
- The toolbar `LayoutGrid` icon button (currently "Grid view") → rename tooltip/label to **Standard View**. Clicking it from Slide View returns the user to the new scroll-PDF Standard View (not the 3×3 grid). The legacy 3×3 thumbnail grid is removed from the user-facing navigation (kept only if needed internally) since Standard View now serves as the overview.

Resulting nav model:
- **Standard View** (default) — scroll through all slides like a PDF, top bar persistent.
- **Slide View** — current single-slide editor with left sidebar of thumbnails.
- **Presentation Mode** — fullscreen click-by-click reveal flow.

## 4. PDF export fixes — slide 9 & slide 11

Both issues are caused by content placed too close to the 1080px bottom edge being clipped during the headless capture. Fixes are in the slide components themselves (so the export render matches), no layout change visible in the live deck beyond a small bottom-padding increase.

- **Slide 9 (`Phaos09TAM`)**: the source/footer sentence at the bottom is cut off. Lift the source line up (e.g. move from `top: ~1020px` to `top: ~995px`) and ensure the parent container reserves bottom padding so the line renders fully inside the 1080 frame.
- **Slide 11 (`Phaos11Validation`)**: the SOURCE line is currently absolutely positioned at `top: 1011px` with `text-[11px]`; the de-risk grid above ends at `top: 681px + 318px = 999px`, leaving only ~12px before the source line and ~57px below it — but the line itself sits within the bottom 70px that gets clipped by the export pipeline. Move the source line up (e.g. `top: 1005px`) and shrink the de-risk grid height by a few px so the source line sits at ≤ ~1040px from top and isn't clipped.
- After edits, re-run the headless capture pipeline used previously (1920×1167 viewport, crop to 1920×1080) for slides 9 and 11 only, replace the two `slide-09.png`/`slide-11.png` assets, and rebuild the 12-page `print-ready-pdf` asset. Verify with `pdfinfo` (12 pages) and visually inspect the two regenerated pages in a contact sheet.

## 5. Mobile optimization

- Standard View: slides use `width: 100vw; aspect-ratio: 16/9;` and `ScaledSlide` to render at fitted scale. Sticky bar is `h-14` with compact spacing.
- PresentationApp toolbar already responsive; tighten the new PRESENTATION MODE button so it's still prominent on small viewports (full label, gradient).
- Presentation Mode (fullscreen) on mobile: keep tap-left/tap-right advance behavior already in code.

## Technical details

Files to add / edit:
- `src/components/presentation/StandardDeckView.tsx` (new) — sticky top bar + vertical stack of `ScaledSlide` cards rendering each slide at `step = totalSteps`, with PRESENTATION MODE button.
- `src/pages/Index.tsx` & `src/pages/ProspectDeck.tsx` — default to `StandardDeckView`; on `?mode=present` or button click, render `PresentationApp` instead (lift mode state to the page).
- `src/components/presentation/PresentationApp.tsx` — rename `Normal View` → `Slide View`; repoint `LayoutGrid` button to switch back to Standard View; replace the small Present pill with a prominent `PRESENTATION MODE` button (desktop + mobile).
- `src/components/presentation/slides/Phaos09TAM.tsx` — reposition bottom source line so it isn't clipped.
- `src/components/presentation/slides/Phaos11Validation.tsx` — reposition de-risk grid + source line so source isn't clipped at the 1080 bottom.
- Regenerate `src/assets/exported-deck/slide-09.png.asset.json`, `slide-11.png.asset.json`, and `print-ready-pdf.asset.json` after re-capture; verify exactly 12 pages.

## Acceptance criteria

- Visiting `/` or `/:prefix` shows a scrolling Standard View with all 12 slides fully populated, no clicks required.
- Top bar (with PRESENTATION MODE button) stays visible during scroll on desktop and mobile.
- PRESENTATION MODE button is visually pronounced on both desktop and mobile and switches to the click-by-click fullscreen experience starting on slide 1.
- Grid-view button is renamed Standard View; the inner "Normal View" label becomes Slide View.
- Slide View retains the left-side thumbnail sidebar.
- Exported PDF still has exactly 12 pages, with slide 9 source sentence fully visible and slide 11 bottom content (source line) fully visible — no clipping.
