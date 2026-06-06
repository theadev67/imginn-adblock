# Imginn AdBlock

A lightweight Chromium extension that **removes video and inline Ads** and restores scroll behavior on Imginn.com.

## Technical Highlights
- **Immediate Styling:** Leverages CSS attribute wildcard selectors to hide target ad containers instantly.
- **Dynamic Pruning:** Employs an optimized `MutationObserver` to clean injected elements without layout thrashing.
- **Scroll Enforcement:** Actively resets forced overflow restrictions on the `html` and `body` tags.

## Disclaimer
Developed solely for educational and technical research purposes. Not affiliated with Imginn or Instagram.


Users should always abide by any terms of service by Imginn and Instagram.
