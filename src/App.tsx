/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : App Route
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import {Route, Routes} from 'react-router-dom'
import React, {useEffect} from 'react'
import './App.css'
import cookies from 'react-cookies'
import HomePage from './pages/HomePage'
import InquiryWritePage from './pages/InquiryWritePage'
import NotMatch from './pages/NotMatch'
import {useRecoilState} from 'recoil'
import {profileState} from './recoil'
import {jwt_decode} from './jwt'
import {http} from './AxiosInstance'
import InquiryDetailsPage from './pages/InquiryDetailsPage'

const App = () => {

  const [profile, setProfile] = useRecoilState(profileState)

  useEffect(() => {
    if (profile.id === null) {
      if (cookies.load('token') !== undefined) {
        setLoginInfo(cookies.load('token'), false)
      } else {
        http().post('/auth/signin', {login: 'user', password: 'user123'}).then(res => {
          setLoginInfo(res.data.token, true)
        }).catch(err => err.response.data && alert(err.response.data.message))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  const setLoginInfo = (token: string, type: boolean) => {
    const userInfo = jwt_decode(token)
    if (type) {
      const expires = new Date(userInfo.exp * 1000)
      cookies.save('token', token, {path: '/', expires})
    }
    setProfile({id: userInfo.id, name: userInfo.name, roles: userInfo.roles})
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/inq/write" element={<InquiryWritePage/>}/>
      <Route path="/inq/:id" element={<InquiryDetailsPage/>}/>
      <Route path="*" element={<NotMatch/>}/>
    </Routes>
  )
}

export default App
