/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : Login
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import cookies from 'react-cookies'
import {http} from '../../AxiosInstance'
import React, {useState} from 'react'
import styled from 'styled-components'
import {jwt_decode} from '../../jwt'
import {useRecoilState} from 'recoil'
import {profileState} from '../../recoil'

interface Props {
  isOpen: boolean
  toggle: (arg: boolean) => any
}

const LoginModal = styled.div`
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  height: 100px;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  margin: 84px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid;
`
const LoginModalHeader = styled.div``
const LoginModalTitle = styled.div`
  display: inline;
`
const LoginModalClose = styled.span`
  float: right;
`
const LoginModalBody = styled.div``
const LoginModalForm = styled.form``
const LoginModalInputID = styled.input``
const LoginModalInputPassword = styled.input``
const LoginModalSubmit = styled.button``

const Login = (props: Props) => {

  const {isOpen, toggle} = props

  const [login, setLoginID] = useState('')
  const [password, setPassword] = useState('')

  const [, setProfile] = useRecoilState(profileState)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    http().post('/auth/signin', {login, password}).then(res => {
      const userInfo = jwt_decode(res.data.token)
      const expires = new Date(userInfo.exp * 1000)
      cookies.save('token', res.data.token, {path: '/', expires})
      setProfile({id: userInfo.id, name: userInfo.name, roles: userInfo.roles})
      toggle(false)
    }).catch(err => err.response.data && alert(err.response.data.message))
  }
  return <>
    {isOpen &&
    <LoginModal>
      <LoginModalHeader>
        <LoginModalTitle>Login Modal</LoginModalTitle>
        <LoginModalClose onClick={() => toggle(!isOpen)}>&times;</LoginModalClose>
      </LoginModalHeader>
      <LoginModalBody>
        <LoginModalForm onSubmit={handleSubmit}>
          <LoginModalInputID
            type="text"
            name="login"
            placeholder="Login ID"
            onChange={event => setLoginID(event.target.value)}
            value={login}
          />
          <LoginModalInputPassword
            type="password"
            name="password"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <LoginModalSubmit type="submit">로그인</LoginModalSubmit>
        </LoginModalForm>
      </LoginModalBody>
    </LoginModal>
    }
  </>
}

export default Login