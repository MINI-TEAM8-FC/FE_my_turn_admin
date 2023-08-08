import styled from "styled-components";
import logoImage from "../../assets/logo_2.png";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <Container>
      <LogoImage src={logoImage} alt="로고" />
      <Label>로그인을 해주세요</Label>
      <LoginForm />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const LogoImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.orange.main};
  text-align: center;
  margin-bottom: 5px;
`;
