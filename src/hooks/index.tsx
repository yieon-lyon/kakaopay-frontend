/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : polling custom hooks
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import {useEffect, useRef} from 'react'

const useInterval = (callback: () => unknown, delay: number | null) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) {
      return
    }
    const timeId = setInterval(() => savedCallback.current(), delay)
    // eslint-disable-next-line consistent-return
    return () => clearInterval(timeId)
  }, [delay])
}

export default useInterval