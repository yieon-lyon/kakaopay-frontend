/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : AxiosConfig
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import axios, {AxiosInstance} from 'axios'
import cookies from 'react-cookies'

export const http: () => AxiosInstance = () => {
  const http = axios.create({
    withCredentials: true
  })
  http.interceptors.response.use(requestDefaultInterceptor)
  if (cookies.load('token')) {
    http.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.load('token')
  }
  return http
}

const requestDefaultInterceptor = async (request: any) => {
  return request
}