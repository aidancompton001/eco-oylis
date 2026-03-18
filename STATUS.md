# STATUS.md — EKO-OYLIS

**Обновлено:** 2026-03-18
**Этап:** All Milestones Code-Complete
**Сессия:** S003

---

## Milestones

| # | Stage | Status | Blocker |
|---|-------|--------|---------|
| 0 | Setup V6.1 | DONE | — |
| 1 | MVP Landing | DONE (9/10 Landa) | — |
| 2 | Deploy | CODE READY | CEO: Netlify register + DNS |
| 3 | Analytics + SEO | CODE READY | CEO: создать GA4 property |
| 4 | Legal Review | PENDING | CEO: найти юриста |
| 5 | Form Backend | CODE READY | CEO: Formspree register |

## Что требует действий CEO

1. **Netlify:** зарегистрировать на oylis.tech@gmail.com → подключить repo
2. **DNS:** направить eco-oylis.info на Netlify
3. **GA4:** создать property → заменить `G-XXXXXXXXXX` в 2 файлах
4. **Formspree:** зарегистрировать → заменить `FORMSPREE_ID` в 2 файлах
5. **Юрист:** ревью 6 legal pages

## Tech Debt

- cookie_consent в localStorage (не cookie)
- og:image — системный шрифт, заменить на дизайнерский
