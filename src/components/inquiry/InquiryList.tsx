/**
 * @author yieon
 * @version default
 * @email parrotbill@naver.com
 * @since 2022-07-24
 * <PRE>
 * ------------------------
 * summary : InquiryList
 * ------------------------
 * Revision history
 * 2022-07-24. yieon : Initial creation
 * </PRE>
 */
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {http} from '../../AxiosInstance'
import useInterval from '../../hooks'

const InquiryListContainer = styled.div`
  padding: 0 50px 0 50px;
`
const InquiryListTableLayout = styled.div`
  height: 70vh;
  
  width: 100%;
`
const InquiryListTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-spacing: 0;
`
const InquiryListTHead = styled.thead`
  background: #f9fafb;
`
const InquiryListTHeadTr = styled.tr`
  border: 1px solid #e2e6eb;
`
const InquiryListTHeadTh = styled.th`
  font-weight: 500;
  color: #333940;
`
const InquiryListTBody = styled.tbody``
const InquiryListTBodyTr = styled.tr``
const InquiryListTBodyTd = styled.td`
  font-weight: normal;
  color: #505860;
  text-align: center;
  &#title {
    cursor: pointer;
  }
`
const InquiryListPaginationBtn = styled.button`
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
const InquiryListBottom = styled.div`
  text-align: end;
  margin-right: -50px;
`
const InquiryCreateBtn = styled.button`
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

const InquiryNoContent = styled.div``

const InquiryList = () => {

  const [size] = useState(25)
  const [page, setPage] = useState(0)

  const [contents, setContents]: any = useState(null)

  const navigate = useNavigate()

  // TODO interval to websocket
  useInterval(() => {
    http().post('/inquiry/list', {size, page}).then(res => {
      setContents(res.data)
    })
  }, 10000)

  useEffect(() => {
    http().post('/inquiry/list', {size, page}).then(res => {
      setContents(res.data)
    })
  }, [size, page])

  return <InquiryListContainer>
    <InquiryListTableLayout>
      {contents ?
        <InquiryListTable>
          <InquiryListTHead>
            <InquiryListTHeadTr>
              <InquiryListTHeadTh colSpan={1}>Status</InquiryListTHeadTh>
              <InquiryListTHeadTh colSpan={3}>Title</InquiryListTHeadTh>
              <InquiryListTHeadTh colSpan={1}>CreatedBy</InquiryListTHeadTh>
              <InquiryListTHeadTh colSpan={1}>CreatedAt</InquiryListTHeadTh>
              <InquiryListTHeadTh colSpan={1}>Assigned</InquiryListTHeadTh>
            </InquiryListTHeadTr>
          </InquiryListTHead>
          <InquiryListTBody>
            {contents.content.map((item: any) => (
              <InquiryListTBodyTr key={item.id}>
                <InquiryListTBodyTd colSpan={1}>{item.status}</InquiryListTBodyTd>
                <InquiryListTBodyTd id="title" colSpan={3}
                                    onClick={() => navigate(`/inq/${item.id}`)}>{item.title}</InquiryListTBodyTd>
                <InquiryListTBodyTd colSpan={1}>{item.createdBy}</InquiryListTBodyTd>
                <InquiryListTBodyTd colSpan={1}>{item.createdAt}</InquiryListTBodyTd>
                <InquiryListTBodyTd colSpan={1}>{item.assigner !== 0 ? 'OK' : 'NO'}</InquiryListTBodyTd>
              </InquiryListTBodyTr>
            ))
            }
          </InquiryListTBody>
        </InquiryListTable>
        :
        <InquiryNoContent>No Contents</InquiryNoContent>
      }
    </InquiryListTableLayout>
    <InquiryListBottom>
      {contents &&
      <>
        <InquiryListPaginationBtn disabled={page === 0}
                                  onClick={() => setPage(page - 1)}>Prev</InquiryListPaginationBtn>
        <InquiryListPaginationBtn disabled={page + 1 >= contents.totalPages}
                                  onClick={() => setPage(page + 1)}>Next</InquiryListPaginationBtn>
      </>
      }
      <InquiryCreateBtn onClick={() => navigate('/inq/write')}>문의 작성</InquiryCreateBtn>
    </InquiryListBottom>
  </InquiryListContainer>
}

export default InquiryList
