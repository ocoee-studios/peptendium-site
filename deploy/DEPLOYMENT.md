# Alex's deployment handoff — Peptendium

This is a self-contained static site. Match the existing AuraLunis and SpicyCalc setup: Cloudflare Tunnel to a non-root Podman container on Alex's VPS.

Website repository: https://github.com/ocoee-studios/peptendium-site. The final domain has not been selected. Keep existing mail and other DNS records intact. No credentials belong in this source.

## Build and run

From this directory, as the dedicated non-root deployment user:

```bash
git clone https://github.com/ocoee-studios/peptendium-site.git
cd peptendium-site
podman build -t localhost/peptendium-site:latest -f Containerfile .
podman run -d --name peptendium-site --restart=unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,size=32m --cap-drop=all --security-opt=no-new-privileges -p 127.0.0.1:8083:8080 localhost/peptendium-site:latest
curl -fsS http://127.0.0.1:8083/healthz
curl -I http://127.0.0.1:8083/
```

Use another free host port if 8083 is occupied. This site needs no volume or secrets. Configure a user systemd/Quadlet unit or appropriate restart services and user lingering for reboot persistence; the restart policy alone does not configure boot services.

## Cloudflare route

Once Jamie confirms the domain, route the chosen hostname and www variant to `http://127.0.0.1:8083` if cloudflared runs on the VPS host. If cloudflared runs in an isolated container, attach both containers to the same Podman network and route to `http://peptendium-site:8080` instead. Its own loopback will not reach the host container.

Use the existing tunnel and Cloudflare-generated DNS route. Do not expose the origin port publicly. Namecheap can remain the registrar. Do not replace unrelated MX, TXT, or DNS records. Keep tunnel credentials outside the repository.

After the hostname is confirmed, add its canonical URL, Open Graph URL/image URL, and sitemap. No domain is guessed in this package.

## Validate

- HTTPS homepage and all locally hosted assets load without CSP errors.
- Header links reach Explore, Academy, Lifetime Pro, and Questions.
- Library/Pulse/Notebook tabs work with click, keyboard arrows, Home, and End.
- Screenshots open, switch, enlarge, close, and return focus to the opener.
- Mobile menu works and closes after selecting a link; FAQs expand.
- App Store, privacy, terms, support, and Ocoee Studios links reach the intended destinations.
- Test 320, 375, 390, 768, 1024, 1440, 1920, 2560, and 3840 CSS-pixel widths as appropriate. Check physical TV navigation separately.
- Check iOS Safari, Android Chrome, desktop Safari/Firefox/Chrome, reduced motion, browser zoom, and keyboard navigation.
- `/healthz` returns `ok`; nonexistent paths return 404.

## Updates

Tag the current image as `localhost/peptendium-site:previous` before rebuilding. Build the next image successfully before replacing only this container. Roll back by recreating it from the previous image with the same flags. If managed through systemd/Quadlet, use its service workflow.

## Verification limits

JavaScript syntax, internal references, image dimensions, and interactive logic were checked during preparation. No supported browser-control skill or Podman binary was available for rendered cross-browser or container testing in the authoring environment. Complete the browser and container checks before public launch.
