---
layout: default
title: Support
description: Get help with the Bakasana beta, practice programs, accounts, leaderboards, reminders, and the private Practice Timeline.
permalink: /support/
---

<div class="legal-doc support-doc" markdown="1">

<p class="legal-eyebrow label-caps">Bakasana / Help Center</p>

# Support

<p class="meta"><strong>App:</strong> Bakasana (iOS and Android)<br><strong>Status:</strong> Beta testing</p>

Need help with the beta, your account, or a practice session? Email **bakasana.app@gmail.com**. We read beta feedback and use it to improve the app.

[Email Bakasana support](mailto:bakasana.app@gmail.com){: .btn .btn-primary }

---

## Beta access

The iPhone beta is available through [Apple TestFlight]({{ site.app.beta.ios.join_url }}).

Android testers can join in either of these ways:

- [Join through Google Play on Android]({{ site.app.beta.android.join_url }})
- [Join the Android test on the web]({{ site.app.beta.android.web_join_url }})

The current beta is version **{{ site.app.version }}**, build **{{ site.app.build }}**.

## What to include in a support request

To help us understand an issue, include:

- Your platform: **iPhone** or **Android**
- The Bakasana app version shown in Profile
- The program or screen where the issue happened
- The steps that led to the problem
- A screenshot or screen recording when it is safe to share one

Never send passwords, authentication codes, or other sensitive account credentials.

## Accounts and progress

Bakasana does not create a separate username-and-password account. You can use **Guest Mode**, or sign in through **Apple Game Center** or **Google Play Games** for platform cloud progress and leaderboards.

Guest progress remains on the device. Removing the app also removes locally stored guest data.

## Practice Timeline and camera privacy

Practice Timeline camera access is optional. Eligible sessions can create short, silent clips that are processed and stored on your device. Bakasana does not upload Practice Timeline media to its servers.

You can review or remove clips, delete timeline data, or disable the feature. See the [Privacy Policy]({{ '/privacy/' | relative_url }}) for full details.

## Notifications

Practice reminders are optional. You can change the notification preference in Bakasana or disable notifications for Bakasana in your device settings.

## Leaderboard visibility

Signed-in scores use Game Center on iPhone and Play Games on Android. Your displayed name, avatar, and public visibility depend on the privacy settings of the corresponding platform account. Platform updates may take several minutes to appear.

## Delete your account and data

Follow the [account and data deletion instructions]({{ '/delete-account/' | relative_url }}) for local data, Game Center or Play Games progress, leaderboard participation, and analytics requests.

## Legal information

- [Privacy Policy]({{ '/privacy/' | relative_url }})
- [Terms of Service]({{ '/terms/' | relative_url }})
- [Delete account and data]({{ '/delete-account/' | relative_url }})

## Contact

**Email:** [bakasana.app@gmail.com](mailto:bakasana.app@gmail.com)  
**Website:** [Bakasana Support]({{ '/support/' | relative_url }})

{% assign enabled_social_links = site.social_links | where: 'enabled', true %}
{% for social in enabled_social_links %}
**{{ social.name }}:** [{{ social.link_text | default: social.name }}]({{ social.url }}){: target="_blank" rel="me noopener noreferrer" }
{% endfor %}

</div>
