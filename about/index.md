---
layout: default
lang: en
bilingual: true
ref: about
schema: about
title: About Bakasana
seo_title: About Bakasana — an app for the skill of regularity
description: "Bakasana is not a fitness app. It is a companion for the hardest skill: regularity. So you do not abandon what you started, and you move toward yourself — step by step."
social_title: About Bakasana
social_description: Not fitness. A personal companion that helps you keep going, build a habit, and return to yourself — step by step.
main_class: container content-main
last_modified_at: 2026-08-10
---

<div class="legal-doc about-doc" markdown="1">

<p class="legal-eyebrow label-caps">Bakasana / About</p>

# About Bakasana

Bakasana is a mobile yoga practice companion for iPhone and Android. It is built to help people practice consistently, track progress, and see their transformation over time—through balance, strength, free practice, recovery, and honest history.

It is not a web trainer, not a sequence constructor, and not an app for a single pose.

## Why Bakasana exists

Many people want a yoga habit they can return to, not another library of videos they never finish. Bakasana focuses on showing up: short guided sessions, clear timing, streaks and history that support (not shame) consistency, and a private Practice Timeline that makes progress visible without uploading your body to the cloud.

## Philosophy of regular practice

Regular practice is more valuable than perfect practice. Bakasana encourages realistic goals, short sessions on busy days, and a calm relationship with streaks. Progress is measured in time spent, sessions completed, and what you notice in yourself—not in medical claims or dubious fitness scores.

## Four programs

| Program | Focus |
| --- | --- |
| **Bakasana** | Balance, core stability, and confidence toward arm balance |
| **Plank** | Strength, endurance, and full-body stability |
| **Shavasana** | Guided voice recovery and rest |
| **Flow** | Free-form movement with optional Practice Timeline capture |

## How Bakasana works

1. Review your practice history.
2. Choose from four programs.
3. Read the setup guide.
4. Position your phone and begin.

<figure class="guide-video-frame about-video">
  <video controls muted playsinline preload="metadata" aria-describedby="about-video-note">
    <source src="{{ '/assets/video/intro_en.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support embedded video.
  </video>
  <figcaption id="about-video-note"><span>Silent preview / English interface</span><span>App walkthrough</span></figcaption>
</figure>

You can practice in Guest Mode or sign in with Game Center (iPhone) or Play Games (Android) for cloud progress and leaderboards. Optional reminders help keep the rhythm without turning practice into noise.

## Alena Tkacheva {#alena-tkacheva}

{% assign expert = site.data.brand.expert %}
{% assign has_photo = false %}
{% if expert.photo and expert.photo != '' %}{% assign has_photo = true %}{% endif %}

<section class="expert-profile{% unless has_photo %} expert-profile--text{% endunless %}" aria-labelledby="expert-heading">
{% if has_photo %}
<img class="expert-photo" src="{{ expert.photo | relative_url }}" alt="{{ expert.name }}" width="480" height="480">
{% endif %}
<div class="expert-copy">
<p class="expert-role label-caps" id="expert-heading">{{ expert.job_title }}</p>
<p>{{ expert.bio_long }}</p>
{% assign has_ig = false %}{% assign has_yt = false %}
{% if expert.instagram and expert.instagram != '' %}{% assign has_ig = true %}{% endif %}
{% if expert.youtube and expert.youtube != '' %}{% assign has_yt = true %}{% endif %}
{% if has_ig or has_yt %}
<p class="expert-links">
{% if has_ig %}<a href="{{ expert.instagram }}" target="_blank" rel="noopener noreferrer me">Instagram <span aria-hidden="true">↗</span></a>{% endif %}
{% if has_yt %}<a href="{{ expert.youtube }}" target="_blank" rel="noopener noreferrer me">YouTube <span aria-hidden="true">↗</span></a>{% endif %}
</p>
{% endif %}
</div>
</section>

## Private Practice Timeline

Camera access is optional. When enabled, Bakasana saves short, silent clips and builds a personal timelapse on your device. Clips are not uploaded to Bakasana servers. You can review, rebuild, save, share, or delete them whenever you choose. Read the [Privacy Policy](/privacy/).

## Available on iPhone and Android

Bakasana is publicly available on the App Store and Google Play. The current release is version **{{ site.app.version }}**. We continue to improve the practice flow, reliability, and supporting content after launch.

## How Bakasana differs

Unlike video libraries and generic workout apps, Bakasana does not try to replace a teacher with endless classes or auto-built sequences. It is a companion for the practice you already want: focused programs, timing, history, optional private video of *your* sessions, and light social motivation through leaderboards—on your phone, on your terms.

[Download on the App Store]({{ site.app.stores.ios.url }}){:target="_blank" rel="noopener noreferrer"} · [Get it on Google Play]({{ site.app.stores.android.url }}){:target="_blank" rel="noopener noreferrer"} · [Support](/support/)

</div>
