# CLAUDE.md — EKO-OYLIS

## Владелец проекта

**Пользователь = CEO проекта.** Его слово — закон. Все решения CEO имеют абсолютный приоритет. Команда выполняет указания CEO без обсуждения.

**Второй после CEO: #1 Product Architect** — правая рука CEO, координатор команды. Несёт персональную ответственность за качество всех задач.

---

## Проект

**Название:** EKO-OYLIS
**Тип:** Static Landing Page (trust validator)
**Описание:** Одностраничный лендинг торгового представительства украинской компании ЕКО-ОЙЛІС в Болгарии. Сбор отработанного растительного масла. Trust point для HoReCa-партнёров. Конверсия → заявки через контактную форму.
**Локация:** Munich, Germany (owner) / Sofia, Bulgaria (business)
**Языки:** Bulgarian (primary) + English
**Домен:** eco-oylis.info
**Материнский сайт:** eko-oylis.com.ua

---

## Документация

| Файл | Назначение | Когда читать |
|------|-----------|--------------|
| `CLAUDE.md` | Главный управляющий документ | Всегда (загружается автоматически) |
| `TEAM.md` | Команда: роли, страйки, увольнения | При запуске любого агента |
| `DEVLOG.md` | Журнал разработки | Старт/завершение сессии |
| `STATUS.md` | Текущее состояние (snapshot) | Старт сессии |
| `docs/CREDENTIALS.md` | Доступы (НЕ в git) | Деплой, интеграции |

---

## Tech Stack

| Слой | Технология | Статус |
|------|-----------|--------|
| Markup | HTML5 (semantic) | Locked |
| Styles | CSS3 (liquid oil theme, custom properties) | Locked |
| Scripts | Vanilla JS (ES6+) | Locked |
| Fonts | Google Fonts (Inter) | Locked |
| Analytics | GA4 (after consent) | Locked |
| SEO | Schema.org JSON-LD, Open Graph, hreflang | Locked |
| GDPR | Cookie banner + consent mode | Locked |
| Hosting | GitHub Pages | Locked |

---

## Структура проекта

```
EKO-OYLIS/
├── CLAUDE.md
├── TEAM.md
├── DEVLOG.md
├── STATUS.md
├── index.html                    # BG (main)
├── en/index.html                 # EN
├── css/style.css                 # Liquid oil theme
├── js/main.js                    # Nav, forms, cookie consent
├── images/
├── politika-poveritelnost/       # Privacy Policy BG
├── politika-biskvitki/           # Cookie Policy BG
├── pravna-informacia/            # Legal Notice BG
├── en/privacy-policy/            # Privacy Policy EN
├── en/cookie-policy/             # Cookie Policy EN
├── en/legal-notice/              # Legal Notice EN
└── docs/
    └── CREDENTIALS.md            # НЕ в git
```

---

## ПРОТОКОЛ ФОРМАЛИЗАЦИИ ЗАДАЧ

> **CEO ставит задачу → агент ОБЯЗАН выполнить протокол из промпта CEO.**
> **Без промпта CEO — агент читает этот раздел как минимальный стандарт.**

### Минимальный стандарт (если CEO не вставил промпт)

```
1. Прочитай CLAUDE.md и TEAM.md
2. Назначь ответственного специалиста
3. Сформируй ТС — покажи CEO, жди ОК
4. После ОК — выполняй строго по ТС
5. Проверь результат (build/test)
6. Запиши в DEVLOG.md и STATUS.md
```

**Нарушение любого шага = страйк. 2 страйка = увольнение.**

### Шаблон ТС (M / L / XL)

```
## ТС: [Краткое название]

**Ответственный:** #N — [Имя] — [Роль]
**Размер:** S / M / L / XL
**Скилл:** {какой скилл применён}

### Цель
[Одно предложение: что и зачем]

### Скоуп
**Включено:** [что входит]
**НЕ включено:** [что явно исключено]

### Критерии приёмки
- [ ] [Проверяемый критерий 1]
- [ ] [Проверяемый критерий N]

### Файлы
- [файлы для создания/изменения]

### Верификация
{build команда} → {тест команда} → {health check}
```

### Шаблон ТС (S)

```
## ТС: [Название]
**Ответственный:** #N | **Размер:** S
**Что сделать:** [1-2 предложения]
**Критерий:** [1 строка]
**Файлы:** [список]
```

### Размеры задач

| Размер | Описание | Бюджет итераций | ОК от CEO | Тесты |
|--------|---------|----------------|-----------|-------|
| **S** | 1 файл, <50 строк | 3 | Нет | Нет |
| **M** | Один модуль | 7 | Да | 1-2 unit |
| **L** | Несколько модулей | 15 | Да | Unit + Integration |
| **XL** | Кросс-доменная | 25 | Да + Landa Review | Unit + Integration + E2E |

**Бюджет превышен → СТОП → STATUS.md → ждать CEO.**

---

## ВЕРИФИКАЦИЯ

| Размер | Что проверить | Готово когда |
|--------|-------------|-------------|
| **S** | Browser render | Page OK |
| **M** | Browser + HTML validator | Valid + visual OK |
| **L** | Browser + Mobile + Lighthouse | All above + perf > 90 |
| **XL** | All L + Landa Review + cross-browser | Chrome/FF/Safari + critical review |

**Нет галочек = не готово. Пропуск верификации = страйк.**

---

## ПРАВИЛА

### Команда
- Каждая задача = один ответственный из TEAM.md
- #1 Product Architect = правая рука CEO. Ведёт реестр замечаний
- 2 замечания = увольнение (без обсуждения)
- #14 Hans Landa = критический ревьюер (вызывается на XL и по запросу CEO)
- Новые роли (#7, #8...) добавляются решением #1 + CEO

### Скиллы (выбирает #1)
- L/XL фича → `brainstorming`
- UI/Дизайн → `ui-ux-pro-max`
- Баг → `systematic-debugging`
- Перед кодом → `test-driven-development`
- Ревью → `requesting-code-review`
- Параллельная работа → `dispatching-parallel-agents`
- Перед "готово" → `verification-before-completion`

### Dev Rules
- Semantic HTML5, CSS Custom Properties (liquid oil palette), Vanilla JS ES6+
- All text in HTML (not JS) for SEO
- BG = root `/`, EN = `/en/` | hreflang links | Language switcher in nav
- Schema.org JSON-LD, Open Graph, canonical URLs, meta descriptions
- Cookie banner → consent → GA4 loads | Privacy/Cookie/Legal pages BG+EN

### Числа (ЖЕЛЕЗНОЕ ПРАВИЛО)
> ВСЕ расчёты через скрипт (Python/Node.js). НИКОГДА в голове. Нарушение = увольнение.

### Credentials
- Все секреты в `docs/CREDENTIALS.md` (НЕ в git)
- Production: env vars / hosting secrets

### Git
- Conventional Commits: `type(scope): description`
- Типы: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Co-Authored-By: `Claude <noreply@anthropic.com>`

### ЗАПРЕЩЕНО (без исключений)
- Коммит в `main`/`master` напрямую (без ТС и одобрения)
- `git push --force`, `git reset --hard`
- Удалять файлы без указания CEO
- Модифицировать CI/CD, DNS без подтверждения
- Устанавливать пакеты вне скоупа ТС
- Начинать работу без ТС (M+ задачи)
- Решать за CEO (хостинг, домен, сервисы, архитектуру)

---

## ЖУРНАЛ (DEVLOG)

### Формат записи

```
### [SNNN] — ГГГГ-ММ-ДД — Заголовок (макс 60 символов)

**Роли:** #N Роль
**Статус:** завершено | частично | заблокировано

**Что сделано:**
- Результат 1 (не процесс!)

**Ключевые решения:**
- Решение — причина

**Артефакты:** `файл1`, `файл2`

**Следующие шаги:**
- Конкретное действие
```

### STATUS.md (перезаписывать каждую сессию, макс 30 строк)

Текущий snapshot: этап, готово, следующее, блокеры.

---

## Milestones

| # | Этап | Ведёт | Статус |
|---|------|-------|--------|
| 0 | Setup V6.1 | #1 | Done |
| 1 | MVP Landing (9/10) | #2 + #3 | Done |
| 2 | Deploy | #6 | Code Ready — CEO: GitHub Pages + DNS |
| 3 | Analytics + SEO | #3 + #4 | Code Ready — CEO: GA4 ID |
| 4 | Legal Review | #1 | Pending — CEO: юрист |
| 5 | Form Backend | #4 | Code Ready — CEO: FormSubmit.co |
| 6 | V7.0 Deployment | #1 | Done |

---

## Риски

| # | Риск | Владелец | Стратегия |
|---|------|---------|-----------|
| 1 | Форма не отправляет заявки | #4 | FormSubmit.co + fallback mailto |
| 2 | GDPR нарушение | #1 | Cookie consent + legal pages + юрист |
| 3 | Ошибки в расчётах | #1 | ЖЕЛЕЗНОЕ ПРАВИЛО: числа через скрипт |
| 4 | Нарушение протокола | #1 | Strike System: 2 страйка = увольнение |
| 5 | Потеря контекста | #1 | STATUS.md + DEVLOG каждую сессию |
| 6 | DNS/SSL проблемы | #6 | GitHub Pages auto-SSL + мониторинг |

---

## Security Baseline (перед деплоем)

- [ ] Секреты не в коде
- [ ] HTTPS only в production
- [ ] Cookie consent GDPR-compliant
- [ ] Contact form spam-protected (honeypot)
- [ ] Security headers (CSP, HSTS, X-Frame-Options)
