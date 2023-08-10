import styled from "styled-components";
import { useForm } from "react-hook-form";
import { login } from "../lib/api/adminApi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data: FormData) => {
    try {
      const loginResponse = await login(data.email, data.password);
      console.log(loginResponse.data.username, loginResponse.data.imageUrl);

      if (loginResponse.status === 200) {
        alert("로그인에 성공하였습니다.");

        setUser({
          username: loginResponse.data.username,
          email: data.email,
          imageUrl: loginResponse.data.imageUrl,
          accessToken: loginResponse.data.accessToken,
        });
        //메인 페이지로 이동
        navigate("/");
      } else {
        alert("로그인에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      alert("로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="이메일" />
        <ErrorMessage>
          {errors.email && errors.email.type === "required" && "필수 입력 항목입니다."}
          {errors.email && errors.email.type === "pattern" && "이메일 형식을 확인해주세요."}
        </ErrorMessage>
        <Input
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 15,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?!.*\s).{8,15}$/,
          })}
          type="password"
          placeholder="비밀번호"
        />
        <ErrorMessage>
          {errors.password && errors.password.type === "required" && "필수 입력 항목입니다."}
          {errors.password && errors.password.type === "minLength" && "비밀번호는 최소 8자 이상입니다."}
          {errors.password && errors.password.type === "maxLength" && "비밀번호는 최대 15자 이하입니다."}
          {errors.password && errors.password.type === "pattern" && "영문, 숫자를 포함(공백 제외)하여 입력해주세요."}
        </ErrorMessage>
        <Button />
      </Form>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  display: relative;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 5px;
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 40px;
  padding: 0px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[1]};
  border-radius: 5px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.orange.dark};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  height: 15px;
  margin-bottom: 3px;
`;

const Button = styled.input.attrs({
  type: "submit",
  value: "로그인",
})`
  background-color: ${({ theme }) => theme.colors.green.dark};
  border: none;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 0px;
  cursor: pointer;
  border-radius: 5px;
`;
