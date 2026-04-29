export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Đăng nhập thành công',
    LOGIN_FAILED: 'Đăng nhập thất bại',
    REGISTER_SUCCESS: 'Đăng ký thành công',
    REGISTER_FAILED: 'Đăng ký thất bại',
    LOGOUT_SUCCESS: 'Đăng xuất thành công',
  },
  ONBOARDING: {
    WELCOME: 'Chào mừng đến với AnGi!',
    COMPLETE: 'Tuyệt vời! AI đã sẵn sàng gợi ý món cho bạn 🎉',
  },
  RECOMMENDATION: {
    LOADING: 'AI đang tìm quán ăn cho bạn...',
    ERROR: 'Có lỗi xảy ra khi tải gợi ý',
    EMPTY: 'Chưa có quán nào gần đây',
  },
  FEEDBACK: {
    SUCCESS: 'Cảm ơn feedback! AI sẽ học thêm.',
    ERROR: 'Không thể gửi feedback',
  },
  COMMON: {
    LOADING: 'Đang tải...',
    ERROR: 'Có lỗi xảy ra',
    RETRY: 'Thử lại',
    CANCEL: 'Hủy',
    CONFIRM: 'Xác nhận',
    SAVE: 'Lưu',
    DELETE: 'Xóa',
  },
} as const;
