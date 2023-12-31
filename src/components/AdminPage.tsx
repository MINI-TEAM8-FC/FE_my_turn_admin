import { useEffect, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { Table, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../styles/theme";
import {
  ApprovalResponse,
  listApplication,
  leaveapproveApplication,
  leaverejectApplication,
  dutyapproveApplication,
  dutyrejectApplication,
} from "../lib/api/adminApi";

interface IRequest {
  eventId: number;
  userId: number;
  userName: string;
  userEmail: string;
  eventType: string;
  startDate: string;
  endDate?: string;
  orderState: string;
  annualCount?: number;
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
        const leaveRequests = result.filter(
          (request) =>
            request.eventType === "LEAVE" && request.orderState !== "APPROVED" && request.orderState !== "REJECTED"
        );
        const dutyRequests = result.filter(
          (request) =>
            request.eventType === "DUTY" && request.orderState !== "APPROVED" && request.orderState !== "REJECTED"
        );

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

  // 승인, 취소 버튼 클릭시 api통신하는 로직
  type ApiFunctionType = (eventId: number) => Promise<ApprovalResponse>;
  const handleAPIResponse = async (apiFunction: ApiFunctionType, record: IRequest) => {
    try {
      console.log("요청:", record.eventId);
      const response = await apiFunction(record.eventId);

      if (response.status === 200) {
        toast.success(`처리되었습니다: ${record.userName}`);
        return true;
      } else {
        console.error("API 호출 중 오류 발생:", response);
        toast.error("처리 중 오류가 발생했습니다.");
        return false;
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      toast.error("처리 중 오류가 발생했습니다.");
      return false;
    }
  };

  const handleLeaveApprove = async (record: IRequest) => {
    const isSuccessful = await handleAPIResponse(leaveapproveApplication, record);
    if (isSuccessful) {
      setDataSource1((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
    }
  };

  const handleLeaveReject = async (record: IRequest) => {
    const isSuccessful = await handleAPIResponse(leaverejectApplication, record);
    if (isSuccessful) {
      setDataSource1((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
    }
  };

  const handleDutyApprove = async (record: IRequest) => {
    const isSuccessful = await handleAPIResponse(dutyapproveApplication, record);
    if (isSuccessful) {
      setDataSource2((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
    }
  };

  const handleDutyReject = async (record: IRequest) => {
    const isSuccessful = await handleAPIResponse(dutyrejectApplication, record);
    if (isSuccessful) {
      setDataSource2((prevData) => prevData.filter((item) => item.eventId !== record.eventId));
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
  width: 700px;
  padding: 30px;
  border-radius: 10px;
  margin-right: 50px;
  min-height: 300px; // 최소 높이를 추가합니다.
`;

const DutyTableWrapper = styled.div`
  border: 1px solid ${theme.colors.orange.main};
  border-radius: 4px;
  width: 700px;
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
