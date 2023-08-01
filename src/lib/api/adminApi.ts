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
    const response: AxiosResponse<ListApplicationResponse> = await axios.get("https://b79e656d-ef86-45fe-a5cb-a112eafd50a8.mock.pstmn.io/user/event/request");
    return response.data;
  } catch (error) {
    console.error("오류 발생:", error);
    throw error;
  }
};
