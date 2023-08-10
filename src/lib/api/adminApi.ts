import axios from "axios";

const api = axios.create({
  baseURL: "https://Myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 로그인 api
export const login = async (email: string, password: string) => {
  const response = await api.post("/user/login", { email, password });
  if (response.data.status === 200) {
    // 토큰을 localStorage에 저장
    localStorage.setItem("token", response.data.data.accessToken);
  }
  return response.data;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const logout = () => {
  localStorage.removeItem("token");
};

interface ApplicationData {
  userId: number;
  userEmail: string;
  eventId: number;
  userName: string;
  eventType: string;
  orderId: number;
  startDate: string;
  endDate?: string; // endDate는 선택적(optional)일 수 있으므로 '?'로 표시
  orderState: string;
  imgUrl: string;
  createdAt: string;
  annualCount?: number;
}

interface ListApplicationResponse {
  status: number;
  msg: string;
  data: {
    content: ApplicationData[]; // 배열 내에 ApplicationData 인터페이스를 사용
    pageable: {
      // pageable 관련 인터페이스 작성 (필요하다면)
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    number: number;
    sort: {
      // sort 관련 인터페이스 작성 (필요하다면)
    };
    size: number;
    numberOfElements: number;
    empty: boolean;
  };
}

// 신청 리스트 api
export const listApplication = async (): Promise<ListApplicationResponse> => {
  try {
    const response = await api.get("/admin/event/request");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

interface ApprovalResponse {
  status: number;
  msg: string;
  data: {
    userId: number;
    userName: string;
    userEmail: string;
    eventType: string;
    eventId: number;
    startDate: string;
    endDate: string;
    orderState: string;
  };
}

// 공통된 로직을 처리하기 위한 helper function
const postApproval = async (path: string, eventId: number, orderState: string): Promise<ApprovalResponse> => {
  try {
    const response = await api.post(path, { eventId, orderState });
    return response.data;
  } catch (error) {
    console.error(`Error during ${orderState} API call:`, error);
    throw error;
  }
};

// 연차&당직 승인, 취소 api
export const leaveapproveApplication = async (eventId: number): Promise<ApprovalResponse> => {
  return postApproval("/admin/leave/approval", eventId, "APPROVED");
};

export const leaverejectApplication = async (eventId: number): Promise<ApprovalResponse> => {
  return postApproval("/admin/leave/approval", eventId, "REJECTED");
};

export const dutyapproveApplication = async (eventId: number): Promise<ApprovalResponse> => {
  return postApproval("/admin/duty/approval", eventId, "APPROVED");
};

export const dutyrejectApplication = async (eventId: number): Promise<ApprovalResponse> => {
  return postApproval("/admin/duty/approval", eventId, "REJECTED");
};

// export const leaveapproveApplication = async (eventId: number): Promise<ApprovalResponse> => {
//   try {
//     const response: AxiosResponse<ApprovalResponse> = await axios.post(
//       "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/leave/approval",
//       {
//         eventId,
//         orderState: "APPROVED",
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("승인 API 호출 중 오류 발생:", error);
//     throw error;
//   }
// };

// export const leaverejectApplication = async (eventId: number): Promise<ApprovalResponse> => {
//   try {
//     const response: AxiosResponse<ApprovalResponse> = await axios.post(
//       "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/leave/approval",
//       {
//         eventId,
//         orderState: "REJECTED",
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("거절 API 호출 중 오류 발생:", error);
//     throw error;
//   }
// };

// export const dutyapproveApplication = async (eventId: number): Promise<ApprovalResponse> => {
//   try {
//     const response: AxiosResponse<ApprovalResponse> = await axios.post(
//       "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/duty/approval",
//       {
//         eventId,
//         orderState: "APPROVED",
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("승인 API 호출 중 오류 발생:", error);
//     throw error;
//   }
// };

// export const dutyrejectApplication = async (eventId: number): Promise<ApprovalResponse> => {
//   try {
//     const response: AxiosResponse<ApprovalResponse> = await axios.post(
//       "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/duty/approval",
//       {
//         eventId,
//         orderState: "REJECTED",
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("거절 API 호출 중 오류 발생:", error);
//     throw error;
//   }
// };
