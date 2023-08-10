import { useEffect, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { Table, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../styles/theme";
// import axios from "axios"; // axios를 추가합니다.
import {
  listApplication,
  leaveapproveApplication,
  leaverejectApplication,
  dutyapproveApplication,
  dutyrejectApplication,
} from "../lib/api/adminApi";

interface IRequest {
  userId: number;
  userEmail: string;
  eventType: string;
  userName: string;
  startDate: string;
  endDate?: string;
  annualCount?: number;
  eventId: number; // API 응답에서 이벤트 식별자를 반환하는 필드의 이름으로 수정
  orderState: string; // Added field
}

const AdminPage = () => {
  const [dataSource1, setDataSource1] = useState<IRequest[]>([]); // 연차 신청 데이터를 담을 state입니다.
  const [dataSource2, setDataSource2] = useState<IRequest[]>([]); // 당직 신청 데이터를 담을 state입니다.
  const [rotating, setRotating] = useState(false);
  const [page, setPage] = useState(1);

  // API에서 데이터를 받아와서 dataSource1과 dataSource2에 저장합니다.
  const fetchData = useCallback(async () => {
    try {
      const result = await listApplication();

      if (Array.isArray(result)) {
        const leaveRequests = result.filter((request) => request.eventType === "LEAVE");
        const dutyRequests = result.filter((request) => request.eventType === "DUTY");

        setDataSource1(leaveRequests);
        setDataSource2(dutyRequests);
      } else {
        console.error("API response is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    console.log("Updated dataSource1:", dataSource1);
    console.log("Updated dataSource2:", dataSource2);
  }, [dataSource1, dataSource2]);

  //-------------------------------

  // const fetchData = useCallback(async (page) => {
  //   const result = await listApplication();
  //   const content: IRequest[] = result?.data?.content || [];

  //   const leaveRequests = content.filter((request) => request.eventType === "LEAVE");
  //   const dutyRequests = content.filter((request) => request.eventType === "DUTY");

  //   setDataSource1(leaveRequests);
  //   setDataSource2(dutyRequests);
  //   console.log("API Result:", result);

  //   console.log(dataSource1);
  //   console.log(dataSource2);
  // }, []);

    useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  const handleRefresh = () => {
    setRotating(true);
    fetchData();
    setTimeout(() => setRotating(false), 1000);
  };

  // 연차 신청 현황 테이블
  const columns1 = [
    {
      title: "이름",
      dataIndex: "userName",
      key: "userName",
      align: "center" as const,
    },
    {
      title: "시작일",
      dataIndex: "startDate",
      key: "startDate",
      align: "center" as const,
    },
    {
      title: "종료일",
      dataIndex: "endDate",
      key: "endDate",
      align: "center" as const,
    },
    {
      title: "남은 연차",
      dataIndex: "annualCount",
      key: "annualCount",
      align: "center" as const,
      // render: (annualCount: number | undefined) => annualCount || "데이터 없음",
    },
    {
      title: "승인/취소",
      key: "actions",
      align: "center" as const,
      render: (record: IRequest) => (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <StyledLeaveApproveButton type={"ghost" as any} onClick={() => handleLeaveApprove(record)}>
            승인
          </StyledLeaveApproveButton>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <StyledLeaveRejectButton type={"ghost" as any} onClick={() => handleLeaveReject(record)}>
            취소
          </StyledLeaveRejectButton>
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
      align: "center" as const,
    },
    {
      title: "시작일",
      dataIndex: "startDate",
      key: "startDate",
      align: "center" as const,
    },
    {
      title: "종료일",
      dataIndex: "endDate",
      key: "endDate",
      align: "center" as const,
    },
    {
      title: "승인/취소",
      key: "actions",
      align: "center" as const,
      render: (record: IRequest) => (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <StyleddutyApproveButton type={"ghost" as any} onClick={() => handleDutyApprove(record)}>
            승인
          </StyleddutyApproveButton>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <StyleddutyRejectButton type={"ghost" as any} onClick={() => handleDutyReject(record)}>
            취소
          </StyleddutyRejectButton>
        </div>
      ),
    },
  ];

  const handleLeaveApprove = async (record: IRequest) => {
    try {
      console.log("승인 요청:", record.eventId);
      const response = await leaveapproveApplication(record.eventId);
      console.log("승인 API 응답:", response);

      toast.success(`승인되었습니다: ${record.userName}`);

      // 승인 후 데이터 바로 반영
      setDataSource1((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
    } catch (error) {
      console.error("승인 API 호출 중 오류 발생:", error);
      toast.error("승인 중 오류가 발생했습니다.");
    }
  };

  const handleLeaveReject = async (record: IRequest) => {
    try {
      console.log("거절 요청:", record.eventId);
      const response = await leaverejectApplication(record.eventId);
      console.log("거절 API 응답:", response);

      toast.error(`취소되었습니다: ${record.userName}`);

      // 취소 후 데이터 바로 반영
      setDataSource1((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
    } catch (error) {
      console.error("거절 API 호출 중 오류 발생:", error);
      toast.error("거절 중 오류가 발생했습니다.");
    }
  };

  const handleDutyApprove = async (record: IRequest) => {
    try {
      console.log("승인 요청:", record.eventId);
      const response = await dutyapproveApplication(record.eventId);
      console.log("승인 API 응답:", response);

      toast.success(`승인되었습니다: ${record.userName}`);

      // 승인 후 데이터 바로 반영
      setDataSource2((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
    } catch (error) {
      console.error("승인 API 호출 중 오류 발생:", error);
      toast.error("승인 중 오류가 발생했습니다.");
    }
  };

  const handleDutyReject = async (record: IRequest) => {
    try {
      console.log("거절 요청:", record.eventId);
      const response = await dutyrejectApplication(record.eventId);
      console.log("거절 API 응답:", response);

      toast.error(`취소되었습니다: ${record.userName}`);

      // 취소 후 데이터 바로 반영
      setDataSource2((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
    } catch (error) {
      console.error("거절 API 호출 중 오류 발생:", error);
      toast.error("거절 중 오류가 발생했습니다.");
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <PageContainer>
      <Button
        shape="circle"
        icon={<RotatingSyncOutlined rotating={rotating} />}
        onClick={handleRefresh}
        style={{ width: "40px", height: "40px", marginLeft: "auto" }}
      />
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
          <Table
            dataSource={dataSource1}
            columns={columns1}
            pagination={{
              pageSize: 10,
              current: page,
              // total: totalItems,
              onChange: handlePageChange,
            }}
            rowKey="eventId"
          />
        </LeaveTableWrapper>

        <DutyTableWrapper>
          <TableHeader>당직 신청 현황</TableHeader>
          <Table
            dataSource={dataSource2}
            columns={columns2}
            pagination={{
              pageSize: 10,
              current: page,
              // total: totalItems,
              onChange: handlePageChange,
            }}
            rowKey="eventId"
          />
        </DutyTableWrapper>
      </Container>
    </PageContainer>
  );
};

export default AdminPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100vh; */
`;

const Container = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
`;

// refresh 버튼 회전
const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(180deg);
}
`;

const RotatingSyncOutlined = styled(({ rotating, ...props }: { rotating: boolean }) => {
  console.log(rotating); // 이 줄을 추가하면 rotating이 사용된 것으로 간주됩니다.
  return <SyncOutlined {...props} />;
})`
  ${({ rotating }) =>
    rotating &&
    css`
      animation: ${rotate360} 0.5s linear infinite;
    `}
`;

const LeaveTableWrapper = styled.div`
  border: 1px solid ${theme.colors.green.main};
  border-radius: 4px;
  width: 600px;
  padding: 30px;
  border-radius: 10px;
  margin-right: 50px;
  min-height: 300px; // 최소 높이를 추가합니다.
`;

const DutyTableWrapper = styled.div`
  border: 1px solid ${theme.colors.orange.main};
  border-radius: 4px;
  width: 600px;
  padding: 30px;
  border-radius: 10px;
  margin-left: 50px;
  min-height: 300px; // 최소 높이를 추가합니다.
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

const StyledLeaveRejectButton = styled(Button)`
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
