# 02. User Flows - Luồng người dùng chính

## 🗺 Flow 1: New User Onboarding

```
[Landing Page]
      ↓ Click "Dùng thử"
[Sign Up Screen]
      ↓ Email/Password hoặc Google OAuth
[Verify Email] (optional, có thể skip)
      ↓
[Onboarding Step 1/5: Vùng miền]
      ↓ Chọn Bắc/Trung/Nam
[Onboarding Step 2/5: Vị trí văn phòng]
      ↓ Tìm trên map + chọn radius
[Onboarding Step 3/5: Món không ăn]
      ↓ Multi-select chips
[Onboarding Step 4/5: Ngân sách]
      ↓ Slider range
[Onboarding Step 5/5: Chế độ ăn]
      ↓ Bình thường/Chay/Healthy
[Permission Request]
      ↓ Cho phép location
[Home Screen - First recommendation]
      ↓ Show 3 suggestions with welcome tooltip
```

### Edge cases
- User từ chối cấp location → Dùng location văn phòng từ onboarding
- User skip onboarding → Dùng default preferences (generic)
- User chưa verify email → Vẫn cho dùng, nhắc sau 3 days

### Success metric
- Onboarding completion rate > 70%
- Time to first recommendation < 90 giây

---

## 🗺 Flow 2: Daily Meal Decision (Core Flow)

```
[Push notification 11:30 AM]
      ↓ "Trưa nay ăn gì?"
[Open app → Home Screen]
      ↓ (Auto-load 3 suggestions)
[Review 3 cards: An toàn / Quen thuộc / Khám phá]
      ↓
      ├─ [Click a card]
      │     ↓
      │   [Show restaurant detail + menu preview]
      │     ↓ Click "Đặt qua GrabFood"
      │   [Deep link → GrabFood app]
      │     ↓ (tracked via affiliate)
      │
      ├─ [Click "Gợi ý khác"]
      │     ↓
      │   [Show 3 new suggestions]
      │
      └─ [Click "Không muốn ăn..."]
            ↓
          [Anti-filter modal: chọn món KHÔNG muốn]
            ↓ Apply
          [Show 3 new suggestions]

2 hours later:
      ↓
[Push notification: "Bữa vừa rồi thế nào?"]
      ↓ Click
[Feedback Modal]
      ↓ 3 emoji + regret + tags
[Save to history]
      ↓
[AI learns from feedback → Better next time]
```

### Edge cases
- No location permission → Fallback to office location
- No internet → Show cached suggestions from last 15 mins
- All suggestions already eaten recently → Show discovery-heavy suggestions

### Success metric
- Click-through rate on cards > 40%
- Feedback submission rate > 30%

---

## 🗺 Flow 3: Group Decision (Phase 2)

```
[Home screen]
      ↓ Click "Rủ cả nhóm"
[Select/Create Team Modal]
      ↓
      ├─ [Chọn team có sẵn]
      │     ↓
      │   [Go to group decision screen]
      │
      └─ [Tạo team mới]
            ↓
          [Name team + Invite members]
            ↓ Share link/QR
          [Wait for members to join]
            ↓
          [Start group decision]

[Group Decision Screen]
      ↓ (AI tự động lọc phù hợp cả nhóm)
[5 món được đề xuất]
      ↓ Mỗi người vote/veto
      ↓
      ├─ [Veto applied]: Món bị loại khỏi list
      │
      └─ [Vote up]: Tăng ranking

[Timer countdown 30 mins]
      ↓
[Kết quả: Món được vote nhiều nhất]
      ↓ Team lead chốt
[Deep link to order / share address]
```

### Business rules
- Mỗi user có 1 veto/ngày
- Veto phải có lý do (dị ứng / ngân sách / chế độ ăn)
- Fairness: AI theo dõi tuần qua ai đã được chiều ý
- Timer mặc định 30 phút, team lead có thể chốt sớm

### Success metric
- Group poll completion rate > 60%
- Avg time to decision < 5 mins

---

## 🗺 Flow 4: Feedback Loop (Critical for AI learning)

```
[User clicked on restaurant card] (hour 0)
      ↓ (Tracked event: meal_intent)
[Deep link to food app]

[Background] (hour 2)
      ↓ Schedule notification
[Push: "Bữa vừa rồi thế nào?"]
      ↓ Click

[Feedback Modal - Step 1]
      ↓ Emoji selection
      ├─ 😋 Tuyệt → Positive feedback flow
      ├─ 😐 Ổn → Neutral flow
      └─ 😕 Tệ → Negative feedback flow

[Feedback Modal - Step 2] (cho Tệ và Ổn)
      ↓ "Bạn có hối hận không?"
      └─ Không / Hơi / Có

[Feedback Modal - Step 3] (optional)
      ↓ "Lý do?"
      └─ Tags: Ngon/Rẻ/Nhanh/Gần/Dơ/Đắt/Không ngon

[Save feedback]
      ↓
[AI updates user preference model]
      ↓
[Next recommendation sẽ chính xác hơn]
```

### Gamification
- Streak: "Bạn đã feedback 5 ngày liên tiếp! 🔥"
- Milestone: "AI giờ đã hiểu bạn 80%! Khám phá nhiều hơn"

### Success metric
- Feedback rate > 40%
- Streak maintained > 3 days for 30% users

---

## 🗺 Flow 5: Returning User (D2+)

```
[Open app]
      ↓
[Check: User đã dùng trong 24h chưa?]
      ↓
      ├─ [Yes - Power user]
      │     ↓ Direct to Home Screen
      │   [3 suggestions - pre-loaded]
      │
      └─ [No - Returning after 1+ day]
            ↓ Show brief "Welcome back" tooltip
          [3 suggestions - with "Món mới cho bạn" badge]
```

### Personalization rules for returning users
- Hiện có món đã ăn gần đây ≥ 5 lần → giảm priority
- Nếu có khung giờ quen thuộc (vd thứ 2 sáng ăn phở) → ưu tiên
- Weather thay đổi mạnh → highlight "Thời tiết hôm nay phù hợp..."

---

## 🗺 Flow 6: Negative feedback handling

```
[User rated bữa ăn là 😕 Tệ + "Có hối hận"]
      ↓
[AI marks restaurant as low priority for this user]
      ↓
[Next session]
      ↓ (Nếu user lại mở app)
[Home Screen với special message]
      ↓ "Xin lỗi về bữa trước. Lần này chắc chắn tốt hơn!"
[3 suggestions khác biệt hoàn toàn với bữa trước]
      ↓
[Track: recovery rate]
```

### Rules
- 2 negative feedback liên tiếp → downgrade AI confidence
- 3 negative liên tiếp → trigger manual review (backend)
- Prompt user: "Có muốn cập nhật lại sở thích?"

---

## 🗺 Flow 7: Anti-recommendation

Thay vì hỏi user thích gì, hỏi user KHÔNG muốn ăn gì:

```
[Home Screen]
      ↓ Click "Không muốn ăn..."
[Anti-filter modal]
      ↓
[Categories to exclude]
      ├─ Loại món: Phở/Cơm/Bún/Mì...
      ├─ Cảm giác: Không cay/Không dầu mỡ/Không nước...
      ├─ Origin: Không món Việt/Không Hàn/Không Nhật...
      └─ Mood: Không muốn phức tạp/Không muốn đắt

[Select multiple]
      ↓ Apply
[Return to Home Screen với 3 suggestions mới]
      ↓ Loaded with exclusions
```

### Psychology insight
Human brain dễ trả lời "không muốn gì" hơn là "muốn gì". Flow này giảm decision fatigue.

---

## 🗺 Flow 8: Profile & Settings

```
[Bottom nav: Profile]
      ↓
[Profile Screen]
      ├─ Avatar + Name
      ├─ Quick stats (món yêu thích, điểm AI hiểu bạn...)
      └─ Menu:
            ├─ [Chỉnh sửa preferences]
            │     ↓ Quick edit onboarding answers
            ├─ [Lịch sử bữa ăn]
            │     ↓ Timeline view với filter
            ├─ [Cài đặt thông báo]
            │     ↓ On/off từng loại
            ├─ [Privacy & Data]
            │     ↓ Export, delete, opt-out AI
            └─ [Logout]
```

---

## 🎬 Key principles across all flows

### 1. Max 3 taps to any action
Nếu cần nhiều hơn 3 taps, redesign lại flow.

### 2. No dead ends
Mọi screen phải có way forward hoặc back.

### 3. Forgiveness
- Mọi destructive action cần confirmation
- Undo support cho feedback (trong 10 giây)
- Restore deleted items trong 30 ngày

### 4. Speed over completeness
- Không bắt user fill form dài
- Cho dùng app ngay cả khi chưa hoàn tất onboarding
- Suggestions mặc định OK khi chưa có enough data

### 5. Delight moments
- Confetti khi hoàn thành onboarding
- Emoji animation khi feedback positive
- Mascot cheering khi unlock achievement
