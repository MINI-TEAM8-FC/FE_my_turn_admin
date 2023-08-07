import axios, { AxiosResponse } from "axios";

interface ApplicationData {
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
  annualCount: number; // 'annualCount'가 숫자형(number)인 것으로 가정
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

export const listApplication = async (): Promise<ListApplicationResponse> => {
  try {
    const response: AxiosResponse<ListApplicationResponse> = await axios.get(
      "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/event/request"
    );
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

export const leaveapproveApplication = async (eventId: number): Promise<ApprovalResponse> => {
  try {
    const response: AxiosResponse<ApprovalResponse> = await axios.post(
      "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/leave/approval",
      {
        eventId,
        orderState: "APPROVED",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during approval API call:", error);
    throw error;
  }
};

export const leaverejectApplication = async (eventId: number): Promise<ApprovalResponse> => {
  try {
    const response: AxiosResponse<ApprovalResponse> = await axios.post(
      "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/leave/approval",
      {
        eventId,
        orderState: "REJECTED",
      }
    );
    return response.data;
  } catch (error) {
    console.error("거절 API 호출 중 오류 발생:", error);
    throw error;
  }
};

export const dutyapproveApplication = async (eventId: number): Promise<ApprovalResponse> => {
  try {
    const response: AxiosResponse<ApprovalResponse> = await axios.post(
      "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/duty/approval",
      {
        eventId,
        orderState: "APPROVED",
      }
    );
    return response.data;
  } catch (error) {
    console.error("승인 API 호출 중 오류 발생:", error);
    throw error;
  }
};

export const dutyrejectApplication = async (eventId: number): Promise<ApprovalResponse> => {
  try {
    const response: AxiosResponse<ApprovalResponse> = await axios.post(
      "http://myturn-env.eba-kab3caa3.ap-northeast-2.elasticbeanstalk.com/admin/duty/approval",
      {
        eventId,
        orderState: "REJECTED",
      }
    );
    return response.data;
  } catch (error) {
    console.error("거절 API 호출 중 오류 발생:", error);
    throw error;
  }
};
