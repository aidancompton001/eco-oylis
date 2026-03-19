# STATUS.md — EKO-OYLIS

**Обновлено:** 2026-03-19
**Методология:** V7.0
**Сессия:** S016

---

## Milestones

| # | Этап | Статус | Блокер |
|---|------|--------|--------|
| 0 | Setup V6.1 | DONE | — |
| 1 | MVP Landing (9/10 Landa) | DONE | — |
| 2 | Deploy (GitHub Pages) | CODE READY | CEO: DNS настройка |
| 3 | Analytics + SEO | CODE READY | CEO: GA4 property ID |
| 4 | Legal Review | PENDING | CEO: юрист |
| 5 | Form Backend | CODE READY | CEO: FormSubmit.co confirm |
| 6 | V7.0 Deployment | DONE | — |

## Последняя сессия (S016)

WebGL Fluid включён на mobile: пониженные GPU-параметры, touch-events, IntersectionObserver pause/resume, FPS benchmark auto-fallback, prefers-reduced-motion accessibility, Safari 100svh fix.

## Что требует действий CEO

1. **DNS:** направить eco-oylis.info на GitHub Pages
2. **GA4:** создать property → заменить `G-XXXXXXXXXX`
3. **FormSubmit.co:** подтвердить email после первой отправки
4. **Юрист:** ревью 6 legal pages

## Tech Debt

- cookie_consent в localStorage (не cookie)
- og:image — системный шрифт, заменить на дизайнерский
