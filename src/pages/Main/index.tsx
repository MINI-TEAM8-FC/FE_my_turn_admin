import NavBar from '../../components/NavBar';
import styled from "styled-components";
import AdminPage from '../../components/AdminPage';

const MainContainer = styled.div`
  margin: 3rem;
`;

const Main = () => {
  return (
    <MainContainer>
      <NavBar />
      <AdminPage/>
    </MainContainer>
  );
};

export default Main;
