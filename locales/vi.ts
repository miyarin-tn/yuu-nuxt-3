export default defineI18nLocale((locale: string) => {
  return Promise.resolve(vi)
  /* ----- translate by external API ----- */
  // return $fetch(`/api/translations/${locale}`)
})

export const vi = {
  VERSION: 'Phiên bản',
  WELCOME_SITE: 'Chào mừng đến với bản mẫu {site}',
  ITEM: 'không có mục nào | 1 mục | {count} mục',
  GO_BACK_HOME: 'Về trang chủ',
  PAGE_NOT_FOUND: 'Không tìm thấy trang',
  LICENSE: 'Giấy phép {name}',
  TOKEN_EXPIRED: 'Mã đã hết hạn',
  UNAUTHORIZED: 'Chưa xác thực',
  USERNAME: 'Tên đăng nhập',
  PASSWORD: 'Mật khẩu',
  LOGIN: 'Đăng nhập',
  BACK_TO_HOME: 'Trở về trang chủ',
}
