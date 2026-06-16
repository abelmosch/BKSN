# Bakasana — Privacy Policy

**Last updated:** June 16, 2026
**Effective date:** June 16, 2026

Bakasana ("the App", "we", "us", "our") is a mobile balance-training application developed and operated by Bakasana. This Privacy Policy explains how we collect, use, store, and protect your information when you use our App on iOS or Android.

By downloading or using the App, you agree to this Privacy Policy. If you do not agree, please do not use the App.

---

## 1. Information We Collect

### 1.1 Information You Provide

| Data | When collected | Purpose |
|------|---------------|---------|
| **Platform player ID** (Game Center or Play Games) | When you sign in | Identify your account for cloud sync and leaderboards |
| **Display name** | Automatically from your platform account | Shown on leaderboards |
| **Body weight (kg)** (optional) | When you enter it in Profile settings | Estimate calories burned on share cards; stored locally only |
| **Transformation film frames** (optional) | When you enable Transformation Film and complete qualifying holds | Build an on-device timelapse; stored locally only |

### 1.2 Information Collected Automatically

| Data | Service | Purpose |
|------|---------|---------|
| Practice session durations, streaks, daily totals | Local storage + platform cloud save | Track your progress |
| Leaderboard scores (cumulative practice time per program) | Game Center / Play Games | Rank you among other users |
| App usage events (launches, taps, practice completions, leaderboard views) | Firebase Analytics | Understand how the App is used and improve it |
| Crash reports and diagnostic data | Firebase Crashlytics | Identify and fix bugs |
| Device type, OS version, app version | Firebase Analytics / Crashlytics | Analytics and debugging context |

### 1.3 Optional Camera (Transformation Film)

If you enable **Transformation Film** in Profile settings, the App uses the device camera during practice to capture a single compressed photo per day per program when you hold a pose for more than four seconds. These frames are processed and stored **only on your device** to build a local timelapse video. They are **not transmitted to Bakasana servers**. You can disable the feature or delete all transformation data at any time in Profile settings.

### 1.4 Information We Do NOT Collect

- Precise geolocation (GPS)
- Microphone audio
- Upload of your transformation film frames to Bakasana servers
- Contacts or address book
- Payment or financial information
- Email address (unless you voluntarily send us feedback)
- Push notification tokens
- Health or fitness data from HealthKit or Google Fit
- Advertising identifiers for ad targeting

---

## 2. How We Use Your Information

We use the collected information to:

- **Provide core functionality** — save your practice progress, display leaderboard rankings, generate share cards with your stats.
- **Sync across devices** — store your progress blob in Game Center Saved Games (iOS) or Play Games Saved Games (Android) so you can resume on another device.
- **Improve the App** — analyze usage patterns and crash reports to fix bugs and prioritize features.
- **Prompt for reviews** — after three completed sessions, we may show an in-app review prompt (once per app version, with a six-month cooldown).

We do **not** use your data for advertising, profiling, or selling to third parties.

---

## 3. Data Storage and Security

| Data type | Storage location | Encryption |
|-----------|-----------------|------------|
| Practice progress, preferences, body weight | On-device (`SharedPreferences`) | Protected by OS-level app sandbox |
| Cloud progress (signed-in users) | Apple Game Center / Google Play Games cloud save | Encrypted in transit (TLS); at rest per platform standards |
| Analytics events | Firebase Analytics (Google Cloud) | Encrypted in transit and at rest per Google Cloud policies |
| Crash reports | Firebase Crashlytics (Google Cloud) | Encrypted in transit and at rest per Google Cloud policies |

We retain analytics and crash data for the default Firebase retention periods (currently 14 months for Analytics, 90 days for Crashlytics). We do not maintain a separate user database.

---

## 4. Third-Party Services

The App integrates the following third-party services. Each service processes data according to its own privacy policy:

| Service | Provider | Purpose | Privacy policy |
|---------|----------|---------|----------------|
| Firebase Analytics | Google LLC | Usage analytics | [Google Privacy Policy](https://policies.google.com/privacy) |
| Firebase Crashlytics | Google LLC | Crash reporting | [Google Privacy Policy](https://policies.google.com/privacy) |
| Apple Game Center | Apple Inc. | Authentication, cloud save, leaderboards (iOS) | [Apple Privacy Policy](https://www.apple.com/legal/privacy/) |
| Google Play Games | Google LLC | Authentication, cloud save, leaderboards (Android) | [Google Privacy Policy](https://policies.google.com/privacy) |
| Google Fonts | Google LLC | Typography (Archivo Narrow) | [Google Fonts Privacy](https://developers.google.com/fonts/faq/privacy) |

We do not integrate any advertising networks, social media SDKs, or data brokers.

---

## 5. Guest Mode

You may use the App without signing in by choosing Guest Mode. In this case:

- All progress is stored **locally on your device only**.
- No data is sent to Game Center or Play Games.
- Firebase Analytics and Crashlytics still operate as described above.
- Leaderboard rankings use local demo data; your scores are not submitted to platform leaderboards.
- If you uninstall the App or clear its data, your progress is **permanently lost**.

---

## 6. Children's Privacy

The App is not directed at children under 13 (or the applicable age in your jurisdiction). We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at the address below, and we will take steps to delete it.

---

## 7. Your Rights and Choices

Depending on your jurisdiction, you may have the following rights:

- **Access and portability** — request a copy of the data we hold about you.
- **Deletion** — request deletion of your data. For platform-stored data (Game Center, Play Games), you can manage or delete saved games through your device settings. For analytics and crash data, contact us and we will delete identifiable records where technically feasible.
- **Opt out of analytics** — you can limit Firebase Analytics data collection by enabling "Limit Ad Tracking" (iOS) or opting out of personalized ads (Android) in your device settings.
- **Guest mode** — use the App without creating an account to minimize data collection.
- **Withdraw consent** — uninstall the App at any time; locally stored data will be removed.

To exercise any of these rights, contact us at **bakasana.app@gmail.com**.

---

## 8. International Data Transfers

Firebase services are operated by Google LLC and may process data in the United States or other countries. By using the App, you consent to the transfer of your information to these locations. Google applies standard contractual clauses and other safeguards for international transfers as described in their privacy documentation.

---

## 9. Changes to This Privacy Policy

We reserve the right to modify, amend, or replace this Privacy Policy **unilaterally and at our sole discretion** at any time, without your prior consent.

- Updated policy takes effect when published at [https://abelmosch.github.io/BKSN/privacy/](https://abelmosch.github.io/BKSN/privacy/). The "Last updated" date at the top indicates the latest revision.
- For **material changes**, we will make reasonable efforts to notify you through the App, release notes, or other appropriate means.
- For **non-material changes** (such as clarifications, formatting, or minor updates), updating the published policy and the "Last updated" date is sufficient notice.
- **Continued use of the App after publication of an updated policy constitutes your acceptance** of the revised policy.
- If you do not agree to the updated policy, you must stop using the App and uninstall it from your device.

---

## 10. Contact Us

If you have questions or concerns about this Privacy Policy, contact us at:

**Email:** bakasana.app@gmail.com
**Website:** [https://abelmosch.github.io/BKSN/privacy/](https://abelmosch.github.io/BKSN/privacy/)
