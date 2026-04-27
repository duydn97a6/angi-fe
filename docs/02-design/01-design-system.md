# 01. Design System - Hệ thống thiết kế thống nhất

## 🎨 Nguyên tắc thiết kế

### 1. Mobile-first, harmonized across platforms
Design gốc cho màn hình 375px, scale lên desktop. Flutter sẽ implement gần như pixel-perfect với web.

### 2. Warmth over minimalism
App ăn uống phải gợi cảm giác đói. Dùng màu ấm, không quá "tech/cold".

### 3. Decision over choice
Luôn ưu tiên đưa ra 1 gợi ý nổi bật thay vì cho user quá nhiều option.

### 4. Show, don't tell
Dùng visual (emoji món ăn, hình ảnh) thay vì text dài dòng.

---

## 🎨 Color Palette

### Primary colors
```
Coral (Brand)
--coral-50:  #FAECE7
--coral-100: #F5C4B3
--coral-200: #F0997B
--coral-400: #D85A30  ← Primary brand color
--coral-600: #993C1D
--coral-800: #712B13
--coral-900: #4A1B0C
```

### Accent colors
```
Amber (Warm, food-related)
--amber-50:  #FAEEDA
--amber-100: #FAC775
--amber-200: #EF9F27
--amber-400: #BA7517  ← For "Khám phá" tag
--amber-600: #854F0B

Green (Safe, healthy)
--green-50:  #EAF3DE
--green-200: #97C459
--green-400: #639922  ← For "An toàn" tag
--green-600: #3B6D11

Purple (AI, smart)
--purple-50:  #EEEDFE
--purple-200: #AFA9EC
--purple-400: #7F77DD  ← For "Quen thuộc" tag
--purple-600: #534AB7
```

### Semantic colors
```
Success: #22C55E
Warning: #F59E0B
Danger:  #EF4444
Info:    #3B82F6
```

### Neutrals
```
--gray-50:  #F9F9F7
--gray-100: #F1EFE8
--gray-200: #D3D1C7
--gray-400: #888780  ← Body text secondary
--gray-600: #5F5E5A
--gray-800: #2C2C2A  ← Body text primary
--gray-900: #1A1A19  ← Headings
```

### Background
```
--bg-primary:   #FFFFFF  (cards, modals)
--bg-secondary: #F9F9F7  (page background)
--bg-tertiary:  #F1EFE8  (muted sections)
```

---

## 🔤 Typography

### Font family
- **Web**: `Inter` (Google Fonts) với fallback system
- **Mobile**: System default (SF Pro on iOS, Roboto on Android)

### Type scale
| Element | Size | Weight | Line-height |
|---------|------|--------|-------------|
| Display | 32px | 600 | 1.2 |
| H1 | 24px | 600 | 1.3 |
| H2 | 20px | 500 | 1.4 |
| H3 | 18px | 500 | 1.4 |
| Body Large | 16px | 400 | 1.6 |
| Body | 14px | 400 | 1.5 |
| Body Small | 12px | 400 | 1.5 |
| Caption | 11px | 400 | 1.4 |
| Button | 14px | 500 | 1.0 |

### Rules
- **Weights**: Chỉ dùng 400, 500, 600. Không dùng 700+ (quá nặng)
- **Sentence case** cho mọi heading (KHÔNG dùng ALL CAPS hoặc Title Case)
- **Không bold giữa câu** - bold chỉ cho labels và headings

---

## 📐 Spacing system

Dùng scale 4px:
```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

### Rules
- Padding trong card: `--space-4` (16px)
- Gap giữa elements: `--space-3` (12px)
- Section margin: `--space-6` hoặc `--space-8`
- Screen edge padding: 16px (mobile), 24px (tablet), 32px (desktop)

---

## 🔘 Border radius

```
--radius-sm:  4px   (small tags, chips)
--radius-md:  8px   (buttons, inputs, small cards)
--radius-lg:  12px  (main cards)
--radius-xl:  16px  (modals, large cards)
--radius-full: 9999px (pills, avatars)
```

---

## 🎭 Shadows

Flat design, shadows cực minimal:
```
--shadow-none: none
--shadow-xs: 0 1px 2px rgba(0,0,0,0.05)   (cards)
--shadow-sm: 0 2px 4px rgba(0,0,0,0.08)   (elevated cards)
--shadow-md: 0 4px 12px rgba(0,0,0,0.1)   (modals, popovers)
```

**KHÔNG** dùng shadow cho buttons, chỉ dùng cho cards và modals.

---

## 🧩 Component specs

### Button

```
Primary Button
- Background: coral-400 (#D85A30)
- Text: white
- Padding: 10px 20px (mobile) / 12px 24px (desktop)
- Border-radius: 8px
- Font: 14px / 500
- Hover: darken 10%
- Active: scale(0.98)

Secondary Button
- Background: white
- Text: coral-400
- Border: 1px solid coral-200
- Same dimensions

Ghost Button
- Background: transparent
- Text: gray-600
- Hover: bg gray-100
```

### Input

```
Text Input
- Height: 44px (mobile touch-friendly) / 40px (desktop)
- Padding: 0 14px
- Border: 1px solid gray-200
- Border-radius: 8px
- Focus: border coral-400, shadow 0 0 0 3px coral-50

Placeholder: gray-400
```

### Card

```
Restaurant Card
- Background: white
- Border: 1px solid gray-100
- Border-radius: 12px
- Padding: 14px 16px
- Hover: border gray-200, shadow-xs

Featured Card (AI đề xuất #1)
- Border: 2px solid coral-400
- Same rest
- Badge above: "AI đề xuất #1"
```

### Tag/Chip

```
Tag (An toàn)
- Background: green-50 (#EAF3DE)
- Text: green-800 (#27500A)
- Padding: 2px 10px
- Border-radius: 9999px (pill)
- Font: 11px / 500

Tag (Quen thuộc)
- Background: purple-50
- Text: purple-800

Tag (Khám phá)
- Background: amber-50
- Text: amber-800
```

### Avatar

```
- Size: 28px (list), 32px (nav), 44px (profile)
- Border-radius: 9999px (circle)
- Background: purple-50 / coral-50 / green-50 (rotate based on user id)
- Text color: matching 800 shade
- Initials: 1-2 chars, 500 weight
```

---

## 🎬 Motion & Animation

### Timing
```
--duration-fast:    150ms  (hover, active states)
--duration-normal:  250ms  (most transitions)
--duration-slow:    400ms  (page transitions)
```

### Easing
```
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1)  (most cases)
--ease-spring:   cubic-bezier(0.5, 1.5, 0.5, 1) (fun interactions)
```

### Key animations
- **Card tap**: scale(0.98) on press
- **Button tap**: scale(0.98) + brightness(0.95)
- **Page transition**: slide from right (mobile)
- **Modal**: fade + slide up from bottom
- **Loading**: subtle pulse (not spinner for recommendations)

---

## 📱 Responsive breakpoints

```
Mobile:   < 768px  (default, mobile-first)
Tablet:   768px - 1023px
Desktop:  ≥ 1024px
Wide:     ≥ 1440px (max content width 1280px, center)
```

### Layout strategy
- **Mobile**: Single column, stack all cards
- **Tablet**: 2 columns cho recommendation cards
- **Desktop**: 3 columns cho recommendation cards, sidebar cho nav

---

## 🖼 Iconography

### Library
- **Web**: Lucide Icons (tree-shakable, consistent)
- **Mobile**: `flutter_lucide` hoặc Material Icons

### Sizes
- 16px: Inline với text
- 20px: Default
- 24px: Section headers
- 32px: Empty states

### Rules
- Stroke width: 2px (default của Lucide)
- Color: inherit from text color hoặc coral-400 cho actions

---

## 🎨 Mascot & Illustrations

### Mascot concept
Một chú đầu bếp nhỏ (hoặc con vật dễ thương liên quan đồ ăn) xuất hiện ở:
- Empty states ("Chưa có lịch sử bữa ăn")
- Loading screens
- Success/error messages
- Onboarding

### Style
- Flat illustration (không 3D)
- Màu chính coral + amber
- Expressive nhưng đơn giản
- Có 5-6 pose: vui, đói, ngạc nhiên, suy nghĩ, chúc mừng

---

## ♿ Accessibility

### Color contrast
- Text trên background: tối thiểu WCAG AA (4.5:1)
- Large text (18px+): 3:1

### Touch targets
- Mobile: tối thiểu 44x44px
- Desktop: tối thiểu 32x32px

### Focus states
- Mọi interactive element phải có focus ring rõ ràng
- Không dùng `outline: none` mà không thay thế

### Screen reader
- Semantic HTML
- ARIA labels cho icon-only buttons
- Alt text cho mọi images

---

## 🌐 Localization

### Languages (MVP)
- 🇻🇳 Vietnamese (primary)
- 🇺🇸 English (Phase 2)

### Copy guidelines (Vietnamese)
- Dùng "bạn" thay vì "quý khách" (thân thiện)
- Emoji có thể dùng vừa phải (không lạm dụng)
- Câu ngắn, có thể cắt xuống 1 dòng trên mobile
- Dùng ngôn ngữ Gen Z nhẹ nhàng (vd: "Ăn gì lu bu?" thay vì "Bạn muốn ăn món nào?")

---

## 📦 Component library mapping

### Web (Next.js + Tailwind)
- Base components: shadcn/ui (customized theme)
- Animation: Framer Motion
- Icons: Lucide React
- Charts: Recharts (cho history stats)

### Mobile (Flutter)
- Base: Material 3 với custom theme
- Icons: `flutter_lucide` package
- Animation: Flutter built-in
- State: Riverpod

---

## 🎯 Design-to-code handoff

### Web → Tailwind config
Xem file `04-frontend/02-component-library.md` cho Tailwind config chi tiết.

### Mobile → Flutter theme
Xem file `05-mobile/01-project-structure.md` cho Flutter ThemeData.

### Figma source
(Sẽ tạo sau khi bắt đầu dev - link Figma file)

---

## 📋 Design checklist cho mỗi màn hình

Trước khi coding, mỗi màn hình phải có:
- [ ] Desktop version (1440px)
- [ ] Tablet version (768px)
- [ ] Mobile version (375px)
- [ ] Empty state
- [ ] Loading state
- [ ] Error state
- [ ] Success state (nếu có action)
- [ ] Dark mode version (Phase 2+)
