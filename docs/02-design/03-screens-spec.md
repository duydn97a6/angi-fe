# 03. Screens Specification - Đặc tả chi tiết màn hình

> Document này mô tả chính xác mỗi màn hình, đủ chi tiết để vibe code 1-1.

## 🏠 Screen 1: Home Screen (Core)

### Purpose
Màn hình trung tâm của app. User mở app là thấy ngay 3 gợi ý.

### Layout cấu trúc

#### Mobile (< 768px)
```
┌─────────────────────────────┐
│ [Avatar]  Chào Minh 👋    [⚙]│  ← Top bar (56px)
│           Trưa nay ăn gì?    │
├─────────────────────────────┤
│ 🌤 32°C • Q.1 • 11:45       │  ← Context bar (40px)
├─────────────────────────────┤
│                              │
│ 3 GỢI Ý CHO BẠN              │  ← Section label
│                              │
│ ┌─────────────────────────┐ │
│ │ [An toàn tag]            │ │
│ │ Bún chả Hương Liên      │ │  ← Card 1 (An toàn)
│ │ 45.000đ • 350m          │ │
│ │ ⭐ 4.6 • 🛵 15 phút      │ │
│ └─────────────────────────┘ │
│                              │
│ ┌─────────────────────────┐ │
│ │ [AI #1 badge]            │ │
│ │ [Quen thuộc tag]         │ │
│ │ Cơm tấm Ba Ghiền        │ │  ← Card 2 (Featured)
│ │ 55.000đ • 500m          │ │
│ │ ⭐ 4.8 • 🛵 20 phút      │ │
│ └─────────────────────────┘ │
│                              │
│ ┌─────────────────────────┐ │
│ │ [Khám phá tag]           │ │
│ │ Gỏi cuốn Mai Xuân       │ │  ← Card 3 (Khám phá)
│ └─────────────────────────┘ │
│                              │
│ [🔄 Gợi ý khác] [👥 Nhóm]    │  ← Action buttons
├─────────────────────────────┤
│ [🏠][👥][📊][👤]              │  ← Bottom nav (56px)
└─────────────────────────────┘
```

#### Desktop (≥ 1024px)
```
┌───────────────────────────────────────────────────────────┐
│ [🍜 AnGi]  Home Nhóm Lịch sử Khám phá      32°C 🔔 [MR]   │  ← Top nav
├───────────────────────────────────────────────────────────┤
│                                                            │
│ Chào Minh, trưa nay ăn gì? 👋                              │
│ AI đã phân tích thời tiết, vị trí và khẩu vị của bạn      │
│                                                            │
│ ┌──────────┐ ┌──────────────┐ ┌──────────┐               │
│ │ An toàn  │ │ [AI #1]      │ │ Khám phá │               │
│ │ Bún chả  │ │ Quen thuộc   │ │ Gỏi cuốn │               │
│ │ Hương L. │ │ Cơm tấm B.G. │ │ Mai Xuân │               │
│ │ 45k      │ │ 55k          │ │ 40k      │               │
│ │ ...      │ │ ...          │ │ ...      │               │
│ └──────────┘ └──────────────┘ └──────────┘               │
│                                                            │
│ [🔄 Gợi ý khác] [🚫 Không muốn] [👥 Rủ nhóm →]             │
│                                                            │
│ ─── TUẦN NÀY BẠN ĐÃ ĂN ─────────────────────               │
│ 🍜 Phở (2)  🍚 Cơm (3)  🥗 Salad (1)  ⚠ Nhiều dầu mỡ 60% │
└───────────────────────────────────────────────────────────┘
```

### Components details

#### 1. Top Bar (Mobile)
- Height: 56px
- Padding: 12px horizontal
- Background: white
- Border-bottom: 1px gray-100

**Content**:
- Left: Avatar (28px circle) + Greeting text
  - Line 1: "Chào [Name] 👋" (11px, gray-500)
  - Line 2: "Trưa nay ăn gì?" (14px, 500 weight, gray-900)
- Right: Settings icon (20px)

#### 2. Context Bar
- Height: 40px
- Background: blue-50
- Padding: 8px 12px
- Content: `🌤 [temp]°C • [district] • [time]`
- Font: 11px, gray-600

#### 3. Recommendation Card (Default)

```
Card dimensions
- Width: 100% on mobile, 300px on desktop (grid)
- Padding: 14px
- Background: white
- Border: 1px solid gray-100
- Border-radius: 12px
- Gap between cards: 10px
```

**Internal layout**:
```
┌─────────────────────────────────┐
│ [Tag pill: An toàn/Quen/Khám]   │ ← margin-bottom: 8px
│                                  │
│ Restaurant name (13px, 500)      │ ← max 2 lines, ellipsis
│ Cuisine type • Price (11px)      │
│                                  │
│ 📍 distance • ⭐ rating          │ ← 10px, gray-400
│ 🛵 delivery time                 │
│                                  │
│ ─────────────────────────         │
│ 💡 AI explanation (10px)         │ ← Why this recommendation
└─────────────────────────────────┘
```

#### 4. Featured Card (AI #1)

Same as default card but:
- Border: 2px solid coral-400
- Has badge "AI đề xuất #1" on top-left
- Slightly bigger padding

#### 5. Action Buttons (Bottom of cards)

```
Mobile: 2 buttons side by side
- Left: "🔄 Gợi ý khác" (secondary style)
- Right: "👥 Rủ nhóm" (primary style)

Desktop: 3 buttons
- "🔄 Gợi ý khác" (secondary)
- "🚫 Không muốn ăn..." (ghost)
- "👥 Rủ cả nhóm cùng quyết" (primary, flex-end)
```

#### 6. Stats Section (Desktop only in MVP)

```
Background: gray-50
Border-radius: 8px
Padding: 12px
Label uppercase small

Content: Horizontal list of emojis + counts
+ Warning badge if unhealthy pattern detected
```

### Interaction specifications

1. **Card click**:
   - Scale animation to 0.98
   - Show loading briefly
   - Show restaurant detail modal hoặc deep link to GrabFood

2. **"Gợi ý khác" button**:
   - Show skeleton loading on cards
   - Fetch new recommendations
   - Crossfade transition

3. **"Không muốn ăn..." button**:
   - Open modal bottom-sheet (mobile) or centered modal (desktop)
   - Multi-select chips
   - Apply button

4. **Pull to refresh** (mobile):
   - Refresh recommendations
   - Show mascot animation

### States

**Loading state**:
```
[Skeleton card × 3]
Gray-100 animated pulse
```

**Error state**:
```
🤔 Ối, AI đang bận nghĩ...
Thử lại nhé?
[Retry button]
```

**Empty state** (no restaurants found):
```
📍 Chưa có quán nào gần đây
Thử mở rộng khu vực tìm kiếm?
[Settings button]
```

---

## 👋 Screen 2: Onboarding (5 steps)

### Purpose
Thu thập thông tin cơ bản để AI bắt đầu gợi ý trong 60 giây.

### Shared layout (all 5 steps)

```
┌─────────────────────────────┐
│ [Progress bar: 1/5]          │  ← Top (18px margin)
│                              │
│ Question title (16px, 500)   │
│ Question subtitle (11px)     │  ← margin-bottom: 20px
│                              │
│ [Answer options]             │  ← Flex 1, scrollable
│                              │
├─────────────────────────────┤
│      [Tiếp tục →]            │  ← Bottom primary button
│     Bỏ qua onboarding        │  ← Text link
└─────────────────────────────┘
```

### Step 1: Vùng miền

```
Question: "Bạn ở vùng miền nào?"
Subtitle: "Để AI hiểu khẩu vị của bạn hơn"

Options (vertical cards):
┌─────────────────────────────┐
│ ✓ Miền Bắc                  │  ← Selected state
│   Phở, bún chả, bún đậu...  │
└─────────────────────────────┘

Each option:
- Padding: 12px
- Border: 1px gray-200 (unselected), 2px coral-400 (selected)
- Background: white (unselected), coral-50 (selected)
- Border-radius: 8px
```

### Step 2: Vị trí văn phòng

```
Question: "Văn phòng bạn ở đâu?"
Subtitle: "AI sẽ tìm quán ăn quanh đây"

Layout:
[Search bar: "Tìm địa chỉ..."]
[Mini map with pin - 250px height]

Below map:
"Bán kính tìm quán ăn"
[Radio: 500m / 1km / 2km]
```

### Step 3: Món không ăn

```
Question: "Có món nào bạn KHÔNG ăn?"
Subtitle: "Chọn tất cả mục phù hợp"

Multi-select chips layout:
Hải sản   Thịt bò   Thịt heo
Đồ cay    Đồ chiên  Lòng/nội tạng
Rau mùi   Đậu phộng Sữa/lactose
[+ Thêm khác...]

Chip states:
- Default: white bg, gray-200 border, 11px text
- Selected: red-50 bg, red-800 text, red-600 border

Below chips (always visible):
"Ngân sách trung bình/bữa"
[Range slider: 20k ←→ 200k]
[Display: "30k - 80k"]
```

### Step 4: Ngân sách chi tiết

Step này optional, có thể gộp vào step 3.

### Step 5: Chế độ ăn

```
Question: "Chế độ ăn của bạn?"
Options:
[Bình thường] [Ăn chay thi thoảng] [Ăn chay trường] [Healthy/Fit]

Below:
"Các món quen thuộc bạn hay ăn"
[Tag cloud - tap to add]
Tùy chọn, có thể skip

[Finish button: "Xong! Gợi ý món ngay"]
```

### Progress bar specs

```
5 segments, each 20% width
Gap: 4px between segments
Height: 3px
Border-radius: 2px

Colors:
- Completed: coral-400
- Current: coral-400
- Upcoming: gray-200
```

### Success state (after step 5)

```
Animation: Confetti + mascot celebrating
Text: "Tuyệt vời! AI đã sẵn sàng gợi ý món cho bạn 🎉"
Auto-redirect to Home after 2 seconds
```

---

## 💬 Screen 3: Feedback Modal

### Purpose
Thu thập feedback sau bữa ăn để AI học.

### Trigger
- Push notification sau 2 giờ
- Hoặc user mở app và có unfeedback meal

### Layout (Bottom sheet on mobile, centered modal on desktop)

```
┌─────────────────────────────┐
│              ─              │  ← Drag handle (mobile)
│                              │
│ [🍚 emoji]  Cơm tấm Ba Ghiền│  ← Meal info
│            Ăn lúc 12:15 hôm nay
│                              │
│ Bữa vừa rồi thế nào?         │
│ Feedback giúp AI hiểu bạn    │
│                              │
│ ┌────┐ ┌────┐ ┌────┐        │
│ │ 😕 │ │ 😐 │ │ 😋 │        │  ← 3 emoji buttons
│ │Tệ  │ │Ổn  │ │Tuyệt!  │   │
│ └────┘ └────┘ └────┘        │
│                              │
│ Bạn có hối hận không?        │
│ [Không hề] [Hơi chút] [Có]  │
│                              │
│ Lý do (không bắt buộc)       │
│ [Ngon] [Rẻ] [Nhanh] [Gần]   │  ← Tag chips
│                              │
│     [Gửi feedback]           │
└─────────────────────────────┘
```

### Interaction rules
- Emoji selection required
- Regret question appears after emoji selected
- Tags are optional
- Submit button activates after emoji selected
- Auto-close after submit + toast "Cảm ơn! 🙏"

---

## 👥 Screen 4: Group Decision (Phase 2)

### Purpose
Nhóm quyết định ăn gì cùng nhau.

### Layout

```
┌─────────────────────────────┐
│ Team Dev Backend         ⏱ 2:45│  ← Header + timer
│ 5 người • Đang vote          │
├─────────────────────────────┤
│ ⚠ 2 người chưa vote: An, Linh│  ← Alert bar
├─────────────────────────────┤
│ AI LỌC CHO CẢ NHÓM            │
│                              │
│ [Meal card with votes]       │
│ [Meal card - DẪN ĐẦU]        │
│ [Meal card]                  │
│                              │
│ [Vetoed meals section]       │  ← Collapsed by default
│                              │
├─────────────────────────────┤
│    [Chốt cơm gà Hải Nam →]   │  ← CTA
└─────────────────────────────┘
```

### Meal card in group mode

```
┌─────────────────────────────┐
│ Cơm gà Hải Nam       4/5 👍  │  ← Name + vote count
│ 60k • 250m • ⭐ 4.8          │
│ [H][T][M][D] + 1 more       │  ← Voter avatars
│ [Vote ↑] [Veto ✗]           │  ← Actions
└─────────────────────────────┘

If currently leading:
- Green border 2px
- "Đang dẫn" badge

If already voted by current user:
- Vote button replaced with "✓ Đã vote"
```

### Veto flow

```
Click "Veto" →
Modal: "Vì sao bạn không ăn được món này?"
Options:
- Dị ứng / không ăn được
- Vượt ngân sách
- Chế độ ăn không phù hợp
- Đã ăn nhiều lần tuần này

Submit → Card strikethrough, moved to "Đã loại" section
```

---

## 📊 Screen 5: History

### Purpose
User xem lại lịch sử bữa ăn + stats.

### Layout

```
┌─────────────────────────────┐
│ Lịch sử bữa ăn               │
│ [Lọc: Tuần này ▾]            │
├─────────────────────────────┤
│ TUẦN NÀY                     │
│ [Stats cards: 3 metric cards]│
│  - Tổng số bữa: 8            │
│  - Chi tiêu: 420k            │
│  - Điểm ngon TB: 4.2/5       │
│                              │
│ HÔM NAY                      │
│ [Meal entry with emoji]      │
│ [Meal entry]                 │
│                              │
│ HÔM QUA                      │
│ [Meal entry]                 │
└─────────────────────────────┘
```

### Meal entry component

```
┌─────────────────────────────┐
│ [🍜] Bún chả Hương Liên  😋  │  ← Icon + name + feedback
│      12:30 • 45.000đ         │
│      Tags: Ngon, Nhanh       │
└─────────────────────────────┘

Click → Detail view with full context
```

---

## 👤 Screen 6: Profile & Settings

### Layout

```
┌─────────────────────────────┐
│      [Avatar 64px]           │
│      Nguyễn Văn Minh         │
│      minh@example.com        │
├─────────────────────────────┤
│ AI ĐÃ HIỂU BẠN 72%           │  ← Progress indicator
│ [Progress bar]               │
│                              │
│ 45 bữa ăn • 12 món yêu thích │
├─────────────────────────────┤
│ CÀI ĐẶT                      │
│ > Chỉnh sửa sở thích         │
│ > Vị trí & thông báo         │
│ > Thành viên nhóm            │
│ > Dữ liệu & quyền riêng tư   │
│ > Giới thiệu bạn bè          │
│ > Về AnGi                    │
│ > Đăng xuất                  │
└─────────────────────────────┘
```

---

## 🔔 Push Notifications Specs

### Notification types

1. **Meal time reminder** (11:30 AM daily)
   - Title: "Trưa nay ăn gì? 🍜"
   - Body: "AI đã chuẩn bị 3 gợi ý cho bạn"
   - Deep link: Home screen

2. **Feedback request** (2h after meal intent)
   - Title: "Bữa vừa rồi thế nào? 😋"
   - Body: "[Tên món] - Chia sẻ để AI học thêm"
   - Deep link: Feedback modal

3. **Group invite**
   - Title: "[Tên người] rủ bạn ăn trưa"
   - Body: "Team [Tên team] đang vote món"
   - Deep link: Group decision screen

4. **Weekly summary** (Sunday evening)
   - Title: "Tuần này bạn đã ăn gì?"
   - Body: "Xem lại hành trình ẩm thực tuần qua"
   - Deep link: History screen

### Notification rules
- User có thể opt-out từng loại
- Không bao giờ gửi notification sau 22:00 hoặc trước 7:00
- Max 3 notifications/day
- Silent hours: weekends default off

---

## 🎨 Consistent elements across screens

### Bottom Navigation (Mobile)
```
4 tabs, 56px height
- Home (house icon)
- Group (people icon)
- History (chart icon)
- Profile (person icon)

Active state:
- Icon: coral-400
- Label: coral-400, 10px
- Indicator: 2px line above icon (optional)
```

### Top Navigation (Desktop)
```
Height: 60px
Left: Logo "🍜 AnGi"
Center: Nav links (Home, Nhóm, Lịch sử, Khám phá)
Right: Weather widget + Notification bell + Avatar

Active link: coral-400 color, 500 weight
```
