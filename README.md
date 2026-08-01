# Bakasana

**A focused yoga practice companion for building strength, balance, recovery, and consistency.**

<p align="center">
  <img src="assets/images/event_challenges_onboarding.jpg" width="520" alt="The Bakasana practice community at an outdoor yoga event">
</p>

> **Current status:** Beta testing · iOS available through TestFlight · Android available through Google Play testing

[Visit the website](https://bakasana.app/) · [Follow on Instagram](https://www.instagram.com/bakasana.app/) · [Join the iOS beta](https://testflight.apple.com/join/r7A2STTS) · [Join the Android beta](https://play.google.com/store/apps/details?id=com.bakasana.bakasana_app) · [Contact support](mailto:bakasana.app@gmail.com)

## About Bakasana

Bakasana helps make yoga a habit worth returning to. The app combines focused practice sessions with clear progress tracking, private on-device video, and lightweight motivation—without turning practice into noise.

The current beta supports four complementary ways to practice:

| Program | Focus | Experience |
| --- | --- | --- |
| **Bakasana** | Balance and concentration | Build the stability and confidence needed for crane pose. |
| **Plank** | Strength and endurance | Develop the full-body foundation behind a stronger practice. |
| **Shavasana** | Recovery and meditation | Follow guided voice sessions and make space for deliberate rest. |
| **Flow** | Free-form movement | Practice through your own sequence while Bakasana quietly records your timeline. |

## What the beta includes

- Guided setup, countdown, live practice, results, and practice-again flows.
- Daily totals, practice history, streaks, and per-program progress.
- Game Center and Play Games sign-in, cloud progress, and leaderboards.
- Share cards for sessions, rankings, and longer-term progress.
- Optional practice reminders in English and Russian.
- **Practice Timeline:** short, silent clips assembled into a personal timelapse.

## Privacy by design

Practice Timeline camera access is optional. Captured clips and generated videos are processed and stored on the device; Bakasana does not upload this media to its servers. Users can review or delete individual clips, remove timeline data, or disable the feature.

Guest Mode is also available without creating a separate Bakasana account. Signed-in users authenticate through Apple Game Center or Google Play Games.

Read the full [Privacy Policy](https://bakasana.app/privacy/) and [account deletion instructions](https://bakasana.app/delete-account/).

## Beta availability

| Platform | Status | Access |
| --- | --- | --- |
| iPhone | Beta testing | [Join with Apple TestFlight](https://testflight.apple.com/join/r7A2STTS) |
| Android | Beta testing | [Join with Google Play on Android](https://play.google.com/store/apps/details?id=com.bakasana.bakasana_app) or [join on the web](https://play.google.com/apps/testing/com.bakasana.bakasana_app) |

The current website reflects app version **2.2.5, build 42**.

## This repository

This repository contains the public Bakasana promotional, support, privacy, and legal website. It is a lightweight Jekyll site deployed through GitHub Pages.

```text
BKSN/
├── .github/workflows/     GitHub Actions deploy (Jekyll 4 → Pages)
├── _layouts/              Shared page layout
├── assets/                Styles, images, video, and beta assets
├── delete-account/        Account and data deletion instructions
├── privacy/               Privacy Policy
├── support/               Product and beta support
├── terms/                 Terms of Service
├── Gemfile                Jekyll 4.4.1 dependencies
├── robots.txt             Search-crawler access rules
├── sitemap.xml            Production URL inventory
├── index.html             Product landing and support page
└── _config.yml            Jekyll configuration
```

### Run locally

Requires Ruby 3.2+ and Bundler. Install gems once, then serve:

```bash
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open [http://127.0.0.1:4000/](http://127.0.0.1:4000/). Jekyll automatically rebuilds the site when source files change.

The site is built with **Jekyll 4.4.1** both locally and on GitHub Actions (GitHub Pages legacy builder is pinned to Jekyll 3.10 and is not used).

### Production build

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Generated output is written to `_site/`. The configured production site is [https://bakasana.app/](https://bakasana.app/).

## Support and legal

- [Support](mailto:bakasana.app@gmail.com)
- [Support center](https://bakasana.app/support/)
- [Instagram](https://www.instagram.com/bakasana.app/)
- [Privacy Policy](https://bakasana.app/privacy/)
- [Terms of Service](https://bakasana.app/terms/)
- [Delete account and data](https://bakasana.app/delete-account/)

For beta feedback or account assistance, email **bakasana.app@gmail.com**.
