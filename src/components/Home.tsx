import React from 'react'
import styled from 'styled-components'
import InquiryList from './inquiry/InquiryList'

const Main = styled.div`
  position: relative;
  padding-top: 84px;
  height: 100%;
  overflow: hidden;
`

const Home = () => {
  return <Main>
    <InquiryList/>
  </Main>
}

export default Home
