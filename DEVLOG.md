# DEVLOG.md — EKO-OYLIS

## Журнал разработки

Записи от новых к старым. Нумерация: S001, S002, ... SNNN.
Владелец процесса: #1 Product Architect.

---

### [S003] — 2026-03-18 — Milestones 2-5: Deploy prep, GA4, Forms, Legal

**Роли:** #1 PA, #3 Frontend, #4 Integration, #5 SRE, #14 Landa
**Статус:** завершено (code-side); pending external services

**Что сделано:**

- **MS5 Form Backend:** Заменён mock setTimeout на реальный fetch к Formspree. Добавлены `action`, `method`, `data-netlify` атрибуты к формам BG + EN. Error handling с fallback сообщениями. Netlify Forms как автоматический backup.
- **MS3 GA4:** Добавлен Google Analytics 4 с Consent Mode v2 в `<head>` BG + EN. Default = all denied. Активация через существующий cookie consent (setCookieConsent уже вызывает `gtag('consent', 'update')`). Placeholder `G-XXXXXXXXXX` для замены после создания property.
- **MS2 Deploy:** Создан `netlify.toml` — security headers (HSTS, X-Frame-Options, X-Content-Type-Options, CSP-related), cache control для статики, www redirect.
- **MS4 Legal:** Все 6 legal pages уже содержат жёлтый баннер "Този документ подлежи на правен преглед". Статус: PENDING LAWYER.
- **Credentials:** docs/CREDENTIALS.md обновлён — полный checklist для CEO по внешним сервисам.

**Что требует действий CEO:**

1. Зарегистрировать Netlify → подключить repo → deploy
2. Настроить DNS eco-oylis.info → Netlify
3. Создать GA4 property → заменить `G-XXXXXXXXXX`
4. Зарегистрировать Formspree → заменить `FORMSPREE_ID`
5. Найти юриста для legal review

**Артефакты:** `js/main.js`, `index.html`, `en/index.html`, `netlify.toml`, `docs/CREDENTIALS.md`

---

### [S002] — 2026-03-18 — Аудит + ТЗ 2.0 + Финализация лендинга (XL)

**Роли:** #1 PA (координация, ТЗ), #2 UX/UI (CSS, favicon, og:image), #3 Frontend (HTML, SEO, hreflang, honeypot), #4 Integration (form validation), #14 Landa (аудит)
**Статус:** завершено

**Обнаруженные ошибки (аудит MVP):**
- **C1 CRITICAL:** Hreflang в EN legal pages указывали на несуществующие URL (`/privacy-policy/` вместо `/politika-poveritelnost/`) → Исправлено
- **C2 CRITICAL:** Контактная форма без anti-spam защиты → Добавлен honeypot (hidden field + CSS + JS validation)
- **C3 CRITICAL:** Favicon отсутствовал на всех 8 страницах → Создан SVG favicon, подключен
- **C4 CRITICAL:** og:image.jpg не существовал (только ссылка) → Сгенерирован PNG 1200x630 через Python/Pillow
- **C5 CRITICAL:** Запрещённое слово "събираме" в Privacy Policy BG → Заменено на пассивную форму "се събират"
- **S1:** BreadcrumbList Schema отсутствовал → Добавлен JSON-LD для BG + EN
- **S2:** EN версия имела только Organization Schema → Добавлены LocalBusiness + FAQPage + BreadcrumbList
- **S3:** H2 тексты не совпадали с SEO ТЗ 10.3 → Обновлены Services, Social Proof, Contacts
- **S4:** Legal pages BG не имели main.js → Подключен (burger menu работает)
- **S5:** Legal pages EN не имели phone + burger в header → Добавлены + исправлены lang-switch URL
- **S6:** Sitemap legal pages без hreflang → Добавлены парные hreflang links
- **S7-S9:** Таблицы в legal pages с inline styles + белый фон → Заменены на CSS-класс `.legal-table` (dark theme)
- **N1:** BG Benefits без `<div>` wrapper (отличие от EN) → Исправлено
- **N3:** Отсутствовала ссылка на материнскую компанию в About → Добавлена

**Что обновлено:**
- CLAUDE.md обновлен до V6.1 (governance + milestones)
- TEAM.md обновлен (6 ролей + скиллы + детальные профили)
- Credentials сохранены в docs/CREDENTIALS.md

**Ключевые решения:**
- og:image генерируется программно (Python/Pillow), не стоковое фото — соответствует liquid oil концепции
- "Събираме" заменено на пассивную форму — юридически безопаснее для ТП
- localStorage для cookie consent оставлено как tech debt (N4) — не блокер для деплоя

**Артефакты:** все 8 HTML, `css/style.css`, `js/main.js`, `sitemap.xml`, `images/favicon.svg`, `images/og-image.png`

**Следующие шаги:**
- Деплой на eco-oylis.info (#5 SRE)
- GA4 + Search Console (#4 Integration)
- Legal review юридических страниц (#1)
- Form backend — Formspree/EmailJS (#4)

---

### [S001] — 2026-03-18 — Развёртывание V6.0 + Создание MVP лендинга

**Роли:** #1 Product Architect, #2 UX/UI, #3 Frontend
**Статус:** завершено

**Что сделано:**
- Развёрнута методология V6.0 (CLAUDE.md, TEAM.md, DEVLOG.md, STATUS.md)
- Создан лендинг BG + EN с liquid oil визуальной концепцией
- Реализованы все блоки ТЗ: Hero, Services, Benefits, About, Social Proof, FAQ, Contacts
- Cookie banner с GDPR consent mode
- SEO: Schema markup, hreflang, Open Graph, canonical URLs
- Юридические страницы (Privacy, Cookie, Impressum) на BG и EN

**Ключевые решения:**
- Static HTML/CSS/JS без фреймворка — максимальная скорость загрузки
- Liquid oil анимация через CSS/SVG — lightweight, GPU-friendly
- Шрифт Inter через Google Fonts

**Артефакты:** `index.html`, `en/index.html`, `css/style.css`, `js/main.js`

**Ошибки сессии (ретроспектива):**
- Работа началась без формального ТС и утверждения CEO → Нарушение правила 3
- Команда не была формализована до конца сессии → TEAM.md создан постфактум
- Отсутствовал аудит результата → Исправлено в S002
