/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : Header
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import cookies from 'react-cookies'
import React, {useState} from 'react'
import styled from 'styled-components'
import Login from './Login'
import {useRecoilState} from 'recoil'
import {profileState} from '../../recoil'

const HeaderComponent = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  min-height: 84px;
  display: flex;
  justify-content: center;
  color: rgb(6, 11, 17);
  background: rgb(255, 255, 255);
  z-index: 21;
  overflow: hidden;
  border-bottom: 0.5px solid;
  align-items: center;
`

const HeaderTitle = styled.div`
  padding-left: 30px;
  flex: 1;
`

const HeaderLogin = styled.div`
  display: flex;
  align-items: flex-start;
  flex: none;
  height: 84px;
  overflow: hidden;
  pointer-events: all;
  z-index: 1;
  align-items: center;
`

const HeaderLoginBtn = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-weight: 600;
  margin: 0 10px;
  width: 200px;
  padding: 10px 0;
  border: 1px solid;
  &:hover {
    color: white;
    background-color: #555555;
  }
`

const Header = () => {

  const [isLoginModal, loginToggle] = useState(false)

  const [profile, setProfile]: any = useRecoilState(profileState)

  return <HeaderComponent>
    <HeaderTitle>Kakaopay Workplatform 2022 과제 - 이언철</HeaderTitle>
    <HeaderLogin>
      {(profile.roles === null || profile.roles.includes('ROLE_USER')) ?
        <>
          <HeaderLoginBtn onClick={() => loginToggle(!isLoginModal)}>Login</HeaderLoginBtn>
          <Login
            isOpen={isLoginModal}
            toggle={() => loginToggle(!isLoginModal)}
          />
        </>
        :
        <HeaderLoginBtn onClick={() => {
          cookies.remove('token')
          setProfile({id: null, name: null, roles: null})
        }}>Logout</HeaderLoginBtn>
      }
    </HeaderLogin>
  </HeaderComponent>
}

export default Header
