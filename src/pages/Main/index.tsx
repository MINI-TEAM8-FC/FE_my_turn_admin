import React from "react";
import styled from "styled-components";
import { Table, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../../styles/theme";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const PageLogoText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${theme.colors.primary};
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

const TableWrapper = styled.div`
  border: 1px solid #ccc; // 테이블을 감싸는 border 스타일
  border-radius: 4px;
  width: 600px;
  padding: 30px;
  border-radius: 10px;
`;

const Divider = styled.div`
  width: 1px;
  background-color: #ccc;
  margin: 0 auto;
`;

const TableHeader = styled.h2`
  margin-bottom: 20px;
  margin-right: 280px;
`;

const StyledholidayApproveButton = styled(Button)`
  background-color: ${theme.colors.white};
  color: ${theme.colors.orange.main};
  margin-right: 10px;

  &:hover {
    background-color: ${theme.colors.orange.main};
    color: ${theme.colors.white};
  }
`;

const StyledholidayRejectButton = styled(Button)`
  background-color: ${theme.colors.orange.main};
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.orange.dark};
    color: ${theme.colors.white};
  }
`;

const StyleddutyApproveButton = styled(Button)`
  background-color: ${theme.colors.white};
  color: ${theme.colors.green.main};
  margin-right: 10px;

  &:hover {
    background-color: ${theme.colors.green.main};
    color: ${theme.colors.white};
  }
`;

const StyleddutyRejectButton = styled(Button)`
  background-color: ${theme.colors.green.main};
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.green.dark};
    color: ${theme.colors.white};
  }
`;

const App = () => {
  const columns1 = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "날짜",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "남은 연차",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "승인/취소",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <StyledholidayApproveButton type="ghost" onClick={() => handleApprove(record)}>
            승인
          </StyledholidayApproveButton>
          <StyledholidayRejectButton type="ghost" onClick={() => handleReject(record)}>
            취소
          </StyledholidayRejectButton>
        </div>
      ),
    },
  ];

  const dataSource1 = [
    {
      key: "1",
      name: "John Doe",
      date: 28,
      address: "15",
    },
    {
      key: "2",
      name: "Jane Smith",
      date: 32,
      address: "14",
    },
    {
      key: "3",
      name: "Smith",
      date: 42,
      address: "11",
    },
  ];

  const columns2 = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "날짜",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "승인/취소",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
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

  const dataSource2 = [
    {
      key: "1",
      name: "Tom Hanks",
      date: 23,
    },
    {
      key: "2",
      name: "Emma Watson",
      date: 27,
    },
    {
      key: "3",
      name: "Watson",
      date: 21,
    },
  ];

  // 두 테이블의 행 개수를 비교하여 더 많은 행의 개수를 구합니다.
  const maxRows = Math.max(dataSource1.length, dataSource2.length);

  // 더 많은 행의 개수를 기준으로 두 테이블의 행 개수를 맞춥니다.
  const adjustedDataSource1 = dataSource1.concat(Array(maxRows - dataSource1.length).fill({}));
  const adjustedDataSource2 = dataSource2.concat(Array(maxRows - dataSource2.length).fill({}));

  const handleApprove = (record) => {
    console.log("승인:", record);

    toast.success(`승인되었습니다: ${record.name}`);
  };

  const handleReject = (record) => {
    console.log("취소:", record);

    toast.error(`취소되었습니다: ${record.name}`);
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
        <TableWrapper>
          <TableHeader>연차 신청 현황</TableHeader>
          <Table dataSource={adjustedDataSource1} columns={columns1} />
        </TableWrapper>

        <TableWrapper>
          <TableHeader>당직 신청 현황</TableHeader>
          <Table dataSource={adjustedDataSource2} columns={columns2} />
        </TableWrapper>
      </Container>
    </PageContainer>
  );
};

export default App;
