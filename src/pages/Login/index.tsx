import styled from "styled-components";
import logoImage from "../../assets/logo_2.png";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <ContainerLogo>
          <LogoImage src={logoImage} alt="로고" />
        </ContainerLogo>
        <ContainerForm>
          <Label>관리자 로그인</Label>
          <LoginForm />
        </ContainerForm>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 500px;
  border: 1px solid ${(props) => props.theme.colors.gray[1]};
  border-radius: 25px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;
const ContainerLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  background-color: ${(props) => props.theme.colors.green.dark};
`;
const ContainerForm = styled.div`
  width: 50%;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoImage = styled.img`
  align-items: center;
  width: 70%;
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.orange.main};
  text-align: center;
  margin-bottom: 5px;
`;
