import styled from "styled-components";
import { LuLogOut } from "react-icons/lu";
import LogoImage from "../assets/logo_2.png";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api/adminApi";

const NavBar = () => {
  const userData = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser(); // 유저 정보를 초기화합니다.
    logout(); // 로그아웃 시 토큰을 지웁니다.
    navigate("/login"); // 로그인 페이지로 리다이렉트합니다.
  };

  return (
    <Container>
      <LogoBox src={LogoImage} alt="logo image" />

      <ProfileContainer>
        <UserProfile
          src="https://i.ibb.co/dfkMYGS/hani.png" //{userData.imageUrl}
          alt="profile image"
        />
        <UserName>{userData.username}</UserName>
        <LogoutButton title="로그아웃" onClick={handleLogout}>
          <LogoutIcon />
        </LogoutButton>
      </ProfileContainer>
    </Container>
  );
};

export default NavBar;

const Container = styled.nav`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  height: 140px;
  padding: 0 10rem;
  background-color: ${(props) => props.theme.colors.green.dark};
`;

const LogoBox = styled.img`
  width: 186px;
  height: auto;
  position: absolute; // 위치 조정을 위해 추가
  left: 0; //
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute; // 위치 조정을 위해 추가
  right: 0; // 오른쪽으로 정렬
  padding: 0 1rem;
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f1f1ef;
  cursor: pointer;
  transition: transform 0.2s; // smooth transition

  &:hover {
    transform: scale(1.1); // scale up on hover
  }
`;

const UserName = styled.p`
  margin: 0 10px;
  padding: 5px 0;
  width: 150px;
  font-weight: 600;
  white-space: nowrap; // 줄바꿈을 방지
  overflow: hidden; // 넘치는 텍스트 숨기기
  text-overflow: ellipsis; // '...'으로 텍스트 잘라내기
  max-width: 10ch; // 최대 7자까지만 보이게 설정
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
