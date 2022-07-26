/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : jwt util
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
export const jwt_decode = (token: string) => {
  try {
    if (token.split('.').length !== 3) {
      return null
    }
    const payload = token.split('.')[1]
    const padding = '='.repeat((4 - (payload.length % 4)) % 4)
    const base64 = payload.replace('-', '+').replace('_', '/') + padding
    return JSON.parse(decodeURIComponent(escape(atob(base64))))
  } catch (error) {
    return null
  }
}