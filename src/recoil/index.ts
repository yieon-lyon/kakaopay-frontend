/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : recoil atom
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import {atom} from 'recoil'

export const profileState = atom({
  key: 'profile',
  default: {id: null, name: null, roles: null}
})