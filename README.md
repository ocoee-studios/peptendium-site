# Peptendium website

Official Peptendium website by Ocoee Studios LLC—explore peptide science, research tools, Academy lessons, and a private research notebook.

A responsive, buildless marketing site with a liquid-glass design.

## Contents

- `site/`: HTML, CSS, JavaScript, and locally hosted real App Store images.
- `Containerfile` and `deploy/nginx.conf`: non-root Nginx container, port 8080.
- `deploy/DEPLOYMENT.md`: Podman and Cloudflare Tunnel handoff for Alex.
- `RESPONSIVE.md`: device and accessibility checks.
- `CONTENT-SOURCES.md`: branding, feature, purchase, and asset provenance.

No package installation, build process, server-side data, accounts, or secrets are needed. Open `site/index.html` locally to review; the separate clickable preview embeds all assets in one file.

## Interactions

The feature tour supports clicks and Left/Right/Home/End keys. Screenshots open in a native modal with previous/next, enlarge, close, and Escape controls. Mobile navigation expands and collapses. FAQs use native details elements. Download links go directly to Peptendium's real App Store listing.

## Deployment status

Prepared for Alex's existing Podman / Cloudflare Tunnel workflow. This source has not been deployed and no DNS records have changed. Website repository: `ocoee-studios/peptendium-site`. The final hostname still needs to be selected; use this repository as the website source.

## Link and control audit

The three evidence rows now link to the Explore section and select Library, Pulse, or Notebook respectively. Each row, including its arrow, is keyboard-accessible. All 26 site links, 12 buttons, and six FAQ summaries were inventoried. All internal anchor destinations exist and every custom button has an implemented handler. App Store, privacy, terms, support, and studio destinations returned HTTP 200 during the audit on October 20, 2026. Interactive behavior was checked with a DOM harness; actual rendered browser and physical-device checks remain outstanding.
