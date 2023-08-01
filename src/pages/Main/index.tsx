import { useEffect, useState } from 'react';
import styled from "styled-components";
import { Table, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../../styles/theme";
import axios from 'axios'; // axios를 추가합니다.

const App = () => {
  const [dataSource1, setDataSource1] = useState([]); // 연차 신청 데이터를 담을 state입니다.
  const [dataSource2, setDataSource2] = useState([]); // 당직 신청 데이터를 담을 state입니다.

  // API에서 데이터를 받아와서 dataSource1과 dataSource2에 저장합니다.
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://b79e656d-ef86-45fe-a5cb-a112eafd50a8.mock.pstmn.io/admin/event/request');
      console.log(result.data);  // 추가: API에서 어떤 데이터가 오는지 확인하기 위한 console.log입니다.
  
      const leaveRequests = result.data.data.content.filter(request => request.eventType === 'leave');
      const dutyRequests = result.data.data.content.filter(request => request.eventType === 'duty');
  
      setDataSource1(leaveRequests);
      setDataSource2(dutyRequests);
    }
  
    fetchData();
  }, []);

  // 연차 신청 현황 테이블
  const columns1 = [
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "시작일",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "종료일",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "남은 연차",
      dataIndex: "annualCount",
      key: "annualCount",
    },
    {
      title: "승인/취소",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
          <StyledLeaveApproveButton type="ghost" onClick={() => handleApprove(record)}>
            승인
          </StyledLeaveApproveButton>
          <StyledholidayRejectButton type="ghost" onClick={() => handleReject(record)}>
            취소
          </StyledholidayRejectButton>
        </div>
      ),
    },
  ];

  // 당직 신청 현황 테이블
  const columns2 = [
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "시작일",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "종료일",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "승인/취소",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
          <StyleddutyApproveButton type="ghost" onClick={() => handleApprove(record)}>
            승인
          </StyleddutyApproveButton>
          <StyleddutyRejectButton type="ghost" onClick={() => handleReject(record)}>
            취소
          </StyleddutyRejectButton>
        </div>
      ),
    },
  ];

  // 두 테이블의 행 개수를 비교하여 더 많은 행의 개수를 구합니다.
  const maxRows = Math.max(dataSource1.length, dataSource2.length);

  // 더 많은 행의 개수를 기준으로 두 테이블의 행 개수를 맞춥니다.
  const adjustedDataSource1 = dataSource1.concat(Array(maxRows - dataSource1.length).fill({}));
  const adjustedDataSource2 = dataSource2.concat(Array(maxRows - dataSource2.length).fill({}));

  const handleApprove = (record) => {
    console.log("승인:", record);

    toast.success(`승인되었습니다: ${record.userName}`);
  };

  const handleReject = (record) => {
    console.log("취소:", record);

    toast.error(`취소되었습니다: ${record.userName}`);
  };

  return (
    <PageContainer>
      <PageLogoText>My_Turn</PageLogoText>

      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Container>
        <LeaveTableWrapper>
          <TableHeader>연차 신청 현황</TableHeader>
          <Table dataSource={adjustedDataSource1} columns={columns1} rowKey="id" />
        </LeaveTableWrapper>

        <DutyTableWrapper>
          <TableHeader>당직 신청 현황</TableHeader>
          <Table dataSource={adjustedDataSource2} columns={columns2} rowKey="id"/>
        </DutyTableWrapper>
      </Container>
    </PageContainer>
  );
};

export default App;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const PageLogoText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 50px;
  margin-top: 70px;
  margin-right: 800px;
`;

const Container = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 60px;
`;

const LeaveTableWrapper = styled.div`
  border: 1px solid  ${theme.colors.green.main}; 
  border-radius: 4px;
  width: 600px;
  padding: 30px;
  border-radius: 10px;
`;

const DutyTableWrapper = styled.div`
  border: 1px solid ${theme.colors.orange.main};
  border-radius: 4px;
  width: 600px;
  padding: 30px;
  border-radius: 10px;
`;

const TableHeader = styled.h2`
  margin-bottom: 20px;
  margin-right: 280px;
`;

const StyledLeaveApproveButton = styled(Button)`
  background-color: ${theme.colors.white};
  color: ${theme.colors.green.main};
  margin-right: 10px;

  &:hover {
    background-color: ${theme.colors.green.main};
    color: ${theme.colors.white};
  }
`;

const StyledholidayRejectButton = styled(Button)`
  background-color: ${theme.colors.green.main};
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.green.dark};
    color: ${theme.colors.white};
  }
`;

const StyleddutyApproveButton = styled(Button)`
  background-color: ${theme.colors.white};
  color: ${theme.colors.orange.main};
  margin-right: 10px;

  &:hover {
    background-color: ${theme.colors.orange.main};
    color: ${theme.colors.white};
  }
`;

const StyleddutyRejectButton = styled(Button)`
  background-color: ${theme.colors.orange.main};
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.orange.dark};
    color: ${theme.colors.white};
  }
`;
