import styled from "styled-components";
import { LuLogOut } from "react-icons/Lu";
import LogoImage from "../assets/logo_2.png";

const NavBar = () => {
  return (
    <Container>
      <LogoBox src={LogoImage} alt="logo image" />
      <ProfileContainer>
        <UserProfile src="https://i.ibb.co/dfkMYGS/hani.png" alt="profile image" title="회원정보 수정" />
        <UserName>팜하니</UserName>
        <LogoutButton title="로그아웃">
          <LogoutIcon />
        </LogoutButton>
      </ProfileContainer>
    </Container>
  );
};

export default NavBar;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid;
  margin-bottom: 15px;
`;

const LogoBox = styled.img`
  width: 190px;
  height: auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s; // smooth transition

  &:hover {
    transform: scale(1.1); // scale up on hover
  }
`;

const UserName = styled.p`
  margin: 0 10px;
  width: 100px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
`;

const LogoutIcon = styled(LuLogOut)`
  color: black; // temporary color
  font-size: 24px;
  transition: transform 0.2s; // smooth transition

  &:hover {
    transform: scale(1.1); // scale up on hover
  }
`;
