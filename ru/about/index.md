---
layout: default
lang: ru
bilingual: true
ref: about
schema: about
title: О приложении Bakasana
seo_title: О Bakasana — приложение для навыка регулярности
description: "Bakasana — не фитнес-приложение. Это личный помощник для самого сложного навыка: регулярности. Чтобы не бросать начатое и двигаться к себе — шаг за шагом."
social_title: О Bakasana
social_description: Не фитнес. Личный помощник, который помогает не бросать начатое, формировать привычку и возвращаться к себе — шаг за шагом.
main_class: container content-main
last_modified_at: 2026-08-10
---

<div class="legal-doc about-doc" markdown="1">

<p class="legal-eyebrow label-caps">Bakasana / О приложении</p>

# О Bakasana

Bakasana — мобильное приложение и ваш напарник для регулярной йога-практики на iPhone и Android. Оно помогает заниматься последовательно, отслеживать прогресс и видеть изменения со временем — через баланс, силу, свободную практику, восстановление и честную историю.

## Зачем появилось Bakasana

Многие хотят привычку возвращаться к практике, а не ещё одну видеобиблиотеку, которую не досматривают. Bakasana сосредоточен на том, чтобы приходить: короткие направленные сессии, понятный таймер, серии и история, которые поддерживают (а не стыдят) регулярность, и приватный Practice Timeline, который делает прогресс видимым без загрузки тела в облако.

## Философия регулярной практики

Регулярная практика ценнее идеальной. Bakasana поддерживает реалистичные цели, короткие занятия в занятые дни и спокойное отношение к сериям. Прогресс измеряется временем, числом сессий и тем, что вы замечаете в себе — без медицинских обещаний и сомнительных фитнес-метрик.

## Четыре программы

| Программа | Фокус |
| --- | --- |
| **Bakasana** | Баланс, стабильность корпуса и уверенность на пути к балансу на руках |
| **Plank** | Сила, выносливость и стабильность всего тела |
| **Shavasana** | Восстановление с голосовым гидом и отдых |
| **Flow** | Свободное движение с опциональной записью Practice Timeline |

## Как работает Bakasana

1. Посмотрите историю практики.
2. Выберите одну из четырёх программ.
3. Прочитайте гайд по подготовке.
4. Расположите телефон и начните.

<figure class="guide-video-frame about-video">
  <video controls muted playsinline preload="metadata" aria-describedby="about-video-note">
    <source src="{{ '/assets/video/intro_en.mp4' | relative_url }}" type="video/mp4">
    Ваш браузер не поддерживает встроенное видео.
  </video>
  <figcaption id="about-video-note"><span>Беззвучное превью / английский интерфейс</span><span>Обзор приложения</span></figcaption>
</figure>

Можно практиковать в гостевом режиме или войти через Game Center (iPhone) или Play Games (Android) для облачного прогресса и таблиц лидеров. Опциональные напоминания помогают держать ритм, не превращая практику в шум.

## Алёна Ткачева {#alena-tkacheva}

{% assign expert = site.data.brand.expert %}
{% assign has_photo = false %}
{% if expert.photo and expert.photo != '' %}{% assign has_photo = true %}{% endif %}

<section class="expert-profile{% unless has_photo %} expert-profile--text{% endunless %}" aria-labelledby="expert-heading">
{% if has_photo %}
<img class="expert-photo" src="{{ expert.photo | relative_url }}" alt="{{ expert.name_ru }}" width="480" height="480">
{% endif %}
<div class="expert-copy">
<p class="expert-role label-caps" id="expert-heading">{{ expert.job_title_ru }}</p>
<p>{{ expert.bio_long_ru }}</p>
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

## Приватный Practice Timeline

Доступ к камере опционален. При включении Bakasana сохраняет короткие беззвучные клипы и собирает личный таймлапс на устройстве. Клипы не загружаются на серверы Bakasana. Вы можете просматривать, пересобирать, сохранять, делиться или удалять их по своему выбору. Читайте [Политику конфиденциальности](/privacy/).

## Доступно на iPhone и Android

Bakasana опубликовано в App Store и Google Play. Текущая версия — **{{ site.app.version }}**. После запуска мы продолжаем улучшать сценарии практики, стабильность приложения и вспомогательные материалы.

## Чем Bakasana отличается

В отличие от видеобиблиотек и обычных workout-приложений, Bakasana не пытается заменить преподавателя бесконечными классами или автоматически собранными последовательностями. Это напарник для практики в вашем ритме: программы, таймер, история, опциональное приватное видео *ваших* сессий и лёгкая мотивация через таблицы лидеров — на телефоне, на ваших условиях.

[Скачать в App Store]({{ site.app.stores.ios.url }}){:target="_blank" rel="noopener noreferrer"} · [Скачать в Google Play]({{ site.app.stores.android.url }}){:target="_blank" rel="noopener noreferrer"} · [Поддержка](/support/)

</div>
