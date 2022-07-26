/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : InquiryDetails
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {http} from '../../AxiosInstance'
import {useRecoilState} from 'recoil'
import {profileState} from '../../recoil'
import useInterval from '../../hooks'

const InquiryDetailsContainer = styled.div`
  position: relative;
  padding: 84px 50px 0 50px;
  height: 100%;
  overflow: auto;
`

const InquiryDetailsHead = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid gray;
`
const InquiryDetailsHeadTitle = styled.h2``
const InquiryDetailsHeadInfo = styled.div`
  display: flex;
`
const InquiryDetailsHeadInfoLabel = styled.span`
  font-size: 12px;
  color: gray;
  padding-right: 10px;
  &:nth-child(2) {
    flex: 1
  }
`
const InquiryAssignedBtn = styled.button`
  margin-right: 10px;
`
const InquiryStatusSelect = styled.select``
const InquiryStatusOption = styled.option``
const InquiryDetailsContentsLayout = styled.div``
const InquiryDetailsLayout = styled.div`
  padding: 20px 0 20px 0;
  margin-bottom: 10px;
  border-bottom: 2px solid #efefef;
`
const InquiryDetailsInfo = styled.div``
const InquiryDetailsInfoLabel = styled.span`
  font-size: 12px;
  color: gray;
  padding-right: 10px;
`
const InquiryDetailsContent = styled.div`
  padding: 10px;
  width: 100%;
  line-height: 1.5;
`

const InquiryDetailsReplyLayout = styled.div``
const InquiryDetailsReply = styled.textarea`
  padding: 10px;
  width: 100%;
  min-height: 300px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
  resize: none;
  &:focus, &:hover {
    outline: none !important;
  }
`

const InquiryDetailsBottom = styled.div`
  text-align: end;
  margin-right: -50px;
`
const InquiryDetailsPaginationBtn = styled.button`
  margin: 10px;
  padding: 8px;
  display: inline;
  border: 1px solid;
  border-radius: 10px;
  cursor: pointer;
  &:disabled {
    pointer-events: none;
  }
`
const InquiryDetailsBtn = styled.button`
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

const InquiryDetails = () => {

  const [profile] = useRecoilState(profileState)

  const [size] = useState(10)
  const [page, setPage] = useState(0)

  const [contents, setContents]: any = useState(null)
  const [inquiry, setInquiry]: any = useState(null)
  const [reply, setReply]: any = useState('')
  const [status, setStatus]: any = useState(null)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    getInquiry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getInquiryDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, page])

  // TODO interval to websocket
  useInterval(() => {
    getInquiryDetails()
  }, 10000)

  const getInquiryDetails = () => {
    http().post('/inquiry/list/details', {size, page, inquiryId: id}).then(res => {
      setContents(res.data)
      getInquiry()
    })
  }

  const getInquiry = () => {
    http().get(`/inquiry/${id}`).then(res => {
      setInquiry(res.data)
      setStatus(res.data.status)
    })
  }

  const createInquiryDetails = () => {
    if (reply.length > 0) {
      http().post('/inquiry/details', {inquiryId: id, content: reply}).then(() => {
        getInquiryDetails()
        setReply('')
      })
    } else {
      alert('내용을 입력해주세요')
    }
  }

  const updateInquiryAssign = () => {
    http().put(`/inquiry/assigner/${id}`).then(() => {
      getInquiry()
    }).catch(err => err.response.data && alert(err.response.data.message))
  }

  const updateInquiryStatus = (status: string) => {
    http().put(`/inquiry/status/${id}/${status}`).then(() => {
      setStatus(status)
    }).catch(err => err.response.data && alert(err.response.data.message))
  }

  return <InquiryDetailsContainer>
    {inquiry &&
    <InquiryDetailsHead>
      <InquiryDetailsHeadTitle>{inquiry.title}</InquiryDetailsHeadTitle>
      <InquiryDetailsHeadInfo>
        <InquiryDetailsHeadInfoLabel>{inquiry.createdBy}</InquiryDetailsHeadInfoLabel>
        <InquiryDetailsHeadInfoLabel>{inquiry.createdAt}</InquiryDetailsHeadInfoLabel>
        {(profile.roles !== null && Object(profile.roles).includes('ROLE_ADMIN')) &&
        <>
          {inquiry.assigner === null &&
          <InquiryAssignedBtn onClick={() => updateInquiryAssign()}>담당하기</InquiryAssignedBtn>
          }
          <InquiryStatusSelect onChange={e => updateInquiryStatus(e.target.value)}
                               value={status}>
            <InquiryStatusOption value="OPEN">OPEN</InquiryStatusOption>
            <InquiryStatusOption value="ING">ING</InquiryStatusOption>
            <InquiryStatusOption value="END">END</InquiryStatusOption>
          </InquiryStatusSelect>
        </>
        }
      </InquiryDetailsHeadInfo>
      {(profile.id !== null && inquiry.assigner && profile.id !== inquiry.assigner) && Object(profile.roles).includes('ROLE_ADMIN') &&
      <div>이미 담당자가 존재하는 문의건입니다.</div>
      }
    </InquiryDetailsHead>
    }
    <InquiryDetailsContentsLayout>
      {contents && contents.content.map((item: any) => (
        <InquiryDetailsLayout key={item.id}>
          <InquiryDetailsInfo>
            <InquiryDetailsInfoLabel>{item.createdBy}</InquiryDetailsInfoLabel>
            <InquiryDetailsInfoLabel>{item.createdAt}</InquiryDetailsInfoLabel>
          </InquiryDetailsInfo>
          <InquiryDetailsContent>
            {item.content}
          </InquiryDetailsContent>
        </InquiryDetailsLayout>
      ))}
    </InquiryDetailsContentsLayout>
    {
      <InquiryDetailsReplyLayout>
        <InquiryDetailsReply value={reply} onChange={e => setReply(e.target.value)} placeholder="내용"/>
        <InquiryDetailsBtn onClick={() => createInquiryDetails()}>Reply</InquiryDetailsBtn>
      </InquiryDetailsReplyLayout>
    }
    <InquiryDetailsBottom>
      {contents &&
      <>
        <InquiryDetailsPaginationBtn disabled={page === 0}
                                     onClick={() => setPage(page - 1)}>Prev</InquiryDetailsPaginationBtn>
        <InquiryDetailsPaginationBtn disabled={page + 1 >= contents.totalPages}
                                     onClick={() => setPage(page + 1)}>Next</InquiryDetailsPaginationBtn>
      </>
      }
      <InquiryDetailsBtn onClick={() => navigate('/')}>Go Home</InquiryDetailsBtn>
    </InquiryDetailsBottom>
  </InquiryDetailsContainer>
}

export default InquiryDetails