# Responsive and accessibility requirements

The site must fit phones, tablets, desktop computers, and TVs. CSS defines compact layouts at 400px, mobile navigation and stacked sections at 800px, intermediate desktop adjustments at 1100px, and enlarged layouts at 1600px and 2200px. Page content is capped on very wide displays.

- Set real device-width viewport; permit user zoom.
- Keep all images responsive with intrinsic dimensions.
- At 320px, no horizontal scrolling, clipped text, or hidden controls.
- Use readable contrast, visible keyboard focus, descriptive link/button names, native FAQ controls, and a skip link.
- Screenshot modal uses native dialog focus management and Escape. Restore focus to the opener after closing.
- Feature tour follows tablist semantics, roving tab focus, and Left/Right/Home/End keys.
- Respect reduced-motion preferences. No autoplay or essential motion.
- TV visitors can navigate by keyboard-style input where supported by their browser; test actual remote support on target TVs.

CSS coverage is not proof of every device/browser result. Run the visual/device checks in `deploy/DEPLOYMENT.md` before launch.

## Liquid glass update

Translucent navigation, screenshot stages, purchase section, and FAQ surfaces use CSS gradients, highlight borders, layered shadows, and selective backdrop blur. All text retains dark/solid colors or high contrast text on navy. Unsupported blur receives opaque fallbacks. A reduced-transparency media query provides opaque content surfaces. Decorative spheres have no pointer interaction, meaning, or animation.

The full-page sheet does not apply backdrop blur; blur is limited to selected surfaces. Check scrolling performance on the oldest supported devices and disable blur selectively if needed.

## Multi-device refinement

- Remove the decorative Academy numeral; preserve real module counts in content and the unmodified app screenshot.
- Collapse header navigation at 1000px to accommodate iPad portrait and narrow desktop windows.
- Allow grid columns and text blocks to shrink without intrinsic-width overflow.
- Keep touch links and screenshot controls at least 44px tall.
- At 340px and below, scale the layered hero phones and screenshot stages down.
- Adapt the screenshot viewer to short landscape displays.
- Enlarge body copy, navigation, FAQ controls, and supporting text at 2200px and above for large screens.
- Disable hover transforms on touch-only devices.

Verification remains source/interaction-level. Physical device, actual TV remote, and rendered browser checks are still required before launch.
