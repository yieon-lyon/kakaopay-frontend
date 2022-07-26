/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : InquiryWrite
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {http} from '../../AxiosInstance'

const InquiryWriteContainer = styled.div`
  position: relative;
  padding: 84px 50px 0 50px;
  height: 100%;
  overflow: hidden;
`

const InquiryWriteHead = styled.div``
const InquiryWriteHeadTitleInput = styled.input``
const InquiryWriteHeadInfo = styled.div``
const InquiryWriteHeadInfoInput = styled.input``
const InquiryWriteContentsLayout = styled.div``
const InquiryWriteContent = styled.textarea`
  padding: 10px;
  width: 100%;
  min-height: 500px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
  resize: none;
  &:focus, &:hover {
    outline: none !important;
  }
`
const InquiryWriteBottom = styled.div`
  text-align: end;
  margin-right: -50px;
`
const InquiryWriteBtn = styled.button`
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

const InquiryWrite = () => {

  const [title, setTitle]: any = useState('')
  const [content, setContent]: any = useState('')
  const [createdBy, setCreatedBy]: any = useState('')

  const navigate = useNavigate()

  const inquiryWrite = () => {
    if (title !== '' && content !== '' && createdBy !=='') {
      http().post('/inquiry', {title, content, createdBy}).then(() => {
        navigate('/')
      }).catch(err => err.response.data && alert(err.response.data.message))
    } else {
      alert('입력하지 않은 값이 있습니다. 확인 후 다시 시도해 주세요.')
    }
  }

  return <InquiryWriteContainer>
    <InquiryWriteHead>
      <InquiryWriteHeadTitleInput value={title} onChange={e => setTitle(e.target.value)} placeholder="문의 제목"/>
      <InquiryWriteHeadInfo>
        <InquiryWriteHeadInfoInput value={createdBy} onChange={e => setCreatedBy(e.target.value)} placeholder="이름"/>
      </InquiryWriteHeadInfo>
    </InquiryWriteHead>
    <InquiryWriteContentsLayout>
      <InquiryWriteContent value={content} onChange={e => setContent(e.target.value)} placeholder="문의 내용"/>
    </InquiryWriteContentsLayout>
    <InquiryWriteBottom>
      <InquiryWriteBtn onClick={() => navigate('/')}>Go Home</InquiryWriteBtn>
      <InquiryWriteBtn onClick={() => inquiryWrite()}>Write</InquiryWriteBtn>
    </InquiryWriteBottom>
  </InquiryWriteContainer>
}

export default InquiryWrite